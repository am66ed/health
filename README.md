# 🏥 Balady Health Certificate System

نظام الشهادات الصحية البلدية — مبني بـ Node.js + Express + MongoDB + React (Vite)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) + Atlas |
| Frontend | React (Vite) |
| Photo Storage | Cloudinary |
| QR Code | qrcode npm |
| File Upload | multer (memory) |
| HTTP Client | axios |

## Project Structure

```
project/
├── backend/
│   ├── server.js
│   ├── .env              ← (not committed - add your own)
│   ├── models/Person.js
│   └── routes/personRoutes.js
└── frontend/
    └── src/
        ├── App.jsx
        ├── pages/
        │   ├── AdminPage.jsx
        │   └── CertificatePage.jsx
        └── components/
            ├── BalaydLayout.jsx
            └── FloatLabelInput.jsx
```

## Setup

### 1. Clone
```bash
git clone https://github.com/am66ed/health.git
cd health
```

### 2. Backend
```bash
cd backend
npm install
```
Create `backend/.env`:
```
MONGO_URI=your_mongodb_uri
PORT=5000
BASE_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
```bash
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**

## Features
- ✅ Arabic RTL — Balady government design
- ✅ Add health certificate with photo upload to Cloudinary
- ✅ QR Code generation (black, standard) + download as PNG
- ✅ Certificate page accessible via QR scan
- ✅ No authentication required
