export const tours = [
  {
    id: 1,
    slug: "taman-nasional-tanjung-puting",
    title: "Taman Nasional Tanjung Puting",
    category: "alam",
    badge: "Terpopuler",
    location: "Kotawaringin Barat, Kalimantan Tengah",
    time: "08.00 - 17.00 WIB",
    ticket: "Rp25.000 - Rp50.000",
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521651201144-634f700b36ef?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Destinasi alam terkenal untuk melihat orangutan dan menyusuri sungai dengan klotok.",
    description: "Taman Nasional Tanjung Puting merupakan kawasan konservasi penting di Kalimantan Tengah. Wisatawan dapat menikmati perjalanan menyusuri sungai, melihat satwa liar, serta mengenal ekosistem hutan tropis Borneo.",
    facilities: ["Toilet", "Guide", "Perahu Klotok", "Spot Foto"],
    mapNote: "Area wisata berada di kawasan konservasi dengan akses sungai.",
    reviews: [
      { name: "Dina", rating: 5, text: "Tempatnya sangat alami dan pengalaman naik klotok benar-benar berkesan." },
      { name: "Raka", rating: 4, text: "Cocok untuk wisata edukasi dan melihat langsung satwa khas Kalimantan." }
    ]
  },
  {
    id: 2,
    slug: "danau-tahai",
    title: "Danau Tahai",
    category: "alam",
    badge: "Danau Cantik",
    location: "Palangka Raya, Kalimantan Tengah",
    time: "08.00 - 16.00 WIB",
    ticket: "Rp10.000 - Rp20.000",
    rating: 4.5,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Danau dengan suasana tenang, cocok untuk menikmati udara segar dan pemandangan alam.",
    description: "Danau Tahai dikenal dengan warna airnya yang khas dan suasana alam yang menenangkan. Destinasi ini cocok untuk wisata santai bersama keluarga.",
    facilities: ["Area Parkir", "Gazebo", "Toilet", "Warung"],
    mapNote: "Lokasi mudah dijangkau dari pusat Kota Palangka Raya.",
    reviews: [{ name: "Nadia", rating: 5, text: "Tempatnya sejuk dan cocok buat healing singkat." }]
  },
  {
    id: 3,
    slug: "air-terjun-sebuku",
    title: "Air Terjun Sebuku",
    category: "alam",
    badge: "Hidden Gem",
    location: "Kalimantan Tengah",
    time: "07.00 - 16.00 WIB",
    ticket: "Rp15.000",
    rating: 4.6,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Air terjun alami dengan suasana asri dan cocok untuk eksplorasi alam.",
    description: "Air Terjun Sebuku menawarkan suasana alam yang masih asri. Destinasi ini cocok bagi wisatawan yang menyukai petualangan ringan dan fotografi alam.",
    facilities: ["Spot Foto", "Area Trekking", "Parkir"],
    mapNote: "Akses menuju lokasi membutuhkan perjalanan darat dan trekking ringan.",
    reviews: [{ name: "Bagas", rating: 4, text: "Pemandangannya bagus, tapi perlu persiapan fisik sedikit." }]
  },
  {
    id: 4,
    slug: "museum-balanga",
    title: "Museum Balanga",
    category: "sejarah",
    badge: "Wisata Sejarah",
    location: "Palangka Raya, Kalimantan Tengah",
    time: "08.00 - 15.00 WIB",
    ticket: "Rp5.000 - Rp10.000",
    rating: 4.4,
    reviewCount: 63,
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Museum budaya yang menampilkan koleksi sejarah dan kehidupan masyarakat Dayak.",
    description: "Museum Balanga menyimpan berbagai koleksi budaya dan sejarah Kalimantan Tengah. Tempat ini cocok untuk wisata edukatif tentang tradisi lokal.",
    facilities: ["Ruang Pamer", "Guide", "Toilet", "Parkir"],
    mapNote: "Terletak di area kota sehingga aksesnya cukup mudah.",
    reviews: [{ name: "Arif", rating: 4, text: "Koleksinya menarik untuk mengenal budaya lokal." }]
  },
  {
    id: 5,
    slug: "rumah-betang",
    title: "Rumah Betang",
    category: "sejarah",
    badge: "Budaya Dayak",
    location: "Kalimantan Tengah",
    time: "08.00 - 17.00 WIB",
    ticket: "Gratis - Donasi",
    rating: 4.7,
    reviewCount: 91,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Rumah adat khas Dayak yang menjadi simbol kebersamaan dan budaya lokal.",
    description: "Rumah Betang adalah rumah adat masyarakat Dayak yang memiliki nilai sosial dan budaya tinggi. Wisatawan dapat mengenal arsitektur, nilai kebersamaan, dan tradisi setempat.",
    facilities: ["Guide Lokal", "Spot Foto", "Area Edukasi"],
    mapNote: "Lokasi dapat berbeda sesuai desa wisata yang dikunjungi.",
    reviews: [{ name: "Lia", rating: 5, text: "Bagus untuk belajar budaya dan foto-foto." }]
  },
  {
    id: 6,
    slug: "kafe-pampang",
    title: "Kafe Pampang",
    category: "kuliner",
    badge: "Tempat Santai",
    location: "Palangka Raya, Kalimantan Tengah",
    time: "10.00 - 23.00 WIB",
    ticket: "Rp20.000 - Rp75.000",
    rating: 4.5,
    reviewCount: 118,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ],
    shortDesc: "Kafe nyaman untuk bersantai, makan, dan berkumpul bersama teman.",
    description: "Kafe Pampang menawarkan suasana santai dengan pilihan makanan dan minuman yang cocok untuk anak muda maupun keluarga. Desain tempatnya nyaman untuk beristirahat setelah berwisata.",
    facilities: ["WiFi", "AC", "Outdoor Seating", "Live Music"],
    mapNote: "Lokasi strategis dan mudah ditemukan melalui peta digital.",
    reviews: [
      { name: "Salsa", rating: 5, text: "Tempatnya nyaman, cocok buat nongkrong dan foto-foto." },
      { name: "Ivan", rating: 4, text: "Menu cukup lengkap dan suasananya enak." }
    ]
  }
];

export const categories = [
  { title: "Wisata Alam", desc: "Jelajahi hutan, danau, air terjun, dan keindahan alam Kalimantan Tengah.", icon: "Mountain", path: "/wisata-alam" },
  { title: "Wisata Sejarah", desc: "Temukan cerita budaya, museum, rumah adat, dan jejak sejarah lokal.", icon: "Landmark", path: "/wisata-sejarah" },
  { title: "Wisata Kuliner", desc: "Nikmati makanan khas, kafe lokal, dan rekomendasi tempat makan.", icon: "Utensils", path: "/wisata-kuliner" }
];

export const events = [
  { date: "12 Mei 2026", title: "Festival Budaya Isen Mulang", place: "Palangka Raya" },
  { date: "18 Mei 2026", title: "Karnaval Budaya Dayak", place: "Kalimantan Tengah" },
  { date: "24 Mei 2026", title: "Pentas Seni Lokal", place: "Taman Kota" },
  { date: "30 Mei 2026", title: "Pameran Kuliner Kalimantan", place: "Palangka Raya" }
];

export const tips = [
  "Gunakan pakaian nyaman saat wisata alam.",
  "Bawa perlengkapan pribadi seperti obat dan botol minum.",
  "Jaga kebersihan dan hormati budaya lokal.",
  "Periksa jam buka destinasi sebelum berangkat."
];

export const getToursByCategory = (category) => tours.filter((tour) => tour.category === category);
export const getTourBySlug = (slug) => tours.find((tour) => tour.slug === slug);
