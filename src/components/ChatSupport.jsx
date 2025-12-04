"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function ChatSupport() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const wsRef = useRef(null);

  useEffect(() => {
    if (!session?.user?.name) return; // si pas connecté, ne fait rien

    const ws = new WebSocket(
      `ws://localhost:4000?username=${session.user.name}&role=${session.user.role || "Utilisateur"}`
    );

    ws.onopen = () => console.log("WebSocket connecté !");
    ws.onclose = () => console.log("WebSocket fermé !");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "history") {
        setMessages(data.messages);
      } else if (data.type === "message") {
        setMessages((prev) => [...prev, data]);
      }
    };

    wsRef.current = ws;

    return () => ws.close();
  }, [session]);

  const sendMessage = () => {
    if (!input || !wsRef.current) return;

    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text: input, type: "message" }));
      setInput("");
    } else {
      console.warn("WebSocket non encore ouvert !");
    }
  };

  // Si l'utilisateur n'est pas connecté, ne rien afficher
  if (!session?.user?.name) return null;

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-orange-500 rounded-full text-white text-2xl shadow-lg z-50"
      >
        💬
      </button>

      {/* Chat */}
      {open && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col z-50">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-1 ${msg.role === "admin" ? "text-red-600" : "text-gray-800"}`}
              >
                <b>{msg.user} ({msg.role}) :</b> {msg.text}
              </div>
            ))}
          </div>

          {/* Input + bouton */}
          <div className="flex p-2 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded p-1"
              placeholder="Écrire un message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 text-white px-3 rounded"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
