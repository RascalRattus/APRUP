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
- [x] **Modal Aksi Dinamis:** Pada saat `Approve`, `Revisi`, atau `Tolak`, kolom `Refer Task ID / Dokumen Acuan (Opsional)` akan muncul dan menampilkan daftar dokumen referensi yang relevan.
- [x] **Aturan Referensi Dokumen Lama yang Benar:** Referensi hanya diambil dari dokumen dengan status `Needs Revision` atau `Rejected`, dan `Refer_Task_ID` masih kosong. Dokumen archived tidak dijadikan sumber referensi karena bukan dokumen review aktif.
- [x] **Single POST Engine:** Mengirimkan payload terstruktur ke n8n (`action: approve/revise/reject`, `task_id`, `admin_notes`, `refer_task_id`).
- [x] **Light / Dark Mode & Demo Switcher:** Berpindah tema visual mulus dan tersimpan di `localStorage`.

### FASE 4: DOKUMENTASI (README & TUTORIAL N8N)
- [x] Panduan struktur file proyek untuk GitHub Pages.
- [x] Tutorial node `Switch` di n8n untuk menangani single POST webhook payload dispatcher.
- [x] Panduan penyiapan database 13-kolom Google Sheets.
- [x] Dokumentasi logika referensi lama agar admin tidak keliru memilih dokumen archived atau dokumen yang sudah memiliki `Refer_Task_ID`.

---

## 📁 Struktur File Proyek (Multi-File Architecture)

```
APRUP/
├── index.html                    # Antarmuka dashboard utama, modal aksi, filter, dan tab status
├── style.css                     # Sistem visual glassmorphism, tema, animasi, dan layout
├── app.js                        # State management, rendering kartu, logika tab, aksi approve/revise/reject
├── PRD.md                        # Product Requirement Document (spesifikasi bisnis dan aplikasi)
├── README.md                     # Panduan operasional, fitur utama, dan aturan referensi dokumen lama
├── click_simulation_raw.json     # Data simulasi interaksi klik untuk uji UI
├── test_simulation.js            # Script uji simulasi status tab dan action flow
├── n8n/
│   ├── README.md                 # Petunjuk integrasi n8n dan struktur Google Sheets
│   ├── workflow_dashboard_api.json
│   └── workflow_gemini_analyser.json
└── test_screenshots/            # Hasil tangkapan layar eksplorasi UI
```

## 🔗 Aturan Referensi Dokumen Lama (Versi Final)

Saat admin membuka modal `Approve`, `Revisi`, atau `Tolak`, field `Refer Task ID / Dokumen Acuan (Opsional)` harus mengikuti aturan berikut:

1. Hanya dokumen dengan status `Needs Revision` atau `Rejected` yang muncul di saran.
2. Diantara dokumen tersebut, hanya yang masih memiliki `Refer_Task_ID` kosong yang dipilih sebagai referensi.
3. Dokumen archived tidak dipakai sebagai daftar referensi.
4. Tujuan aturan ini adalah menjaga jejak historis pengajuan lama tanpa membingungkan admin dengan dokumen yang bukan konteks review aktif.

Contoh logika:

```text
Jika dokumen A sedang diproses:
- dokumen B status = Needs Revision, Refer_Task_ID = ""  -> muncul di daftar referensi
- dokumen C status = Rejected, Refer_Task_ID = "TASK-2026-0701" -> tidak muncul
- dokumen D status = Pending, Refer_Task_ID = "" -> tidak muncul
- dokumen E status = Archived -> tidak muncul
```

Artinya field referensi berfungsi sebagai konteks dokumen lama yang sedang ditinjau ulang, bukan sebagai kumpulan semua dokumen yang pernah masuk sistem.
