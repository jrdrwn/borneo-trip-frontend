const fallbackImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1200&q=80"
];

function hashString(value = "") {
  return String(value)
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
}

export function getFallbackImage(seed) {
  const index = hashString(seed) % fallbackImages.length;
  return fallbackImages[index];
}

export function isEmptyValue(value) {
  if (value === null || value === undefined) return true;

  const text = String(value).trim().toLowerCase();

  return (
    text === "" ||
    text === "-" ||
    text === "nan" ||
    text === "null" ||
    text === "none" ||
    text === "undefined"
  );
}

export function safeText(value, fallback = "Belum ada informasi") {
  return isEmptyValue(value) ? fallback : String(value).trim();
}

function firstValidValue(...values) {
  return values.find((value) => !isEmptyValue(value));
}

function normalizeImageUrl(value, seed) {
  if (isEmptyValue(value)) {
    return getFallbackImage(seed);
  }

  const raw = String(value).trim();

  if (raw.startsWith("http")) return raw;

  const cleanPath = raw.replace(/^\/+/, "");

  if (cleanPath.startsWith("uploads/")) {
    const uploadBase = import.meta.env.VITE_UPLOADS_URL || "http://localhost:5000";
    return `${uploadBase.replace(/\/$/, "")}/${cleanPath}`;
  }

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
  return `${apiBase.replace(/\/$/, "")}/${cleanPath}`;
}

function normalizeGalleryImages(item, image, title) {
  const gallerySource = item.gallery_images || item.gallery || item.galeri || [];

  if (Array.isArray(gallerySource)) {
    const cleanedGallery = gallerySource
      .filter((img) => !isEmptyValue(img))
      .map((img) => normalizeImageUrl(img, title));

    const uniqueGallery = [...new Set([image, ...cleanedGallery])];

    return uniqueGallery.length > 0
      ? uniqueGallery
      : [image, getFallbackImage(`${title}-2`), getFallbackImage(`${title}-3`)];
  }

  if (typeof gallerySource === "string" && !isEmptyValue(gallerySource)) {
    const cleanedGallery = gallerySource
      .split(/[,;|]/)
      .map((img) => img.trim())
      .filter((img) => !isEmptyValue(img))
      .map((img) => normalizeImageUrl(img, title));

    const uniqueGallery = [...new Set([image, ...cleanedGallery])];

    return uniqueGallery.length > 0
      ? uniqueGallery
      : [image, getFallbackImage(`${title}-2`), getFallbackImage(`${title}-3`)];
  }

  return [image, getFallbackImage(`${title}-2`), getFallbackImage(`${title}-3`)];
}

function normalizeFacilities(value) {
  if (Array.isArray(value)) {
    const facilities = value
      .map((item) => safeText(item, ""))
      .filter((item) => !isEmptyValue(item));

    return facilities.length > 0
      ? facilities
      : ["Informasi fasilitas belum tersedia"];
  }

  if (typeof value === "string") {
    if (isEmptyValue(value)) {
      return ["Informasi fasilitas belum tersedia"];
    }

    const facilities = value
      .split(/[,;|]/)
      .map((item) => safeText(item, ""))
      .filter((item) => !isEmptyValue(item));

    return facilities.length > 0
      ? facilities
      : ["Informasi fasilitas belum tersedia"];
  }

  return ["Informasi fasilitas belum tersedia"];
}

function normalizeRating(value) {
  if (isEmptyValue(value)) return "Belum ada rating";

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return safeText(value, "Belum ada rating");
  }

  return numberValue;
}

export function destinationToTour(item = {}) {
  const id = firstValidValue(item.id, item.slug, item.nama, item.name) || "unknown";
  const title = safeText(
    firstValidValue(item.nama, item.title, item.name),
    "Destinasi Tanpa Nama"
  );

  const image = normalizeImageUrl(
    firstValidValue(item.main_image, item.image, item.foto),
    title
  );

  const galleryImages = normalizeGalleryImages(item, image, title);

  const wilayah = safeText(item.wilayah, "");
  const provinsi = safeText(item.provinsi, "");
  const alamat = safeText(item.alamat, "");

  const location =
    !isEmptyValue(wilayah) && !isEmptyValue(provinsi)
      ? `${wilayah}, ${provinsi}`
      : !isEmptyValue(wilayah)
        ? wilayah
        : !isEmptyValue(alamat)
          ? alamat
          : safeText(item.location, "Belum ada informasi lokasi");

  return {
    raw: item,

    id,
    slug: String(id),

    title,
    category: safeText(firstValidValue(item.kategori, item.category), "Wisata"),
    badge: safeText(firstValidValue(item.kategori, item.category), "Destinasi"),

    location,
    address: safeText(item.alamat, "Belum ada informasi alamat"),

    time: safeText(
      firstValidValue(item.opening_hours, item.jam_buka, item.jam_operasional),
      "Informasi jam buka belum tersedia"
    ),

    ticket: safeText(
      firstValidValue(item.ticket_price, item.harga_tiket, item.tiket),
      "Informasi tiket belum tersedia"
    ),

    rating: normalizeRating(item.rating),
    reviewCount: isEmptyValue(item.jumlah_ulasan || item.reviewCount)
      ? 0
      : item.jumlah_ulasan || item.reviewCount,

    image,
    gallery: galleryImages,

    shortDesc: safeText(
      firstValidValue(item.short_description, item.alamat, item.teks_nlp, item.description),
      "Informasi singkat destinasi belum tersedia."
    ),

    description: safeText(
      firstValidValue(item.teks_nlp, item.description, item.deskripsi, item.alamat),
      "Informasi detail destinasi belum tersedia."
    ),

    facilities: normalizeFacilities(
      firstValidValue(item.facilities, item.fasilitas, item.fasilitas_umum)
    ),

    mapNote: safeText(
      item.alamat,
      "Lokasi dapat dilihat melalui koordinat atau tautan lokasi yang tersedia."
    ),

    reviews: Array.isArray(item.reviews) ? item.reviews : [],

    latitude: isEmptyValue(item.latitude) ? null : item.latitude,
    longitude: isEmptyValue(item.longitude) ? null : item.longitude,

    telepon: safeText(
      firstValidValue(item.telepon, item.phone, item.no_hp, item.kontak),
      "Kontak belum tersedia"
    ),

    website: safeText(
      firstValidValue(item.website, item.situs_web, item.link_website),
      "Belum ada informasi website"
    ),

    url: safeText(
      firstValidValue(item.url, item.google_maps_url, item.link_maps),
      "Belum ada informasi tautan"
    ),

    wilayah: safeText(item.wilayah, ""),
    provinsi: safeText(item.provinsi, ""),
    relevanceScore: item.relevance_score
  };
}

export function destinationsToTours(items = []) {
  return items.map(destinationToTour);
}

export function categoryNameToCard(name) {
  const lower = String(name).toLowerCase();
  let icon = "Mountain";
  let path = `/destinasi?kategori=${encodeURIComponent(name)}`;

  if (lower.includes("sejarah")) {
    icon = "Landmark";
    path = "/wisata-sejarah";
  } else if (lower.includes("kuliner")) {
    icon = "Utensils";
    path = "/wisata-kuliner";
  } else if (lower.includes("alam")) {
    icon = "Mountain";
    path = "/wisata-alam";
  }

  return {
    title: name,
    desc: `Lihat rekomendasi destinasi untuk kategori ${name}.`,
    icon,
    path
  };
}