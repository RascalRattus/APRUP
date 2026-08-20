# APRUP — Walkthrough Perubahan

## Keputusan Produk

- Filter dan perlakuan khusus untuk PDF, DOCX, serta gambar dihapus karena tidak memberi nilai pada alur review.
- Dashboard tetap menampilkan nama berkas dan metadata analisis tanpa bergantung pada ekstensi atau tipe berkas.
- Auto-sync 15 detik menjadi pilihan pengguna dan default-nya nonaktif.
- Sinkronisasi manual tetap tersedia melalui tombol `Sinkronisasi Data`.

## Dampak Implementasi

- Tombol filter format dihapus dari `index.html`.
- State, event listener, dan fungsi filter format dihapus dari `app.js`.
- Kartu dokumen menggunakan ikon generik dan tidak menampilkan label tipe format.
- Data demo tidak lagi menyimpan `File_Type` atau ekstensi format.
- PRD, README, dan panduan n8n sudah mengikuti schema baru.
- Stats ribbon dikelompokkan menjadi antrean aktif, keputusan, dan arsip.
- Ribbon tab lama dihapus; upload KAK ditempatkan di grup `Dokumen Baru`.
- Upload KAK/TOR memakai validasi `.pdf/.doc/.docx` dan batas 5 MB sebelum request multipart.
- Komparasi catatan revisi AI hanya muncul ketika referensi dokumen tersedia.

## Cara Verifikasi

1. Buka dashboard dan pastikan tidak ada tombol PDF, DOCX, atau Gambar.
2. Pastikan checkbox Auto-sync tidak dicentang saat halaman pertama dibuka.
3. Tekan `Sinkronisasi Data` untuk menjalankan sinkronisasi manual.
4. Centang Auto-sync bila sinkronisasi berkala memang diperlukan.
