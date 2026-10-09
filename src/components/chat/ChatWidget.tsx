import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/public/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || "Error al obtener respuesta." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error de conexión. Intenta de nuevo." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const placeholder =
    language === "es"
      ? "Pregunta sobre el menú..."
      : "Ask about the menu...";

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
          aria-label="Chat"
        >
          <img
            src="/profile.png"
            alt="Asistente"
            className="w-full h-full object-cover rounded-full ring-2 ring-primary-foreground/60"
          />
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] h-[480px] max-h-[calc(100vh-6rem)] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden max-sm:right-2 max-sm:bottom-2 max-sm:w-[calc(100vw-1rem)] max-sm:h-[65vh]">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center gap-2">
            <img
              src="/profile.png"
              alt=""
              className="h-8 w-8 rounded-full object-cover ring-2 ring-primary-foreground/50"
            />
            <span className="text-primary-foreground font-semibold text-sm flex-1">
              Villita
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm mt-8">
                <img
                  src="/profile.png"
                  alt=""
                  className="h-14 w-14 rounded-full object-cover mx-auto mb-2 ring-2 ring-border"
                />
                {language === "es"
                  ? "¡Hola! Pregúntame sobre precios, platos, horarios..."
                  : "Hi! Ask me about prices, dishes, schedules..."}
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <img
                    src="/profile.png"
                    alt=""
                    className="h-6 w-6 rounded-full object-cover self-end shrink-0 ring-1 ring-border"
                  />
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-3 py-2 text-sm text-muted-foreground animate-pulse">
                  {language === "es" ? "Pensando..." : "Thinking..."}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 space-y-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={placeholder}
              disabled={isLoading}
              className="w-full bg-background border border-input rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={!input.trim() || isLoading}
              className="w-full h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 transition-opacity text-sm font-medium"
            >
              <Send className="h-4 w-4" />
              {language === "es" ? "Enviar" : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
