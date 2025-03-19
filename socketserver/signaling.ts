import {WebSocket,WebSocketServer} from 'ws'

const wss = new WebSocketServer({port :8080});

let senderSocket : null | WebSocket = null;
let recevierSocket : null | WebSocket = null;
wss.on('connection',function connection(ws){
    ws.on('error',console.error);
    ws.on('message',function message(data:any){
        const message = JSON.parse(data);
        if(message.type === 'sender'){
            console.log('sender set');
         senderSocket =ws ;   
        } else if(message.type==="receiver"){
            console.log("receiver set")

         recevierSocket=ws;
        }else if(message.type === 'createOffer'){
            console.log('offer received')
            if(ws!=senderSocket){
                return;
            }
            recevierSocket?.send(JSON.stringify({type:'createOffer',sdp:message.sdp}))

        }else if(message.type === 'createAnswer'){
            console.log("Answer received");
            if( ws != recevierSocket){
                return;
            }
            senderSocket?.send(JSON.stringify({type:'createOffer',sdp:message.sdp}));

        }else if(message.type === 'iceCandidate'){
            if(ws === senderSocket){
                recevierSocket?.send(JSON.stringify({type:'iceCandidate',candidate : message.candidate}));

            }else if(ws === recevierSocket){
                senderSocket?.send(JSON.stringify({type:'iceCandidate',candidate : message.candidate}));
                
            }
        }
    })
})