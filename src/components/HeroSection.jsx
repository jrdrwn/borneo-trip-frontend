import React from "react";
import { Link } from "react-router-dom";
import { Bot, MapPinned } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>Rekomendasi Wisata Kalimantan Tengah</h1>
          <p>
            Temukan wisata alam, sejarah, dan kuliner terbaik berdasarkan
            kategori serta preferensi perjalanan kamu.
          </p>

          <div className="hero-buttons">
            <Link to="/ai-chat" className="primary-btn">
              <Bot size={18} />
              Mulai Rekomendasi AI
            </Link>
            <Link to="/wisata-alam" className="secondary-btn">
              <MapPinned size={18} />
              Lihat Semua Kategori
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

