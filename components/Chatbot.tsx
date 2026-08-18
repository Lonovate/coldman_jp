"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/lib/i18n/context";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const translations = {
  en: {
    title: "Chat with us",
    placeholder: "Type your message...",
    online: "Online now",
    quickReplies: [
      "Get a quote",
      "Schedule service",
      "Maintenance pricing",
      "Emergency repair",
    ],
    greeting: "Hello! How can I help you with your HVAC needs today?",
    errorReply:
      "Sorry, I'm having trouble responding right now. Please try again or call (787) 525-6934.",
  },
  es: {
    title: "Chatea con nosotros",
    placeholder: "Escribe tu mensaje...",
    online: "En línea ahora",
    quickReplies: [
      "Obtener cotización",
      "Agendar servicio",
      "Precios de mantenimiento",
      "Reparación de emergencia",
    ],
    greeting:
      "¡Hola! ¿Cómo puedo ayudarte con tus necesidades de HVAC hoy?",
    errorReply:
      "Lo siento, tengo problemas para responder ahora. Por favor intenta de nuevo o llama al (787) 525-6934.",
  },
};

function generateThreadId(): string {
  return crypto.randomUUID();
}

export function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId] = useState(() => generateThreadId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatButtonRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // Close chat when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(target) &&
        chatButtonRef.current &&
        !chatButtonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: t.greeting,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [language, t.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now(),
        text,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            threadId,
          }),
        });

        if (!response.ok) {
          throw new Error("API error");
        }

        const data = await response.json();

        const botResponse: Message = {
          id: Date.now() + 1,
          text: data.message || t.errorReply,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      } catch {
        const errorMessage: Message = {
          id: Date.now() + 1,
          text: t.errorReply,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, threadId, t.errorReply]
  );

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        ref={chatButtonRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 shadow-2xl transition-shadow bg-blue-600 hover:bg-blue-700"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                  <img
                    src="/logo.png"
                    alt="Coldman JP"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-bold">Coldman JP</div>
                  <div className="text-xs text-blue-100">{t.online}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-80 sm:h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="bg-white text-gray-900 rounded-2xl rounded-bl-none shadow-sm px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-white border-t flex gap-2 overflow-x-auto">
              {t.quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  disabled={isLoading}
                  className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full whitespace-nowrap hover:bg-blue-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.placeholder}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                disabled={isLoading || !inputValue.trim()}
                className="shrink-0 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
