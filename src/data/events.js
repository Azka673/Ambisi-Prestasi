// events.js
// Kumpulan event harian per kategori. Setiap kategori punya beberapa event
// yang dipilih acak saat pemain memilih aktivitas tsb di HubScene.
// Tambahkan sebanyak yang kamu mau — strukturnya sengaja dibuat sederhana.
//
// effects: { key: delta } -> menambah/mengurangi stat kategori terkait (bisa lebih dari satu)

const events = {
  agama: [
    {
      speaker: 'Pak Ustadz Yusuf',
      text: 'Kamu terlihat sering datang lebih awal untuk sholat Dhuha. Ada yang ingin kamu ceritakan?',
      choices: [
        { label: 'Saya ingin lebih dekat dengan Allah sebelum ujian.', effects: { agama: 8 } },
        { label: 'Saya cuma menghindari keributan di kelas, Pak.', effects: { agama: 3 } },
      ],
    },
    {
      speaker: 'Teman sekelas',
      text: 'Eh, nanti pas kajian rohis kamu ikut nggak? Kita bahas tentang mengelola ambisi biar nggak lupa diri.',
      choices: [
        { label: 'Ikut, aku juga lagi butuh itu.', effects: { agama: 7 } },
        { label: 'Nanti aja, aku masih mau belajar.', effects: { agama: 1, akademik: 2 } },
      ],
    },
    {
      speaker: 'Diri sendiri',
      text: 'Malam ini kamu punya waktu luang sebelum tidur. Mau dipakai untuk apa?',
      choices: [
        { label: 'Mengaji dan muhasabah diri.', effects: { agama: 9 } },
        { label: 'Membaca buku pelajaran tambahan.', effects: { akademik: 5, agama: -1 } },
      ],
    },
  ],

  akademik: [
    {
      speaker: 'Bu Rahma (Wali Kelas)',
      text: 'Nilai project P5 kurikulum merdeka kamu bagus. Kamu mau ambil tantangan ekstra buat olimpiade sains?',
      choices: [
        { label: 'Siap, Bu! Saya mau coba.', effects: { akademik: 9 } },
        { label: 'Saya fokus ke pelajaran wajib dulu, Bu.', effects: { akademik: 4 } },
      ],
    },
    {
      speaker: 'Kelompok Belajar',
      text: 'Kita kebagian tugas kelompok Projek Penguatan Profil Pelajar Pancasila. Kamu mau jadi ketua kelompok?',
      choices: [
        { label: 'Aku yang pimpin, biar terarah.', effects: { akademik: 8 } },
        { label: 'Aku bantu-bantu aja, biar orang lain belajar mimpin.', effects: { akademik: 3 } },
      ],
    },
    {
      speaker: 'Diri sendiri',
      text: 'Ulangan Matematika minggu depan. Materinya lumayan berat.',
      choices: [
        { label: 'Belajar sampai larut, harus dapat nilai terbaik.', effects: { akademik: 10 } },
        { label: 'Belajar santai sambil istirahat cukup.', effects: { akademik: 5 } },
      ],
    },
  ],

  renang: [
    {
      speaker: 'Pelatih Renang',
      text: 'Gaya bebasmu makin cepat! Kejuaraan renang antar-sekolah bulan depan, kamu siap ikut seleksi?',
      choices: [
        { label: 'Siap, Pak! Saya latihan ekstra.', effects: { renang: 9 } },
        { label: 'Saya masih ragu, takut kalah.', effects: { renang: 3 } },
      ],
    },
    {
      speaker: 'Teman satu tim',
      text: 'Latihan pagi ini di kolam dingin banget, kamu tetap mau lanjut?',
      choices: [
        { label: 'Lanjut, dingin bukan alasan.', effects: { renang: 8 } },
        { label: 'Pemanasan dulu lebih lama biar aman.', effects: { renang: 5 } },
      ],
    },
  ],

  lari: [
    {
      speaker: 'Pelatih Atletik',
      text: 'Catatan waktu lari 100m kamu makin bagus. Mau coba latihan interval yang lebih berat?',
      choices: [
        { label: 'Mau, saya ingin jadi yang tercepat.', effects: { lari: 9 } },
        { label: 'Latihan normal dulu saja.', effects: { lari: 4 } },
      ],
    },
    {
      speaker: 'Diri sendiri',
      text: 'Kaki kamu agak pegal habis latihan kemarin.',
      choices: [
        { label: 'Tetap latihan, jangan kasih kendor.', effects: { lari: 7 } },
        { label: 'Istirahat dulu, dengarkan tubuh sendiri.', effects: { lari: 2 } },
      ],
    },
  ],

  sepakbola: [
    {
      speaker: 'Kapten Tim Bola',
      text: 'Turnamen antar sekolah sebentar lagi. Kita butuh striker yang gesit, kamu berani ambil posisi itu?',
      choices: [
        { label: 'Berani, saya yang jadi ujung tombak.', effects: { sepakbola: 9 } },
        { label: 'Saya main aman di posisi belakang dulu.', effects: { sepakbola: 4 } },
      ],
    },
    {
      speaker: 'Pelatih Bola',
      text: 'Latihan tendangan penalti hari ini, fokusmu kurang. Mau diulang?',
      choices: [
        { label: 'Ulangi terus sampai sempurna.', effects: { sepakbola: 8 } },
        { label: 'Cukup segini dulu, capek juga.', effects: { sepakbola: 3 } },
      ],
    },
  ],

  basket: [
    {
      speaker: 'Kapten Tim Basket',
      text: 'Three-point shoot kamu makin akurat. Mau jadi shooter andalan tim di final nanti?',
      choices: [
        { label: 'Tentu, saya siap jadi andalan.', effects: { basket: 9 } },
        { label: 'Saya bantu sebagai pemain rotasi saja.', effects: { basket: 4 } },
      ],
    },
    {
      speaker: 'Diri sendiri',
      text: 'Ada latihan tambahan sore ini, tapi kamu juga capek habis sekolah seharian.',
      choices: [
        { label: 'Tetap datang, demi mimpi jadi pemain terbaik.', effects: { basket: 8 } },
        { label: 'Istirahat dulu, latihan lain kali lebih maksimal.', effects: { basket: 3 } },
      ],
    },
  ],

  esport: [
    {
      speaker: 'Teman Tim Esport',
      text: 'Turnamen Mobile Legends antar sekolah buka pendaftaran. Tim kita butuh kamu jadi core player.',
      choices: [
        { label: 'Aku ikut, kita latihan strategi tiap malam.', effects: { esport: 9 } },
        { label: 'Aku ikut casual aja, jangan terlalu serius.', effects: { esport: 4 } },
      ],
    },
    {
      speaker: 'Orang Tua',
      text: 'Kamu keliatan sering main game larut malam. Bagaimana ini disikapi?',
      choices: [
        { label: 'Ini bagian dari latihan jadi atlet esport, aku atur waktunya.', effects: { esport: 7, akademik: 1 } },
        { label: 'Aku kurangi, takut ganggu sekolah.', effects: { esport: 2, akademik: 3 } },
      ],
    },
  ],

  coding: [
    {
      speaker: 'Guru Informatika',
      text: 'Project aplikasi sederhana kamu di kelas Informatika cukup rapi. Mau ikut lomba coding tingkat kota?',
      choices: [
        { label: 'Mau, saya ingin bikin project lebih besar.', effects: { coding: 9 } },
        { label: 'Saya belajar dulu pelan-pelan.', effects: { coding: 4 } },
      ],
    },
    {
      speaker: 'Diri sendiri',
      text: 'Kamu nemu bug aneh di project coding-mu tengah malam.',
      choices: [
        { label: 'Debug sampai ketemu solusinya, walau begadang.', effects: { coding: 9 } },
        { label: 'Tidur dulu, lanjut besok dengan kepala dingin.', effects: { coding: 5 } },
      ],
    },
  ],
};

export function getRandomEvent(category) {
  const pool = events[category];
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default events;
