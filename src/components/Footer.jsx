import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3><span>B</span>BorneoTrip</h3>
          <p>
            Platform rekomendasi wisata Kalimantan Tengah berbasis kategori,
            informasi destinasi, dan bantuan pencarian melalui AI.
          </p>
        </div>

        <div>
          <h4>Navigasi Cepat</h4>
          <a href="/">Beranda</a>
          <a href="/wisata-alam">Wisata Alam</a>
          <a href="/wisata-sejarah">Wisata Sejarah</a>
          <a href="/wisata-kuliner">Wisata Kuliner</a>
        </div>

        <div>
          <h4>Kontak Kami</h4>
          <p><MapPin size={16} />Palangka Raya, Kalimantan Tengah</p>
          <p><Phone size={16} />+62 812 0000 0000</p>
          <p><Mail size={16} />hello@borneotrip.id</p>
        </div>
      </div>

      <div className="footer-bottom">© 2026 BorneoTrip. All rights reserved.</div>
    </footer>
  );
}

