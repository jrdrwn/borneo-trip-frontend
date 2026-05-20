import React from "react";
import { Link } from "react-router-dom";
import { Bot, Send, Sparkles } from "lucide-react";

export default function AISearchSection() {
  return (
    <section className="ai-search-section">
      <div className="container">
        <div className="ai-search-card">
          <div className="ai-title-icon"><Bot size={22} /></div>

          <h2>Cari Wisata dengan AI</h2>
          <p>AI dapat membantu memilih wisata yang sesuai dengan preferensi kamu.</p>

          <div className="fake-chat-box">
            <div className="chat-question">
              Rekomendasikan wisata alam di Palangka Raya
              <button><Send size={15} /></button>
            </div>

            <div className="chat-answer">
              <Sparkles size={17} />
              <div>
                <strong>Berikut rekomendasi wisata untuk kamu:</strong>
                <ul>
                  <li>Danau Tahai - cocok untuk wisata santai.</li>
                  <li>Taman Nasional Tanjung Puting - cocok untuk petualangan.</li>
                  <li>Kafe Pampang - cocok untuk kuliner santai.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="ai-feature-row">
            <span>Jawaban cepat dari AI</span>
            <span>Rekomendasi berdasarkan kategori</span>
            <span>Terhubung data destinasi lokal</span>
          </div>

          <Link to="/ai-chat" className="primary-btn ai-link">Buka AI Chat</Link>
        </div>
      </div>
    </section>
  );
}

