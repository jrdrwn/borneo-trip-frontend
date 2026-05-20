from pathlib import Path
import re

path = Path("src/utils/tourMapper.js")
text = path.read_text(encoding="utf-8")

new_func = r'''function normalizeImageUrl(value, seed) {
  if (!value || value === "-" || value === "null" || value === "nan") {
    return getFallbackImage(seed);
  }

  const raw = String(value).trim();

  if (!raw || raw.toLowerCase() === "nan" || raw.toLowerCase() === "null") {
    return getFallbackImage(seed);
  }

  if (raw.startsWith("http")) return raw;

  const cleanPath = raw.replace(/^\/+/, "");

  if (cleanPath.startsWith("uploads/")) {
    const uploadBase = import.meta.env.VITE_UPLOADS_URL || "http://localhost:5000";
    return `${uploadBase.replace(/\/$/, "")}/${cleanPath}`;
  }

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
  return `${apiBase.replace(/\/$/, "")}/${cleanPath}`;
}'''

text = re.sub(
    r"function normalizeImageUrl\(value, seed\) \{.*?\n\}",
    new_func,
    text,
    flags=re.S
)

path.write_text(text, encoding="utf-8")
print("Frontend utama sudah diarahkan membaca uploads dari backend admin.")
