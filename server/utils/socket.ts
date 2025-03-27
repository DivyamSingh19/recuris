import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import express, { Application } from "express";

interface UserSocket {
  socketId: string;
  role: 'patient' | 'doctor';
}

interface UserSocketMap {
  [userId: string]: UserSocket;
}

interface ActiveConversations {
  [userId: string]: string;
}

interface PrivateMessagePayload {
  to: string;
  message: string;
  from: string;
}

interface ConversationPayload {
  patientId: string;
  doctorId: string;
}

interface EndConversationPayload {
  userId: string;
}

export function setupSocketIO(app: Application, server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });

  
  const userSocketMap: UserSocketMap = {};
 
  const activeConversations: ActiveConversations = {};

  io.on("connection", (socket: Socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId as string;
    const userRole = socket.handshake.query.role as 'patient' | 'doctor';
    
    if (userId) {
      userSocketMap[userId] = {
        socketId: socket.id,
        role: userRole
      };
    }
 
    const onlineDoctors = Object.keys(userSocketMap).filter(id => userSocketMap[id].role === 'doctor');
    const onlinePatients = Object.keys(userSocketMap).filter(id => userSocketMap[id].role === 'patient');
    
    io.emit("getOnlineDoctors", onlineDoctors);
    io.emit("getOnlinePatients", onlinePatients);

 
    socket.on("startConversation", ({ patientId, doctorId }: ConversationPayload) => {
      activeConversations[patientId] = doctorId;
      activeConversations[doctorId] = patientId;
      
 
      const patientSocketId = userSocketMap[patientId]?.socketId;
      const doctorSocketId = userSocketMap[doctorId]?.socketId;
      
      if (patientSocketId) {
        io.to(patientSocketId).emit("conversationStarted", { withUser: doctorId });
      }
      
      if (doctorSocketId) {
        io.to(doctorSocketId).emit("conversationStarted", { withUser: patientId });
      }
    });

  
    socket.on("privateMessage", ({ to, message, from }: PrivateMessagePayload) => {
      const receiverSocketId = userSocketMap[to]?.socketId;
      
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", {
          from,
          message,
          time: new Date()
        });
      }
    });

    
    socket.on("endConversation", ({ userId }: EndConversationPayload) => {
      const partnerId = activeConversations[userId];
      
      if (partnerId) {
        
        delete activeConversations[userId];
        delete activeConversations[partnerId];
        
      
        const partnerSocketId = userSocketMap[partnerId]?.socketId;
        if (partnerSocketId) {
          io.to(partnerSocketId).emit("conversationEnded", { byUser: userId });
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      
      if (userId) {
      
        const partnerId = activeConversations[userId];
        if (partnerId) {
        
          const partnerSocketId = userSocketMap[partnerId]?.socketId;
          if (partnerSocketId) {
            io.to(partnerSocketId).emit("partnerDisconnected", { userId });
          }
          
       
          delete activeConversations[userId];
          delete activeConversations[partnerId];
        }
        
      
        delete userSocketMap[userId];
        
     
        const onlineDoctors = Object.keys(userSocketMap).filter(id => userSocketMap[id].role === 'doctor');
        const onlinePatients = Object.keys(userSocketMap).filter(id => userSocketMap[id].role === 'patient');
        
        io.emit("getOnlineDoctors", onlineDoctors);
        io.emit("getOnlinePatients", onlinePatients);
      }
    });
  });

  function getReceiverSocketId(userId: string): string | undefined {
    return userSocketMap[userId]?.socketId;
  }

  function getCurrentPartner(userId: string): string | undefined {
    return activeConversations[userId];
  }

  return { io, getReceiverSocketId, getCurrentPartner };
}