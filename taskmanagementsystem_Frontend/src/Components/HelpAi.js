import React, { useState, useEffect } from "react";
import { getOpenAIResponse } from "../Api/HelpAIApi";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import "../Styles/HelpAi.css";

function HelpAI({ darkMode, setActiveComponent }) {
  const { t } = useTranslation();

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("aiChats")) || [];
    setHistory(savedChats);
  }, []);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setPrompt("");
    setLoading(true);

    try {
      const result = await getOpenAIResponse(prompt);

      const botMessage = {
        role: "bot",
        content: result?.success ? result.data : t("errorFetchingResponse")
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      saveChat(finalMessages);

    } catch (err) {

      setMessages([
        ...updatedMessages,
        { role: "bot", content: t("errorFetchingResponse") }
      ]);

    }

    setLoading(false);
  };

  const saveChat = (chatMessages) => {
    let chats = JSON.parse(localStorage.getItem("aiChats")) || [];

    if (currentChatId) {

      chats = chats.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: chatMessages }
          : chat
      );

    } else {

      const newChat = {
        id: Date.now(),
        title: chatMessages[0].content.substring(0, 20),
        messages: chatMessages
      };

      chats.push(newChat);
      setCurrentChatId(newChat.id);
    }

    localStorage.setItem("aiChats", JSON.stringify(chats));
    setHistory(chats);
  };

  const loadChat = (chat) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
  };

  const newChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  const deleteChat = (id) => {

    let chats = JSON.parse(localStorage.getItem("aiChats")) || [];

    chats = chats.filter(chat => chat.id !== id);

    localStorage.setItem("aiChats", JSON.stringify(chats));
    setHistory(chats);

    if (id === currentChatId) newChat();
  };

  return (
    <div className={`ai-main ${darkMode ? "dark" : ""}`}>

      <div className="ai-header">
        <FontAwesomeIcon icon={faRobot} />
        <span>{t("aiAssistant")}</span>
      </div>

      <div className="ai-body">

        <div className="ai-sidebar">

          <button className="new-chat-btn" onClick={newChat}>
            + {t("newChat")}
          </button>

          {history.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${chat.id === currentChatId ? "active" : ""}`}
            >

              <span onClick={() => loadChat(chat)}>
                {chat.title}
              </span>

              <button onClick={() => deleteChat(chat.id)}>
                ✖
              </button>

            </div>
          ))}

        </div>

        <div className="ai-chat-window">

          <div className="ai-messages">

            {messages.map((msg, i) => (

              <div key={i} className={`ai-message ${msg.role}`}>
                {msg.content}
              </div>

            ))}

          </div>

          <div className="ai-input-area">

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t("askAI")}
              disabled={loading}
            />

            <button
              onClick={handleAskAI}
              disabled={loading || !prompt.trim()}
            >
              {loading ? t("processing") : t("send")}
            </button>

          </div>

        </div>

      </div>

      {/* Back Button */}
      <div className="ai-footer">
        <button
          className="back-btn"
          onClick={() => setActiveComponent("Settings")}
        >
          ← Back to Settings
        </button>
      </div>

    </div>
  );
}

export default HelpAI;