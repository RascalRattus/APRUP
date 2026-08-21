# Panduan Integrasi Automasi n8n & Single POST Engine — APRUP v2.0

Dokumen ini berisi panduan teknis konfigurasi n8n, node **Switch**, basis data Google Sheets, dan terowongan HTTPS Webhook untuk arsitektur file terpisah APRUP v2.0 (`index.html`, `style.css`, `app.js`).

---

## 1. Skema Database Google Sheets (`Documents` Sheet)

Buat satu lembar spreadsheet baru di Google Sheets dengan nama **`Documents`**.
Header baris pertama wajib memuat 13 kolom berikut:

| Nama Kolom | Tipe Data | Deskripsi | Contoh Nilai |
| :--- | :--- | :--- | :--- |
| **`Task_ID`** | Text | ID Unik Tugas dari n8n | `TASK-2026-0801` |
| **`File_ID`** | Text | ID Unik file dari Google Drive | `1a2b3c4d5e...` |
| **`File_Name`** | Text | Nama asli berkas dokumen | `Modul_Kemenkeu` |
| **`Spesifikasi_Check`** | Text | Penilaian ketersediaan Mutu, Teknis, Waktu, & Layanan | `Mutu: Lengkap \| Teknis: Sesuai` |
| **`TOR_Completeness`** | Text | Status kelengkapan TOR | `Lengkap (10/10 Bab Terpenuhi)` |
| **`AI_Notes`** | Text | Ringkasan temuan analisis AI Gemini | `Integrasi regulasi internal berjalan baik.` |
| **`Is_Reapplication`** | Boolean | Status pengajuan ulang (`TRUE` / `FALSE`) | `FALSE` |
| **`Refer_Task_ID`** | Text | `Task_ID` acuan jika dokumen revisi | `TASK-2026-0789` |
| **`Admin_Notes`** | Text | Catatan instruksi perbaikan dari Admin | `Perjelas tabel biaya di bab 3.` |
| **`Status`** | Text | Status review: `Pending`, `Approved`, `Needs Revision`, `Rejected` | `Pending` |
| **`File_Link`** | Text | Tautan web view file langsung di Google Drive | `https://drive.google.com/file/d/xxx/view` |
| **`Timestamp`** | Text | Waktu pembuatan data | `2026-08-13 10:15:30` |

---

## 2. Tutorial Konfigurasi Node Switch di n8n (Single POST Webhook Engine)

Frontend APRUP v2.0 menggunakan **1 Single POST Webhook Endpoint** (`/update-doc-status`) untuk memproses seluruh aksi persetujuan. Di dalam n8n, buatlah node **Switch** setelah node **Webhook POST** untuk mengarahkan alur pemrosesan berdasarkan properti `body.action`:

```
                       ┌──> Output 1 (action == 'approve') ──> Google Sheets Update Status = Approved
                       │
[Webhook POST Node] ──>│──> Output 2 (action == 'revise')  ──> Google Sheets Update Status = Needs Revision & Trigger Re-analysis
(/update-doc-status)   │
                       └──> Output 3 (action == 'reject')  ──> Google Sheets Update Status = Rejected
```

### Konfigurasi Node Switch:
1. Tambahkan node **Switch** di n8n.
2. Mode: **Rules**.
3. **Rule 1 (Approve):**
   - Value 1: `={{ $json.body.action }}`
   - Operation: `Equal`
   - Value 2: `approve`
4. **Rule 2 (Revise):**
   - Value 1: `={{ $json.body.action }}`
   - Operation: `Equal`
   - Value 2: `revise`
5. **Rule 3 (Reject):**
   - Value 1: `={{ $json.body.action }}`
   - Operation: `Equal`
   - Value 2: `reject`

---

## 3. Payload Webhook REST API Spec

### GET Endpoint: `/get-pending-docs`
Memuat seluruh dokumen yang berstatus `Pending` dari Google Sheets.

Dashboard tidak memfilter berdasarkan format berkas. Kolom `File_Type` tidak diperlukan oleh frontend dan boleh dihapus dari sheet maupun payload API.

Auto-sync frontend nonaktif secara default. Sinkronisasi berjalan ketika pengguna menekan tombol manual atau mengaktifkan checkbox auto-sync.

### POST Endpoint: `/auth/login`

Live Mode membutuhkan endpoint login yang memvalidasi username/password terhadap secret environment n8n. Response minimal harus memiliki `success`, `role`, dan opsional `token` serta `user.name`. Jangan mengirim atau menyimpan password di frontend.

Konfigurasi minimal di n8n:

1. Buat node **Webhook** dengan method `POST` dan path `auth/login` pada workflow yang sama atau workflow terpisah.
2. Baca payload `{{$json.body.username}}` dan `{{$json.body.password}}`.
3. Set environment variable server n8n berikut, tanpa memasukkan nilainya ke workflow atau Git:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<secret-admin>
USER_USERNAME=user
USER_PASSWORD=<secret-user>
APRUP_AUTH_TOKEN=<long-random-token>
```

4. Gunakan alur node: `Webhook - Login` → `Code - Validasi Login Environment` → `Respond - Login JSON`.
5. Node Code membandingkan username/password terhadap `$env.ADMIN_USERNAME`, `$env.ADMIN_PASSWORD`, `$env.USER_USERNAME`, dan `$env.USER_PASSWORD`. Jangan menaruh password plaintext pada node Code, frontend, atau repository.
6. Jika valid, kembalikan `200 JSON` seperti berikut:

```json
{
  "success": true,
  "role": "admin",
  "token": "<signed-session-token>",
  "user": { "name": "Administrator" }
}
```

7. Jika tidak valid, kembalikan HTTP `401` dengan `{ "success": false }`.
8. Aktifkan CORS untuk origin frontend dan izinkan header `Content-Type, Authorization`.

Setelah mengubah environment variable, restart/reload workflow n8n agar `$env` terbaca oleh execution baru.

> Penting: perubahan pada file `N8N_FINAL_NODE.json` di repository tidak otomatis mengubah workflow yang sudah aktif di server n8n. Import ulang workflow terbaru, aktifkan workflow, lalu gunakan Production URL webhook `/auth/login`.

### POST Endpoint: `/upload-dokumen`

Frontend mengirim `multipart/form-data` dengan field berikut:

- `data`: file KAK/TOR dengan ekstensi `.pdf`, `.doc`, atau `.docx`.
- `action`: nilai tetap `TOR`.

Validasi ukuran maksimal 5 MB dilakukan di frontend sebelum request dikirim.

### POST Action: `compare-revision`

Request dikirim ke endpoint `/update-doc-status`:

```json
{
  "action": "compare-revision",
  "task_id": "TASK-xxxx",
  "refer_task_id": "TASK-yyyy"
}
```

Response berisi `status_revisi`, `perbaikan_terverifikasi`, `kekurangan_tersisa`, dan `ringkasan_analisis` untuk ditampilkan pada modal hasil AI.

### POST Endpoint: `/update-doc-status`
Memproses perubahan status berdasarkan aksi Admin.

#### A. Action: `approve`
```json
{
  "task_id": "TASK-2026-0801",
  "action": "approve",
  "admin_notes": "Dokumen disetujui."
}
```

#### B. Action: `revise`
```json
{
  "task_id": "TASK-2026-0801",
  "action": "revise",
  "admin_notes": "Tabel kriteria biaya pada bab 3 perlu diperjelas rinciannya.",
  "refer_task_id": "TASK-2026-0801"
}
```

#### C. Action: `reject`
```json
{
  "task_id": "TASK-2026-0801",
  "action": "reject",
  "admin_notes": "Format TOR tidak sesuai spesifikasi dasar."
}
```

---

## 4. Variabel Lingkungan (.env Server n8n)

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
USER_USERNAME=user
USER_PASSWORD=user
GEMINI_API_KEY=AIzaSy...
```
