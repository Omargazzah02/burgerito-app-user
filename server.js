const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 4000 });

const messages = [];

wss.on("connection", (ws, req) => {
  const params = new URL(req.url, "http://localhost").searchParams;
  ws.username = params.get("username") || "Anonyme";
  ws.role = params.get("role") || "user";

  console.log(`${ws.username} connecté`);

  ws.send(JSON.stringify({ type: "history", messages }));

  ws.on("message", (msg) => {
    const data = JSON.parse(msg.toString());
    const newMsg = {
      user: ws.username,
      role: ws.role,
      text: data.text,
      time: Date.now(),
    };
    messages.push(newMsg);

    wss.clients.forEach((client) => {
      // ✅ utiliser client.OPEN au lieu de WebSocket.OPEN
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ type: "message", ...newMsg }));
      }
    });
  });

  ws.on("close", () => console.log(`${ws.username} déconnecté`));
});

console.log("WebSocketServer running on ws://localhost:4000");
