# Ambisi Sang Murid — Pixel School Story

Game cerita bercabang (branching visual novel) bergaya pixel tentang seorang remaja SMP
yang berambisi menjadi murid berprestasi. Pemain memilih cabang pencapaian
(**Agama, Akademik, Olahraga — Renang/Lari/Sepak Bola/Basket, E-Sport, Coding**)
dan setiap pilihan harian membentuk jalan cerita serta ending yang berbeda-beda
(semi open world).

Dibangun dengan **Phaser 3** (JavaScript murni, tanpa build tool) supaya mudah
dibuka langsung di VS Code dan langsung bisa dideploy ke GitHub Pages.

---

## 🗂️ Struktur Folder

```
pixel-school-story/
├── index.html              # entry point, load Phaser dari CDN
├── style.css
├── src/
│   ├── main.js              # konfigurasi Phaser + daftar scene
│   ├── engine/
│   │   ├── StatManager.js    # menyimpan progres stat pemain
│   │   ├── DialogueBox.js    # UI kotak dialog & pilihan
│   │   └── PixelActor.js     # karakter pixel digambar prosedural
│   ├── scenes/
│   │   ├── BootScene.js
│   │   ├── MenuScene.js      # halaman judul
│   │   ├── CharacterScene.js # buat nama & pilih cita-cita awal
│   │   ├── HubScene.js       # loop utama: pilih aktivitas tiap hari
│   │   └── EndingScene.js    # evaluasi ending sesuai stat dominan
│   └── data/
│       ├── events.js         # event dialog harian per cabang
│       └── endings.js        # teks ending per cabang x tier
└── assets/                  # taruh sprite/gambar pixel art asli di sini nanti
```

---

## ▶️ Menjalankan di VS Code

Karena `src/main.js` pakai ES Modules (`import`/`export`), file **harus dibuka lewat server**,
bukan dibuka langsung sebagai `file://`.

1. Buka folder ini di VS Code.
2. Install extension **"Live Server"** (by Ritwick Dey) dari Extensions Marketplace.
3. Klik kanan pada `index.html` → **"Open with Live Server"**.
4. Browser otomatis terbuka di `http://127.0.0.1:5500/` dan game langsung bisa dimainkan.

Alternatif tanpa extension (pakai Node.js):
```bash
npx serve .
```
lalu buka URL yang muncul di terminal.

---

## ⬆️ Upload ke GitHub

```bash
cd pixel-school-story
git init
git add .
git commit -m "Initial commit: Ambisi Sang Murid - Pixel School Story"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Ganti `USERNAME` dan `NAMA-REPO` sesuai akun & repo GitHub-mu.

### 🌐 Deploy gratis ke GitHub Pages (biar bisa dimainkan online)

1. Buka repo di GitHub → **Settings → Pages**.
2. Di bagian **Source**, pilih branch `main` dan folder `/ (root)`.
3. Simpan. Setelah beberapa menit, game bisa diakses di:
   `https://USERNAME.github.io/NAMA-REPO/`

---

## 🎮 Cara Kerja Gameplay

1. **MenuScene** → tekan "Mulai Cerita Baru".
2. **CharacterScene** → beri nama karakter, lalu pilih **cita-cita utama** (memberi bonus awal
   ke stat cabang itu, tapi tidak menjamin ending — tetap harus diperjuangkan).
3. **HubScene** → tiap hari (ada 12 hari per "semester"), pemain memilih **satu aktivitas**:
   Ibadah, Belajar, Renang, Lari, Sepak Bola, Basket, E-Sport, atau Coding.
   Setiap aktivitas memunculkan dialog singkat dengan **pilihan (choice)** yang menambah
   stat cabang terkait (dan kadang berefek silang ke cabang lain).
4. Setelah 12 hari, **EndingScene** menghitung **cabang dengan stat tertinggi** (dominant category)
   dan tingkat pencapaiannya:
   - `>= 80` → ending **tinggi** (paling sukses)
   - `>= 50` → ending **sedang**
   - `< 50`  → ending **rendah**
   
   Lalu menampilkan ending yang sesuai dari `src/data/endings.js`.

Karena hasil akhir tergantung akumulasi pilihan pemain sepanjang permainan (bukan
pilihan tunggal di awal), game ini bersifat **semi open world**: banyak jalan,
banyak kemungkinan ending.

---

## ✏️ Cara Menambah Konten Cerita

### Menambah event harian baru
Edit `src/data/events.js`, tambahkan objek baru ke array kategori yang kamu mau, contoh:

```js
agama: [
  // ...event yang sudah ada
  {
    speaker: 'Nama NPC',
    text: 'Isi dialog di sini.',
    choices: [
      { label: 'Pilihan A', effects: { agama: 8 } },
      { label: 'Pilihan B', effects: { agama: 2, akademik: 3 } },
    ],
  },
],
```

### Menambah / mengubah ending
Edit `src/data/endings.js`. Setiap cabang punya 3 varian: `tinggi`, `sedang`, `rendah`.
Kamu bisa memecahnya jadi lebih banyak tier dengan menyesuaikan `getTier()` di
`src/engine/StatManager.js`.

### Mengganti karakter/pixel art placeholder dengan sprite asli
Saat ini karakter digambar otomatis lewat kode (`src/engine/PixelActor.js`) supaya
project langsung jalan tanpa aset gambar. Untuk pakai sprite pixel art asli:

1. Cari aset gratis di [itch.io (free pixel art assets)](https://itch.io/game-assets/free/tag-pixel-art)
   atau buat sendiri di [Piskel](https://www.piskelapp.com/) / Aseprite.
2. Taruh file PNG di folder `assets/sprites/`.
3. Di scene terkait (misalnya `MenuScene.js`), load dengan:
   ```js
   this.load.image('player', 'assets/sprites/player.png');
   // lalu
   this.add.image(x, y, 'player');
   ```
4. Hapus/ganti pemanggilan `drawPixelActor(...)` dengan `this.add.image(...)`.

### Menambah scene cerita khusus (mis. adegan turnamen final)
Kamu bisa membuat scene baru di `src/scenes/`, daftarkan di `src/main.js` pada
array `scene: [...]`, lalu panggil `this.scene.start('NamaSceneBaru')` dari
`HubScene` (misalnya saat stat sebuah cabang menyentuh 100 di tengah permainan,
untuk memicu "climax" cerita sebelum ending akhir).

---

## 💡 Ide Pengembangan Selanjutnya

- Tambah sistem energi/waktu supaya pemain tak bisa spam satu aktivitas tiap hari.
- Tambah map sekolah yang bisa dijelajahi (Phaser Tilemap + Tiled) untuk kesan lebih "open world".
- Tambah musik & sound effect (`this.load.audio(...)`).
- Tambah save/load progres pakai `localStorage`.
- Tambah lebih banyak variasi ending (misalnya ending gabungan 2 cabang tertinggi).

Selamat membangun ceritanya! 🎮✨
