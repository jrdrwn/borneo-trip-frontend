# BorneoTrip Frontend Neo4j Connected

Frontend ini mempertahankan desain BorneoTrip dari file yang kamu kirim, tetapi sudah disesuaikan agar membaca data dari backend FastAPI + Neo4j.

## Backend yang didukung

Frontend ini memakai endpoint backend:

```txt
GET  http://localhost:8000/api/public/categories
GET  http://localhost:8000/api/public/regions
GET  http://localhost:8000/api/public/destinations
GET  http://localhost:8000/api/public/destinations/{destination_id}
POST http://localhost:8000/api/qa/ask
```

## Cara menjalankan

Pastikan backend FastAPI sudah hidup di port 8000.

```powershell
cd "C:\Users\ASUS\OneDrive\Documents\Skripsi\borneo-trip-frontend-neo4j-connected"

Copy-Item .env.example .env -Force

npm install
npm run dev
```

Buka:

```txt
http://localhost:5173
```

## Catatan penting

Jika backend/Neo4j belum berhasil login, halaman Beranda masih akan menampilkan data cadangan dari frontend, tetapi halaman AI dan data detail dari Neo4j belum bisa berjalan normal.

File `package.json` sudah memakai versi Vite stabil agar tidak terkena error `rolldown native binding` di Windows.
