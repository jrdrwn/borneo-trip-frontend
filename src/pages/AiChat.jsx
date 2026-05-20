import React, { useState } from "react";
import { Bot, Leaf, Send, Sparkles, LoaderCircle } from "lucide-react";
import { api } from "../services/api.js";
import TourCard from "../components/TourCard.jsx";
import { destinationsToTours } from "../utils/tourMapper.js";

const quickPrompts = [
  "Rekomendasi wisata alam di Barito Selatan",
  "Apa saja wisata sejarah di Barito Selatan?",
  "Di mana alamat Danau Sanggu?",
  "Berapa rating Danau Sanggu?"
];

export default function AiChat() {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Halo, Aku AI BorneoTrip! bisa membantu memberikan rekomendasi wisata Kalimantan Tengah."
    }
  ]);

  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = input) => {
    const finalText = text.trim();

    if (!finalText || loading) return;

    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { from: "user", text: finalText }]);

    try {
      const response = await api.askAI(finalText);

      setResult(response);

      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text:
            response?.answer ||
            "Maaf, saya belum menemukan jawaban yang sesuai. Coba tanyakan dengan nama destinasi, kategori wisata, wilayah, alamat, atau rating."
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Maaf, saya belum memahami pertanyaanmu. Coba tanyakan dengan lebih jelas, misalnya nama destinasi, kategori wisata, wilayah, alamat, atau rating."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const recommendedTours = destinationsToTours(result?.recommendations || []);

  return (
    <section className="chat-page">
      <style>
        {`
          .send-button {
            background: #008a69 !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 999px !important;
            padding: 16px 34px !important;
            font-size: 18px !important;
            font-weight: 800 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 10px !important;
            cursor: pointer !important;
            transition: 0.2s ease !important;
            opacity: 1 !important;
          }

          .send-button:hover:not(.is-loading) {
            background: #00775b !important;
            transform: translateY(-1px);
          }

          .send-button.is-loading,
          .send-button:disabled {
            background: #cfd8d3 !important;
            color: #ffffff !important;
            cursor: not-allowed !important;
            transform: none !important;
          }

          .loading-icon {
            animation: spinLoading 0.8s linear infinite;
          }

          @keyframes spinLoading {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div className="container chat-container">
        <div className="chat-header">
          <div className="ai-logo">
            <Bot size={18} />
          </div>

          <div>
            <h1>AI BorneoTrip</h1>
            <p>Asisten wisata berbasis NLP dan Knowledge Graph Neo4j.</p>
          </div>

          <span className="status">
            <Leaf size={13} />
            Online
          </span>
        </div>

        <div className="welcome-card">
          <div className="welcome-icon">
            <Sparkles size={22} />
          </div>

          <h2>Selamat Datang di AI Assistant</h2>
          <p>Pilih prompt cepat atau ketik pertanyaanmu sendiri.</p>

          <div className="prompt-row">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.from}`}>
              <div className="avatar">
                {message.from === "ai" ? "AI" : "U"}
              </div>
              <p>{message.text}</p>
            </div>
          ))}

          {loading && (
            <div className="message ai">
              <div className="avatar">AI</div>
              <p>AI BorneoTrip Sedang Memproses Pertanyaan Anda, Mohon tunggu sebentar...</p>
            </div>
          )}
        </div>

        {result && (
          <div className="nlp-result-card">
            <h3>Hasil Analisis NLP</h3>

            <div className="nlp-grid">
              <p>
                <strong>Intent:</strong> {result.entities?.intent || "-"}
              </p>
              <p>
                <strong>Kategori:</strong> {result.entities?.kategori || "-"}
              </p>
              <p>
                <strong>Wilayah:</strong>{" "}
                {result.entities?.wilayah || result.entities?.provinsi || "-"}
              </p>
              <p>
                <strong>Destinasi:</strong> {result.entities?.destinasi || "-"}
              </p>
              <p className="span-2">
                <strong>Keyword:</strong>{" "}
                {(result.entities?.keywords || []).join(", ") || "-"}
              </p>
            </div>
          </div>
        )}

        {recommendedTours.length > 0 && (
          <div className="ai-recommendation-section">
            <h3>Rekomendasi Untuk Anda</h3>

            <div className="tour-grid">
              {recommendedTours.map((tour) => (
                <TourCard key={tour.id || tour.title} tour={tour} />
              ))}
            </div>
          </div>
        )}

        <div className="chat-input">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Tanyakan tentang wisata Kalimantan Tengah..."
          />

          <button
            className={`send-button ${loading ? "is-loading" : ""}`}
            type="button"
            onClick={() => sendMessage()}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="loading-icon" size={22} />
                Memproses...
              </>
            ) : (
              <>
                <Send size={22} />
                Kirim
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}