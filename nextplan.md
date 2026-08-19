# APRUP — Next Plan

## Selesai

- Menghapus filter PDF, DOCX, dan Gambar dari dashboard.
- Menghapus ketergantungan UI pada `File_Type`.
- Menjadikan auto-sync 15 detik nonaktif secara default.
- Mempertahankan sinkronisasi manual.
- Memperbarui PRD, README, dan dokumentasi n8n.

## Langkah Berikutnya

1. Hapus kolom `File_Type` dari Google Sheets production setelah memastikan workflow n8n tidak lagi membutuhkannya.
2. Uji endpoint `GET /get-pending-docs` dengan payload tanpa `File_Type`.
3. Jalankan simulasi UI dan periksa perilaku checkbox auto-sync pada desktop dan mobile.
4. Aktifkan auto-sync hanya pada deployment yang memang membutuhkan polling berkala.
