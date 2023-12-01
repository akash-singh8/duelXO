import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { validMove } from "common/src";
import { config } from "dotenv";

config();
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
  const url = new URL(req.url!, `${process.env.SERVER_BASE_URL}`);
  const roomId = url.searchParams.get("room");

  if (!roomId) {
    ws.send(
      JSON.stringify({
        status: 404,
        message: "Invalid request: required room id",
      })
    );
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
        JSON.stringify({
          status: 409,
          message: "Invalid room id, room already occupied!",
        })
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
    if (!partners.occupied) {
      ws.send(
        JSON.stringify({
          status: 404,
          message: "Invalid request, can't find partner!",
        })
      );
      return;
    }

    try {
      const data = JSON.parse(message.toString());
      const isValidData = validMove.safeParse(data);

      if (!isValidData.success) {
        const error = {
          status: 400,
          message: "Invalid input data!",
        };

        ws.send(JSON.stringify({ error }));
        return;
      }

      const newData = {
        error: {
          status: 200,
          message: "NA",
        },
        move: {
          ...isValidData.data,
        },
      };

      (clientNumber === 1 ? partners.client2 : partners.client1)!.send(
        JSON.stringify(newData)
      );
    } catch (err) {
      const error = {
        status: 400,
        message: "Invalid request message!",
      };

      ws.send(JSON.stringify({ error }));
    }
  });

  ws.on("close", () => {
    console.log(`Client  ${clientNumber} disconnected`);
    (clientNumber === 1 ? partners.client2 : partners.client1)?.close();

    delete wsClients[roomId];
  });
});

server.listen(3053, () => {
  console.log(`Server running at  -   ${process.env.SERVER_BASE_URL}`);
});
