import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import AiChat from "./pages/AiChat.jsx";
import DestinationsPage from "./pages/DestinationsPage.jsx";
import NaturePage from "./pages/NaturePage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import CulinaryPage from "./pages/CulinaryPage.jsx";
import TourDetail from "./pages/TourDetail.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-chat" element={<AiChat />} />
          <Route path="/destinasi" element={<DestinationsPage />} />
          <Route path="/wisata-alam" element={<NaturePage />} />
          <Route path="/wisata-sejarah" element={<HistoryPage />} />
          <Route path="/wisata-kuliner" element={<CulinaryPage />} />
          <Route path="/wisata/:slug" element={<TourDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

