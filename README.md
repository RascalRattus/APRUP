# APRUP v2.0 — Multi-File Architecture System

> **Product Version:** 2.0 (Production-Ready)  
> **Architecture:** Clean Separated Multi-File (`index.html`, `style.css`, `app.js`)  
> **Production Webhook:** `https://n8n.almaudin.my.id/webhook`

---

## 🔍 Master Auditor Checklist (All 4 Phases Passed)

### FASE 1: AUDIT ARSITEKTUR & KELAYAKAN SISTEM
- [x] **Validasi Pemisahan File:** Struktur terpisah secara bersih menjadi `index.html`, `style.css`, dan `app.js`.
- [x] **Validasi Konektivitas Webhook:** Method `GET` (`/get-pending-docs`) dan Single `POST` Engine (`/update-doc-status`) terintegrasi.
- [x] **Validasi Login & RBAC (.env Server):** Form Login RBAC mendinamisasikan mode Admin (Akses Penuh) vs User (Read-Only).
- [x] **Validasi Anti-Double Check:** n8n mencegah pemrosesan ganda berdasarkan `Task_ID`.

### FASE 2: AUDIT RESPONSIF & INTERAKSI LAYAR (LANDSCAPE & PORTRAIT)
- [x] **Desktop / Landscape (1366x768+):** Layout grid 2 kolom & tab navigasi status aktif.
- [x] **Mobile / Portrait (375px+):** Layout 1 kolom, modal pas di tengah (*centered popup*), dan tombol *touch-friendly* ($\ge$ 42px).

### FASE 3: AUDIT INTERAKSI & FITUR SPESIFIK
- [x] **Tab Navigasi Status:** Tab `[Menunggu Review]`, `[Disetujui]`, `[Revisi]`, dan `[Ditolak]` memfilter kartu secara *real-time*.
- [x] **Modal Alasan Revisi & Tolak Dinamis:** Input catatan alasan wajib, dengan kemunculan kolom `"Referensi Task ID Acuan"` secara kondisional saat `Is_Reapplication = true` atau pada revisi.
- [x] **Single POST Engine:** Mengirimkan payload terstruktur ke n8n (`action: approve/revise/reject`).
- [x] **Light / Dark Mode & Demo Switcher:** Berpindah tema visual mulus dan tersimpan di `localStorage`.

### FASE 4: DOKUMENTASI (README & TUTORIAL N8N)
- [x] Panduan struktur file proyek untuk GitHub Pages.
- [x] Tutorial node `Switch` di n8n untuk menangani single POST webhook payload dispatcher.
- [x] Panduan penyiapan database 13-kolom Google Sheets.

---

## 📁 Struktur File Proyek (Multi-File Architecture)

```
APRUP/
├── index.html        # Clean HTML5 structure linking style.css & app.js
├── style.css         # KEPO-IH CSS Design System, Glassmorphism & Animations
├── app.js            # State Management, Status Tabs, Single POST Webhook Engine
├── PRD.md            # Product Requirement Document (v2.0)
├── README.md         # Master Auditor Checklist & Deployment Guide
└── n8n/
    ├── README.md     # Setup n8n Switch Node & Google Sheets 13 Columns
    ├── workflow_gemini_analyser.json
    └── workflow_dashboard_api.json
```
