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
| **`File_Name`** | Text | Nama asli berkas dokumen | `Modul_Kemenkeu.pdf` |
| **`File_Type`** | Text | Format berkas (`pdf`, `docx`, `image`) | `pdf` |
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
