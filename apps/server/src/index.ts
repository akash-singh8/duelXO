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
  [key: string]: {
    occupied: boolean;
    client1: WebSocket;
    client2?: WebSocket;
  };
};

const wsClients: wsClient = {};

wss.on("connection", (ws, req) => {
  const url = new URL(req.url!, "http://localhost:3053");
  const roomId = url.searchParams.get("room");

  if (!roomId) {
    ws.send(JSON.stringify({ message: "Invalid request: required room id" }));
    ws.close();
    return;
  }
  1;

  let partners = wsClients[roomId];
  const clientNumber = partners ? 2 : 1;

  console.log(`Client ${clientNumber} joined room: ${roomId}`);

  if (partners) {
    if (partners.occupied) {
      ws.send(
        JSON.stringify({ message: "Invalid room id, room already occupied!" })
      );
      ws.close();
      return;
    }

    partners.client2 = ws;
    partners.occupied = true;
  } else {
    wsClients[roomId] = {
      occupied: false,
      client1: ws,
    };
    partners = wsClients[roomId];
  }

  ws.on("message", (message) => {
    const data = message.toString();

    if (!partners.occupied) {
      ws.send(
        JSON.stringify({ message: "Invalid request, can't find partner!" })
      );
      return;
    }

    (clientNumber === 1 ? partners.client2 : partners.client1)!.send(data);
  });

  ws.on("close", () => {
    console.log(`Client  ${clientNumber} disconnected`);
    (clientNumber === 1 ? partners.client2 : partners.client1)?.close();

    delete wsClients[roomId];
  });
});

server.listen(3053, () => {
  console.log("Server running at  -   http://localhost:3053");
});
