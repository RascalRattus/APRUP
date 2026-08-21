# APRUP — Next Plan

## Selesai

- Menghapus filter PDF, DOCX, dan Gambar dari dashboard.
- Menghapus ketergantungan UI pada `File_Type`.
- Menjadikan auto-sync 15 detik nonaktif secara default.
- Mempertahankan sinkronisasi manual.
- Memperbarui PRD, README, dan dokumentasi n8n.
- Menambahkan grouped stats ribbon untuk antrean, keputusan, dan arsip.
- Menggabungkan tampilan menjadi satu ribbon dan menempatkan upload pada grup `Dokumen Baru`.
- Menambahkan upload KAK/TOR maksimal 5 MB.
- Menambahkan komparasi catatan revisi berbasis AI secara kondisional.

## Langkah Berikutnya

1. Uji endpoint `POST /upload-dokumen` menggunakan file valid dan file di atas 5 MB.
2. Uji endpoint `POST /update-doc-status` dengan `action=compare-revision` pada dua Task ID nyata.
3. Jalankan simulasi UI dan periksa grouped stats pada desktop dan mobile.
4. Aktifkan auto-sync hanya pada deployment yang memang membutuhkan polling berkala.
5. Pastikan credential Admin/User disimpan sebagai secret environment n8n, bukan di frontend atau repository.
6. Uji endpoint `/auth/login` n8n dengan credential Admin dan User; login credential harus masuk Live, sedangkan `Masuk Demo (tanpa n8n)` tidak boleh melakukan request webhook.
