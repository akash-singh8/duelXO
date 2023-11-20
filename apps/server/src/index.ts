import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

type wsClient = {
  [key: number]: {
    room: string;
    ws: WebSocket;
  };
};

let wsConnections = 0;
const wsClients: wsClient = {};

wss.on("connection", (ws, req) => {
  const clientId = wsConnections++;
  const url = new URL(req.url!, "http://localhost:3053");
  const roomId = url.searchParams.get("room");

  if (!roomId) {
    ws.send("Invalid request: required room id");
    ws.close();
    return;
  }
  
  console.log(`Client ${clientId} joined room: ${roomId}`);

  wsClients[clientId] = {
    room: roomId,
    ws: ws,
  };

  ws.on("message", (message) => {
    const data = message.toString();
    console.log("Received Message :", data);

    Object.values(wsClients).forEach((client) => {
      if (client.room === roomId) {
        client.ws.send(data);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected", clientId);
    delete wsClients[clientId];
  });
});

server.listen(3053, () => {
  console.log("Server running at  -   http://localhost:3053");
});
