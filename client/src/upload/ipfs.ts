import { create } from "ipfs-http-client";
 
const projectId = "your-infura-project-id";
const projectSecret = "your-infura-project-secret";
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,  
  },
});

export default ipfs;
