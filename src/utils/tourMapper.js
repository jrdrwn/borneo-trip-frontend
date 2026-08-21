const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Foto stok hanya digunakan sebagai visual kategori, bukan foto destinasi.
// Beberapa alternatif per kategori dipilih secara deterministik berdasarkan nama destinasi.
const CATEGORY_COVERS = {
  "wisata kuliner": [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=82"
  ],
  "wisata alam": [
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=82"
  ],
  akomodasi: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=82"
  ],
  penginapan: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=82"
  ],
  "wisata sejarah": [
    "https://images.unsplash.com/photo-1520637836862-4d197d17c38a?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1558449033-2cf8dbe77a3c?auto=format&fit=crop&w=1200&q=82"
  ],
  "wisata religi": [
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1577702312706-e23ff063064f?auto=format&fit=crop&w=1200&q=82"
  ],
  "wisata budaya": [
    "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=82"
  ],
  "wisata belanja": [
    "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=82"
  ],
  "wisata edukasi": [
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=82"
  ],
  "wisata buatan": [
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=1200&q=82"
  ],
  "wisata desa": [
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=82"
  ],
  destinasi: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=82"
  ]
};

function normalizeKey(value = "") {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function hashString(value = "") {
  let hash = 2166136261;

  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function categoryCoverList(category = "") {
  const normalized = normalizeKey(category);
  const matchedKey = Object.keys(CATEGORY_COVERS).find((key) =>
    normalized.includes(key)
  );

  return CATEGORY_COVERS[matchedKey || "destinasi"];
}

export function getCategoryCover(category = "", seed = "") {
  const images = categoryCoverList(category);
  return images[hashString(`${category}:${seed}`) % images.length];
}

export function getFallbackImage(seed, category = "") {
  return getCategoryCover(category, seed);
}

export function isEmptyValue(value) {
  if (value === null || value === undefined) return true;

  const text = String(value).trim().toLowerCase();
  return ["", "-", "nan", "null", "none", "undefined"].includes(text);
}

export function safeText(value, fallback = "Belum ada informasi") {
  return isEmptyValue(value) ? fallback : String(value).trim();
}

function firstValidValue(...values) {
  return values.find((value) => !isEmptyValue(value));
}

const CATEGORY_COVER_IDENTIFIERS = new Set(
  Object.values(CATEGORY_COVERS)
    .flat()
    .map((url) => {
      const match = String(url).match(/photo-[^?]+/i);
      return match ? match[0].toLowerCase() : String(url).split("?")[0].toLowerCase();
    })
);

const PLACEHOLDER_IMAGE_TYPES = new Set([
  "placeholder",
  "category_cover",
  "illustration",
  "illustration_only",
  "missing",
  "fallback",
  "unknown"
]);

function truthyFlag(value) {
  if (value === true || value === 1) return true;
  const normalized = normalizeKey(value);
  return ["true", "1", "yes", "ya"].includes(normalized);
}

function metadataMarksPlaceholder(item = {}) {
  const imageType = normalizeKey(
    firstValidValue(item.image_type, item.imageType, item.visual_status, item.gallery_composition) || ""
  );

  return (
    PLACEHOLDER_IMAGE_TYPES.has(imageType) ||
    imageType.includes("placeholder") ||
    imageType.includes("illustration") ||
    truthyFlag(item.image_is_placeholder) ||
    truthyFlag(item.gallery_has_placeholders)
  );
}

function metadataMarksGooglePlaces(item = {}) {
  const source = normalizeKey(
    firstValidValue(
      item.google_photo_source,
      item.image_source,
      item.imageSource,
      item.sumber_gambar
    ) || ""
  );

  return (
    source.includes("google places") ||
    source.includes("place photos") ||
    !isEmptyValue(item.google_place_id) ||
    (Array.isArray(item.google_photo_names) && item.google_photo_names.length > 0)
  );
}

export function isPlaceholderImage(value) {
  const url = normalizeKey(value);
  return (
    url.includes("/static/placeholders/") ||
    url.includes("category illustration") ||
    url.includes("ilustrasi-kategori") ||
    url.includes("illustration_only")
  );
}

export function isLegacyGoogleImage(value) {
  const url = normalizeKey(value);
  return (
    url.includes("googleusercontent.com") ||
    url.includes("maps.gstatic.com") ||
    url.includes("gstatic.com/mapfiles") ||
    url.includes("google.com/maps/photometa") ||
    url.includes("maps.googleapis.com") ||
    url.includes("places.googleapis.com") ||
    url.includes("streetviewpixels-pa.googleapis.com") ||
    url.includes("ggpht.com") ||
    url.includes("googleapis.com/maps") ||
    url.includes("staticmap") ||
    url.includes("streetview")
  );
}

function isDirectGooglePlacesPhoto(value) {
  if (isEmptyValue(value)) return false;

  try {
    const parsed = new URL(String(value).trim());
    const host = parsed.hostname.toLowerCase();
    return (
      host === "googleusercontent.com" ||
      host.endsWith(".googleusercontent.com") ||
      host === "ggpht.com" ||
      host.endsWith(".ggpht.com")
    );
  } catch {
    return false;
  }
}

function isUnsafeGoogleApiUrl(value) {
  const url = normalizeKey(value);
  return (
    url.includes("maps.googleapis.com/maps/api/place/photo") ||
    url.includes("places.googleapis.com/v1/") ||
    /[?&]key=/i.test(String(value || "")) ||
    url.includes("streetview") ||
    url.includes("staticmap")
  );
}

function isKnownCategoryCover(value) {
  const url = String(value || "").toLowerCase();
  for (const identifier of CATEGORY_COVER_IDENTIFIERS) {
    if (identifier && url.includes(identifier)) return true;
  }
  return false;
}

function isObviousBrokenImage(value) {
  const url = normalizeKey(value);
  return (
    url.includes("no-photo") ||
    url.includes("no_photo") ||
    url.includes("no image") ||
    url.includes("no_image") ||
    url.includes("no-image") ||
    url.includes("imagenotavailable") ||
    url.includes("image-not-available") ||
    url.includes("image_not_available") ||
    url.includes("image-not-found") ||
    url.includes("image_not_found") ||
    url.includes("maps_no_image") ||
    url.includes("photo_unavailable") ||
    url.includes("placeholder.com") ||
    url.includes("placehold.co") ||
    url.includes("dummyimage.com")
  );
}

export function isUsableDestinationImage(value, options = {}) {
  if (isEmptyValue(value)) return false;

  const url = String(value).trim();
  const allowGooglePlaces = Boolean(options.allowGooglePlaces);
  const directGooglePhoto = isDirectGooglePlacesPhoto(url);

  if (
    isPlaceholderImage(url) ||
    isObviousBrokenImage(url) ||
    isKnownCategoryCover(url) ||
    isUnsafeGoogleApiUrl(url)
  ) {
    return false;
  }

  if (isLegacyGoogleImage(url) && !(allowGooglePlaces && directGooglePhoto)) {
    return false;
  }

  return (
    /^https?:\/\//i.test(url) ||
    /^\/?uploads\//i.test(url) ||
    /^\/?static\/destinations\//i.test(url)
  );
}

function normalizeImageUrl(value) {
  if (isEmptyValue(value)) return "";

  const raw = String(value).trim();
  if (/^https?:\/\//i.test(raw)) return raw;

  const cleanPath = raw.replace(/^\/+/, "");

  if (cleanPath.startsWith("uploads/")) {
    const uploadBase = import.meta.env.VITE_UPLOADS_URL || API_BASE_URL;
    return `${uploadBase.replace(/\/$/, "")}/${cleanPath}`;
  }

  return `${API_BASE_URL.replace(/\/$/, "")}/${cleanPath}`;
}

function parseGallerySource(value) {
  if (Array.isArray(value)) return value;
  if (isEmptyValue(value)) return [];

  const text = String(value).trim();

  if (text.startsWith("[") && text.endsWith("]")) {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return text
        .slice(1, -1)
        .split(/,\s*(?=https?:\/\/|\/static\/|\/uploads\/)/i)
        .map((entry) => entry.trim().replace(/^['\"]|['\"]$/g, ""));
    }
  }

  return text
    .split(/[;|\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizeRealGallery(item, rawMainImage) {
  const source = parseGallerySource(
    item.gallery_images || item.gallery || item.galeri || []
  );
  const mainCandidate = metadataMarksPlaceholder(item) ? "" : rawMainImage;
  const allowGooglePlaces =
    metadataMarksGooglePlaces(item) ||
    [mainCandidate, ...source].some(isDirectGooglePlacesPhoto);

  const candidates = [mainCandidate, ...source]
    .filter((value) =>
      isUsableDestinationImage(value, { allowGooglePlaces })
    )
    .map(normalizeImageUrl)
    .filter(Boolean);

  return [...new Set(candidates)].slice(0, 12);
}

function parseAttributionEntry(value) {
  const text = safeText(value, "");
  if (!text) return null;

  const match = text.match(/^(.*?)\s*\((https?:\/\/[^)]+)\)\s*$/i);
  if (!match) {
    return { name: text, url: "", text };
  }

  return {
    name: match[1].trim() || "Kontributor Google",
    url: match[2].trim(),
    text
  };
}

function normalizeGoogleAttributions(value) {
  const source = Array.isArray(value)
    ? value
    : isEmptyValue(value)
      ? []
      : [value];

  return source
    .map(parseAttributionEntry)
    .filter(Boolean);
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

  const numeric = Number(value);
  return Number.isNaN(numeric) ? safeText(value, "Belum ada rating") : numeric;
}

export function destinationToTour(item = {}) {
  const id = firstValidValue(item.id, item.slug, item.nama, item.name) || "unknown";
  const title = safeText(
    firstValidValue(item.nama, item.title, item.name),
    "Destinasi Tanpa Nama"
  );
  const category = safeText(
    firstValidValue(item.kategori, item.category),
    "Destinasi"
  );

  const rawMainImage = firstValidValue(item.main_image, item.image, item.foto);
  const rawGallerySource = parseGallerySource(
    item.gallery_images || item.gallery || item.galeri || []
  );
  const googlePlacesPhoto =
    metadataMarksGooglePlaces(item) ||
    [rawMainImage, ...rawGallerySource].some(isDirectGooglePlacesPhoto);
  const realGallery = normalizeRealGallery(item, rawMainImage);
  const rejectStoredMain = metadataMarksPlaceholder(item);
  const realMainImage = !rejectStoredMain && isUsableDestinationImage(
    rawMainImage,
    { allowGooglePlaces: googlePlacesPhoto }
  )
    ? normalizeImageUrl(rawMainImage)
    : realGallery[0] || "";
  const categoryCover = getCategoryCover(category, title);
  const hasDestinationPhoto = Boolean(realMainImage);
  const image = hasDestinationPhoto ? realMainImage : categoryCover;
  const googlePhotoAttributions = normalizeGoogleAttributions(
    item.google_photo_attributions
  );
  const primaryGoogleAttribution = googlePhotoAttributions[0] || null;

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
    category,
    badge: category,
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
    fallbackImage: categoryCover,
    gallery: realGallery,
    galleryAttributions: googlePhotoAttributions,
    hasDestinationPhoto,
    hasRealGallery: realGallery.length > 0,
    isPlaceholder: !hasDestinationPhoto,
    isGooglePlacesPhoto: hasDestinationPhoto && googlePlacesPhoto,
    imageType: hasDestinationPhoto
      ? safeText(item.image_type, googlePlacesPhoto ? "google_places" : "destination")
      : "category_cover",
    imageLabel: hasDestinationPhoto
      ? googlePlacesPhoto
        ? "Foto Google Places"
        : "Foto destinasi"
      : "Visual kategori",
    imageSource: hasDestinationPhoto
      ? safeText(
          firstValidValue(item.google_photo_source, item.image_source),
          googlePlacesPhoto ? "Google Places API (New)" : "Sumber belum dicatat"
        )
      : "Unsplash category cover",
    imageTitle: hasDestinationPhoto ? safeText(item.image_title, "") : "",
    imageLicense: hasDestinationPhoto ? safeText(item.image_license, "") : "",
    imageLicenseUrl: hasDestinationPhoto
      ? safeText(item.image_license_url, "")
      : "",
    imageArtist: hasDestinationPhoto
      ? safeText(
          firstValidValue(item.image_artist, primaryGoogleAttribution?.name),
          ""
        )
      : "",
    imageAttribution: hasDestinationPhoto
      ? safeText(
          firstValidValue(item.image_attribution, primaryGoogleAttribution?.text),
          ""
        )
      : "",
    imagePageUrl: hasDestinationPhoto
      ? safeText(
          firstValidValue(item.image_page_url, primaryGoogleAttribution?.url),
          ""
        )
      : "",
    imageVerificationStatus: hasDestinationPhoto
      ? safeText(
          item.image_verification_status,
          googlePlacesPhoto ? "google_places_fetched" : "auto_matched"
        )
      : "category_cover",
    googlePlaceId: safeText(item.google_place_id, ""),

    shortDesc: safeText(
      firstValidValue(item.short_description, item.alamat, item.description),
      "Informasi singkat destinasi belum tersedia."
    ),
    description: safeText(
      firstValidValue(item.description, item.deskripsi, item.teks_nlp, item.alamat),
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
