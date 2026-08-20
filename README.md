# Flow Urus NIB & Legalitas ISP (KBLI 61104)

Aplikasi peta alur interaktif untuk tahapan pengurusan NIB, legalitas lahan, PKKPR/KKPR, dan izin operasional ISP (KBLI 61104).

---

## 🚀 Panduan Online / Hosting ke GitHub Pages

Aplikasi ini sudah dikonfigurasi dengan **GitHub Actions** otomatis (`.github/workflows/deploy.yml`) dan aset relatif (`base: './'`).

### Langkah 1: Push Project ke GitHub Repository
Jika Anda mengunduh (export) project ini atau menghubungkannya ke Git:

```bash
git init
git add .
git commit -m "Initial commit - Flow Urus NIB"
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git
git push -u origin main
```

### Langkah 2: Aktifkan GitHub Pages di Repository
1. Buka repository Anda di **GitHub**.
2. Masuk ke tab **Settings** > menu **Pages** (di sidebar kiri).
3. Di bagian **Build and deployment** > **Source**, pilih opsi:
   👉 **GitHub Actions**
4. Setelah push ke branch `main`, GitHub Actions akan otomatis menjalankan build dan aplikasi langsung aktif online!

Alamat web publik Anda:
`https://<username>.github.io/<nama-repo>/`

---

## 💻 Menjalankan di Komputer Lokal

```bash
# Install dependencies
npm install

# Jalankan server development
npm run dev

# Build untuk production
npm run build
```
