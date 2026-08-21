import React, { useState } from "react";
import {
  Bot,
  Send,
  LoaderCircle
} from "lucide-react";

import { api } from "../services/api.js";
import TourCard from "../components/TourCard.jsx";
import {
  destinationsToTours
} from "../utils/tourMapper.js";


const quickPrompts = [
  "Rekomendasi wisata alam di Barito Selatan",
  "Rekomendasi wisata sungai di Sampit",
  "Di mana alamat Danau Sanggu?",
  "Berapa rating Danau Sanggu?"
];


export default function AiChat() {

  // =========================================================
  // RIWAYAT PESAN
  // =========================================================
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text:
        "Selamat datang di BorneoTrip. " +
        "Saya dapat membantu memberikan informasi dan " +
        "rekomendasi destinasi wisata di Provinsi " +
        "Kalimantan Tengah."
    }
  ]);


  // =========================================================
  // INPUT
  // =========================================================
  const [input, setInput] = useState("");


  // =========================================================
  // HASIL API TERAKHIR
  // =========================================================
  const [result, setResult] = useState(null);


  // =========================================================
  // LOADING
  // =========================================================
  const [loading, setLoading] = useState(false);


  // =========================================================
  // CONTEXT PERCAKAPAN
  // =========================================================
  const [conversationContext, setConversationContext] =
    useState({
      last_question: null,
      last_destination: null,
      last_recommendations: [],
      shown_recommendations: [],
      last_entities: null
    });


  // =========================================================
  // CEK APAKAH PERTANYAAN MEMINTA REKOMENDASI LAIN
  // =========================================================
  const isOtherRecommendationRequest = (text) => {
    const normalized = String(text || "")
      .toLowerCase()
      .trim();

    const patterns = [
      "yang lain",
      "lainnya",
      "rekomendasi lain",
      "pilihan lain",
      "ada yang lain",
      "yang berbeda",
      "tempat lain",
      "yang lain lagi",
      "rekomendasi lainnya"
    ];

    return patterns.some((pattern) =>
      normalized.includes(pattern)
    );
  };


  // =========================================================
  // HILANGKAN DUPLIKASI NAMA DESTINASI
  // =========================================================
  const mergeUniqueNames = (...groups) => {
    const seen = new Set();
    const merged = [];

    groups.flat().forEach((name) => {
      const cleanName = String(name || "").trim();

      if (!cleanName) return;

      const key = cleanName.toLowerCase();

      if (!seen.has(key)) {
        seen.add(key);
        merged.push(cleanName);
      }
    });

    return merged;
  };


  // =========================================================
  // UPDATE CONTEXT
  // =========================================================
  const updateConversationContext = (
    response,
    userQuestion
  ) => {
    const recommendations =
      response?.recommendations || [];

    const recommendationNames = recommendations
      .map((item) => item?.nama)
      .filter(Boolean);

    const responseIntent =
      response?.entities?.intent || null;

    const responseDestination =
      response?.entities?.destinasi || null;

    const isRecommendationResponse = [
      "recommendation",
      "nearby_recommendation"
    ].includes(responseIntent);

    const isOtherRequest =
      isOtherRecommendationRequest(userQuestion);

    setConversationContext((previous) => {
      const nextContext = {
        ...previous
      };

      // -------------------------------------------------------
      // DESTINASI TERAKHIR
      // -------------------------------------------------------
      if (responseDestination) {
        nextContext.last_destination =
          responseDestination;
      } else if (
        isRecommendationResponse &&
        recommendationNames.length > 0
      ) {
        nextContext.last_destination =
          recommendationNames[0];
      }

      // -------------------------------------------------------
      // DAFTAR REKOMENDASI TERAKHIR
      // -------------------------------------------------------
      // Digunakan untuk referensi:
      // "nomor 1", "nomor 2", "yang ketiga", dan seterusnya.
      if (
        isRecommendationResponse &&
        recommendationNames.length > 0
      ) {
        nextContext.last_recommendations =
          recommendationNames;
      }

      // -------------------------------------------------------
      // SELURUH REKOMENDASI YANG SUDAH DITAMPILKAN
      // -------------------------------------------------------
      // Digunakan agar:
      // "ada yang lain?"
      // "yang lain lagi?"
      // tidak mengulang batch rekomendasi sebelumnya.
      if (
        isRecommendationResponse &&
        recommendationNames.length > 0
      ) {
        if (isOtherRequest) {
          nextContext.shown_recommendations =
            mergeUniqueNames(
              previous.shown_recommendations || [],
              recommendationNames
            );
        } else {
          // Pertanyaan rekomendasi baru memulai rangkaian baru.
          nextContext.shown_recommendations =
            mergeUniqueNames(recommendationNames);
        }
      }

      // -------------------------------------------------------
      // QUERY REKOMENDASI TERAKHIR
      // -------------------------------------------------------
      // Jika pengguna mengatakan "yang lain", pertanyaan utama
      // tetap memakai query rekomendasi sebelumnya.
      if (
        isRecommendationResponse &&
        !isOtherRequest
      ) {
        nextContext.last_question =
          userQuestion;

        nextContext.last_entities =
          response?.entities || null;
      }

      return nextContext;
    });
  };


  // =========================================================
  // KIRIM PESAN
  // =========================================================
  const sendMessage = async (text = input) => {

    const finalText = String(text || "").trim();

    if (!finalText || loading) {
      return;
    }

    setInput("");
    setLoading(true);

    setMessages((previous) => [
      ...previous,
      {
        from: "user",
        text: finalText
      }
    ]);

    try {
      const response = await api.askAI(
        finalText,
        conversationContext
      );

      setResult(response);

      const answer =
        response?.answer ||
        (
          "Maaf, sistem belum menemukan jawaban " +
          "yang sesuai dengan pertanyaan Anda."
        );

      setMessages((previous) => [
        ...previous,
        {
          from: "ai",
          text: answer
        }
      ]);

      updateConversationContext(
        response,
        finalText
      );

    } catch (error) {

      console.error(
        "Terjadi kesalahan saat menghubungi backend:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          from: "ai",
          text:
            "Maaf, sistem mengalami kendala saat " +
            "memproses pertanyaan Anda. Silakan coba " +
            "kembali dengan menyebutkan nama destinasi, " +
            "kategori wisata, wilayah, fasilitas, " +
            "alamat, atau rating."
        }
      ]);

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // HASIL REKOMENDASI UNTUK TOUR CARD
  // =========================================================
  const recommendedTours = destinationsToTours(
    result?.recommendations || []
  );


  // =========================================================
  // FOLLOW-UP SUGGESTIONS DARI BACKEND
  // =========================================================
  const followupSuggestions =
    result?.suggestions || [];


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

          .message p {
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }

          .processing-message {
            opacity: 0.8;
          }

          .followup-section {
            margin: -4px 0 18px 42px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .followup-button {
            border: 1px solid #008a69;
            background: #ffffff;
            color: #00775b;
            border-radius: 999px;
            padding: 8px 14px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            transition:
              background 0.2s ease,
              color 0.2s ease,
              border-color 0.2s ease;
          }

          .followup-button:hover:not(:disabled) {
            background: #008a69;
            color: #ffffff;
          }

          .followup-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          @media (max-width: 620px) {
            .followup-section {
              margin-left: 0;
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
            <h1>BorneoTrip</h1>
            <p>
              Asisten Wisata Kalimantan Tengah
            </p>
          </div>

          <span className="status">
            Online
          </span>
        </div>


        <div className="welcome-card">
          <h2>
            Selamat Datang di BorneoTrip
          </h2>

          <p>
            Pilih salah satu pertanyaan berikut atau
            masukkan pertanyaan Anda sendiri.
          </p>

          <div className="prompt-row">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() =>
                  sendMessage(prompt)
                }
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>


        <div className="message-list">
          {messages.map((message, index) => (
            <div
              key={`${message.from}-${index}`}
              className={`message ${message.from}`}
            >
              <div className="avatar">
                {message.from === "ai"
                  ? "AI"
                  : "U"}
              </div>

              <p>
                {message.text}
              </p>
            </div>
          ))}

          {loading && (
            <div
              className="message ai processing-message"
            >
              <div className="avatar">
                AI
              </div>

              <p>
                Sistem sedang memproses pertanyaan Anda.
                Mohon tunggu sebentar.
              </p>
            </div>
          )}
        </div>


        {!loading &&
          followupSuggestions.length > 0 && (
            <div className="followup-section">
              {followupSuggestions.map(
                (suggestion) => (
                  <button
                    key={
                      suggestion.question ||
                      suggestion.label
                    }
                    className="followup-button"
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      sendMessage(
                        suggestion.question
                      )
                    }
                  >
                    {suggestion.label}
                  </button>
                )
              )}
            </div>
          )}


        {result && (
          <div className="nlp-result-card">
            <h3>
              Hasil Analisis NLP
            </h3>

            <div className="nlp-grid">
              <p>
                <strong>Intent:</strong>{" "}
                {result.entities?.intent || "-"}
              </p>

              <p>
                <strong>Kategori:</strong>{" "}
                {result.entities?.kategori || "-"}
              </p>

              <p>
                <strong>Karakteristik:</strong>{" "}
                {result.entities?.karakteristik || "-"}
              </p>

              <p>
                <strong>Wilayah:</strong>{" "}
                {
                  result.entities?.wilayah ||
                  result.entities?.provinsi ||
                  "-"
                }
              </p>

              <p>
                <strong>Destinasi:</strong>{" "}
                {
                  result.entities?.destinasi ||
                  "-"
                }
              </p>

              <p className="span-2">
                <strong>Keyword:</strong>{" "}
                {
                  (
                    result.entities?.keywords || []
                  ).join(", ") || "-"
                }
              </p>
            </div>
          </div>
        )}


        {recommendedTours.length > 0 && (
          <div className="ai-recommendation-section">
            <h3>
              Rekomendasi Destinasi
            </h3>

            <div className="tour-grid">
              {recommendedTours.map((tour) => (
                <TourCard
                  key={
                    tour.id ||
                    tour.title
                  }
                  tour={tour}
                />
              ))}
            </div>
          </div>
        )}


        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(event) => {
              setInput(
                event.target.value
              );
            }}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !loading
              ) {
                sendMessage();
              }
            }}
            placeholder={
              "Tanyakan tentang wisata Kalimantan Tengah..."
            }
            disabled={loading}
          />

          <button
            className={
              `send-button ${
                loading
                  ? "is-loading"
                  : ""
              }`
            }
            type="button"
            onClick={() =>
              sendMessage()
            }
            disabled={
              loading ||
              !input.trim()
            }
          >
            {loading ? (
              <>
                <LoaderCircle
                  className="loading-icon"
                  size={22}
                />
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