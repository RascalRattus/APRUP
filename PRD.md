# Product Requirement Document (PRD)
# APRUP — AI Document Monitor & Human-in-the-Loop Approval System

---

## 📄 Document Metadata
* **Product Name:** APRUP (AI Document Monitor & Approval Dashboard)
* **Version:** 2.0.0 (Production-Ready)
* **Status:** Approved / Production Ready
* **Core Philosophy:** Simplicity in UI, Power in Automation
* **Production Webhook Base:** `https://n8n.almaudin.my.id/webhook`
* **Target Audience:** Document Reviewers, Compliance Officers, System Administrators, Executive Approvers
* **Tech Stack:** Single-File HTML Engine (HTML5, Tailwind CSS, Vanilla JS ES6+), KEPO-IH Glassmorphism Style System, n8n Automation Engine, Google Gemini AI 1.5 Flash, Google Sheets Database API, Google Drive Ingestion.

---

## 1. Executive Summary & Core Philosophy

**APRUP** adalah platform pemantauan dan verifikasi dokumen berbasis AI dengan pendekatan **Human-in-the-Loop (HITL)**. Sistem ini mengintegrasikan otomasi n8n (hosted at `n8n.almaudin.my.id`), analisis multimodal Google Gemini 1.5 Flash, dan database terpusat Google Sheets. 

Platform ini menghadirkan dasbor interaktif dalam **satu berkas HTML utuh (`index.html`)** yang sangat ringan, responsif seluler (*mobile-friendly*), aman, dan memiliki gaya visual modern dengan tema **KEPO-IH (Glassmorphism, Light/Dark mode)**.

---

## 2. System Architecture & Flow

```
┌────────────────────────────────┐
│   Ingestion Layer (GDrive)     │  Upload PDF/DOCX ke folder Google Drive spesifik.
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│   Analysis Layer (n8n & Gemini)│  n8n mendeteksi berkas, melakukan deduplication check
└───────────────┬────────────────┘  (anti-double check), & mengekstrak 4 poin krusial via Gemini.
                │
                ▼
┌────────────────────────────────┐
│   Data Layer (Google Sheets)   │  Hasil analisis, status, & metadata disimpan dengan
└───────────────┬────────────────┘  Task_ID unik (misal: TASK-2026-0801).
                │
                ▼
┌────────────────────────────────┐
│   Presentation Layer (Web UI)  │  Dashboard Single-File HTML (GitHub Pages / Static)
└───────────────┬────────────────┘  berkomunikasi dengan n8n melalui API Webhooks (GET/POST).
                │
                ▼
┌────────────────────────────────┐
│   Security Layer (RBAC & .env) │  Autentikasi di sisi server n8n membandingkan input
└────────────────────────────────┘  pengguna terhadap variabel .env server (Admin/User).
```

1. **Ingestion Layer:** Pengunggahan berkas (PDF / DOCX) ke folder terdeteksi di Google Drive.
2. **Analysis Layer:** Workflow n8n membaca berkas, menjalankan *anti-double check* (deduplikasi ID/Hash), lalu mengekstrak 4 kriteria krusial menggunakan Google Gemini 1.5 Flash.
3. **Data Layer:** Hasil ekstraksi dan riwayat persetujuan disimpan di Google Sheets dengan `Task_ID` unik (contoh: `TASK-2026-0801`).
4. **Presentation Layer:** Antarmuka web statis ringan (`index.html`) yang melakukan sinkronisasi dua arah via REST API Webhooks.
5. **Security Layer:** Autentikasi aman tanpa hardcode kredensial di frontend. Verifikasi login dan peran (Admin vs User) diproses di server n8n menggunakan variabel lingkungan `.env`.

---

## 3. Detailed Features & Functional Requirements

### A. Document Analysis & AI Extraction Standards
AI (Google Gemini 1.5 Flash) memproses berkas dan mengekstrak 4 bidang kualifikasi berikut:

1. **Spesifikasi Check:** Menilai ketersediaan kriteria Mutu, Teknis, Waktu, dan Layanan.
2. **Kelengkapan TOR (Terms of Reference):** Validasi standar kelengkapan dokumen sesuai pedoman internal.
3. **Catatan Tambahan (AI Notes):** Ringkasan temuan penting, risiko, atau kejanggalan dokumen.
4. **Cek Pengajuan Ulang (Is_Reapplication & Refer_Task_ID):** Deteksi otomatis apakah dokumen adalah pengajuan baru atau revisi dari pengajuan terdahulu berdasarkan referensi `Task_ID` sebelumnya.

### B. Referensi Dokumen Lama (Business Rule)
Kebijakan referensi dokumen lama harus konsisten dan tidak membingungkan admin:

1. Saat admin membuka aksi `Approve`, `Revisi`, atau `Tolak`, field `Refer Task ID / Dokumen Acuan (Opsional)` akan menampilkan saran dokumen referensi.
2. Hanya dokumen yang statusnya `Needs Revision` atau `Rejected` yang memenuhi syarat muncul sebagai kandidat referensi.
3. Dari kandidat tersebut, hanya dokumen yang `Refer_Task_ID` masih kosong yang dianggap valid sebagai dokumen lama yang perlu dibaca konteksnya.
4. Dokumen yang sudah memiliki `Refer_Task_ID` tidak ditampilkan karena itu berarti referensi sudah terhubung sebelumnya.
5. Dokumen `Archived` tidak dipakai sebagai daftar referensi karena itu bukan dokumen review aktif yang sedang dibuka.
6. Tujuan dari aturan ini adalah memastikan admin dapat melihat riwayat dokumen sebelum keputusan final, tanpa terlalu banyak noise dari data lama atau data yang sudah terekam dengan referensi sebelumnya.

Contoh:

```text
Dokumen aktif: TASK-2026-0810 (status Pending)
Candidate referensi yang muncul:
- TASK-2026-0807 | Status = Needs Revision | Refer_Task_ID = ""
- TASK-2026-0805 | Status = Rejected | Refer_Task_ID = ""

Tidak muncul:
- TASK-2026-0799 | Status = Rejected | Refer_Task_ID = "TASK-2026-0701" (sudah punya referensi)
- TASK-2026-0782 | Status = Archived (bukan dokumen review aktif)
```

### C. Single-File HTML Engine & Security (Frontend)
1. **Single File Architecture:** Seluruh antarmuka, struktur HTML, gaya Tailwind CSS & KEPO-IH design, serta logika interaktif JavaScript dikemas dan diakses secara terpadu di `index.html`.
2. **Server-Validated Login Security:**
   - Form Login terintegrasi di frontend.
   - Kredensial (Username & Password) dikirim via `POST /login` ke n8n webhook.
   - n8n mencocokkan input dengan `.env` server (contoh: `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `USER_PASSWORD`).
   - Browser menyimpan Token Sesi sementara di `sessionStorage` tanpa pernah menyimpan kredensial mentah.
3. **Role-Based Access Control (RBAC):**
   - **Admin Role:** Akses penuh untuk **Approve**, **Revisi** (dengan catatan instruksi), **Tolak**, dan mengaitkan referensi `Task_ID`.
   - **User Role (Read-Only):** Hanya dapat memantau status dokumen, membaca poin analisis AI, dan memfilter data tanpa tombol aksi persetujuan.

### D. UI/UX Design System & Interactivity (KEPO-IH Standards)
1. **Glassmorphism Aesthetic:** Latar belakang *ambient drifting orbs*, *grid noise texture*, dan batas emas/indigo transparan.
2. **Day / Night Mode Toggle (Siang vs Malam):** Dukungan sakelar tema ☀️ **Siang (Light)** & 🌙 **Malam (Dark)** dengan simpanan preferensi otomatis di `localStorage`.
3. **Mobile-First Responsiveness:** Tampilan ramah ponsel dengan target area sentuh minimum 42px.
4. **Flicker-Free Silent Auto-Sync:** Sinkronisasi background 15 detik berjalan secara halus tanpa animasi shimmer skeleton yang mengganggu penglihatan.

---

## 4. Database Schema (Google Sheets - Sheet: `Documents`)

| Nama Kolom | Tipe Data | Mandatory | Deskripsi & Contoh Nilai |
| :--- | :--- | :--- | :--- |
| **`Task_ID`** | String | Ya | ID Unik Tugas (contoh: `TASK-2026-0801`) |
| **`File_ID`** | String | Ya | Google Drive File ID (`1a2b3c4d...`) |
| **`File_Name`** | String | Ya | Nama asli berkas (`Modul_Kemenkeu.pdf`) |
| **`File_Type`** | String | Ya | Format berkas (`pdf` / `docx` / `image`) |
| **`Spesifikasi_Check`** | Text | Ya | Ketersediaan Mutu, Teknis, Waktu, & Layanan |
| **`TOR_Completeness`** | Text | Ya | Status & Kelengkapan TOR |
| **`AI_Notes`** | Text | Ya | Ringkasan temuan analisis AI Gemini |
| **`Is_Reapplication`** | Boolean | Ya | `TRUE` jika revisi / `FALSE` jika baru |
| **`Refer_Task_ID`** | String | Opsional | `Task_ID` acuan jika pengajuan ulang. Nilai kosong `""` menandakan tidak ada referensi lama yang sudah terkait. |
| **`Admin_Notes`** | Text | Opsional | Catatan instruksi perbaikan dari Admin |
| **`Status`** | Enum | Ya | `Pending` \| `Approved` \| `Needs Revision` \| `Rejected` |
| **`File_Link`** | String | Ya | URL Web View file langsung di Google Drive |
| **`Timestamp`** | DateTime | Ya | Waktu pembuatan data (`2026-08-13 10:15:00`) |

> Catatan bisnis: saat admin melakukan `Approve`, `Revisi`, atau `Tolak`, sistem hanya menampilkan dokumen referensi lama dari status `Needs Revision` atau `Rejected` yang masih kosong `Refer_Task_ID`. Ini mencegah referensi tertukar dengan dokumen archived maupun dokumen yang sudah punya hubungan referensi sebelumnya.

---

## 5. Webhook API Contracts (n8n Server at `n8n.almaudin.my.id`)

### A. POST `/webhook/auth/login` (Authentication)
* **Request Payload:**
```json
{
  "username": "admin",
  "password": "secretpassword"
}
```
* **Response `200 OK` (Success):**
```json
{
  "success": true,
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsIn...",
  "user": {
    "username": "admin",
    "name": "Administrator"
  }
}
```

### B. GET `/webhook/get-pending-docs` (Fetch Pending Tasks)
* **Headers:** `Authorization: Bearer <token>`
* **Response `200 OK`:**
```json
[
  {
    "Task_ID": "TASK-2026-0801",
    "File_ID": "gdrive-file-001",
    "File_Name": "Modul_Kemenkeu.pdf",
    "File_Type": "pdf",
    "Spesifikasi_Check": "Mutu: Lengkap | Teknis: Sesuai | Waktu: 30 Hari | Layanan: SLA 99%",
    "TOR_Completeness": "Lengkap (10/10 Bab Terpenuhi)",
    "AI_Notes": "Integrasi regulasi internal dengan Core Values ASN BerAKHLAK berjalan baik.",
    "Is_Reapplication": false,
    "Refer_Task_ID": "",
    "Admin_Notes": "",
    "Status": "Pending",
    "File_Link": "https://drive.google.com/file/d/demo1/view",
    "Timestamp": "2026-08-13 10:15:30"
  }
]
```

### C. POST `/webhook/update-doc-status` (Update Status & Action)
* **Headers:** `Authorization: Bearer <token>`
* **Request Payload (Approve):**
```json
{
  "task_id": "TASK-2026-0801",
  "action": "approve",
  "admin_notes": "Dokumen telah diverifikasi dan disetujui.",
  "refer_task_id": "-"
}
```
* **Request Payload (Revision):**
```json
{
  "task_id": "TASK-2026-0801",
  "action": "revise",
  "admin_notes": "Tabel kriteria biaya pada bab 3 perlu diperjelas rinciannya.",
  "refer_task_id": "TASK-2026-0805"
}
```
* **Request Payload (Reject):**
```json
{
  "task_id": "TASK-2026-0801",
  "action": "reject",
  "admin_notes": "Format TOR tidak sesuai spesifikasi dasar.",
  "refer_task_id": "-"
}
```

> Aturan khusus referensi: `refer_task_id` bersifat opsional. Ketika admin memilih dokumen lama sebagai konteks, maka nilai yang dikirim adalah `Task_ID` dokumen lama. Jika tidak ada referensi, sistem mengirim `"-"` untuk menandakan kosong. Data referensi yang dipilih berasal dari dokumen lama dengan status `Needs Revision` atau `Rejected` dan `Refer_Task_ID` masih kosong.

---

## 6. UI Wireframe & Layout Specifications

```
+--------------------------------------------------------------------------+
| 📊 APRUP — AI Document Monitor                  [ Role: Admin (Logout) ] |
+--------------------------------------------------------------------------+
| Filter Status: [ All Status ▼ ]  Filter Tipe: [ Semua ▼ ]  [ ☀️/🌙 Theme ]|
+--------------------------------------------------------------------------+
| 📁 TASK-2026-0801 | Modul_Kemenkeu.pdf              [ PENDING REVIEW ]  |
| ------------------------------------------------------------------------ |
| • Spesifikasi Check : Mutu: Sesuai | Teknis: Lengkap | Waktu: 30 Hari    |
| • Kelengkapan TOR   : Lengkap (10/10 Bab Terpenuhi)                      |
| • Catatan AI        : Integrasi regulasi internal berjalan baik.          |
| • Pengajuan Ulang  : Tidak (Pengajuan Baru)                              |
|                                                                          |
| [ ✔️ Approve ]    [ ✏️ Revisi ]    [ ❌ Tolak ]    [ 🔗 Buka File ]       |
+--------------------------------------------------------------------------+
```

---

## 7. Development Roadmap & Deployment Steps

1. **Backend & n8n Server Setup (`n8n.almaudin.my.id`):**
   - Impor workflow `workflow_gemini_analyser.json` & `workflow_dashboard_api.json`.
   - Pasang variabel `.env` di server n8n untuk kredensial Admin & User.
2. **Database Preparation:**
   - Siapkan Google Sheets dengan 13 header kolom wajib sesuai skema v2.0.0.
3. **Frontend Integration (`index.html`):**
   - Pastikan dukungan Single-File HTML menyatukan login modal, RBAC UI control, data card rendering, dan switch mode Siang/Malam secara utuh.
4. **Deployment:**
   - Deploy `index.html` langsung ke GitHub Pages atau static hosting HTTPS.
