// endings.js
// Ending ditentukan oleh: cabang dengan stat tertinggi (dominant category) + tier pencapaian.
// tier: 'tinggi' (>=80), 'sedang' (>=50), 'rendah' (<50)

const endings = {
  agama: {
    tinggi: {
      title: 'Ending: Teladan di Sekolah',
      text: 'Kamu tumbuh menjadi murid yang paling dihormati bukan karena nilai atau piala, tapi karena akhlak. Kepala sekolah memintamu memberi sambutan saat wisuda kelas 9, mewakili nilai-nilai yang selama ini kamu pegang teguh. Ambisimu menemukan bentuk paling tenang: menjadi cahaya bagi orang lain.',
    },
    sedang: {
      title: 'Ending: Langkah yang Konsisten',
      text: 'Kamu tidak menjadi yang paling menonjol, tapi teman-temanmu tahu kamu bisa diandalkan untuk hal-hal baik. Perjalanan religiusitasmu belum sempurna, tapi kamu terus melangkah — dan itu sudah cukup berarti.',
    },
    rendah: {
      title: 'Ending: Pencarian yang Belum Usai',
      text: 'Ambisimu sempat teralihkan ke banyak hal lain. Di penghujung semester, kamu sadar ada ruang dalam dirimu yang belum benar-benar kamu isi. Ceritamu belum selesai — dan itu bukan akhir yang buruk, hanya awal yang tertunda.',
    },
  },

  akademik: {
    tinggi: {
      title: 'Ending: Sang Juara Akademik',
      text: 'Namamu tercatat sebagai lulusan terbaik sekolah. Piala olimpiade sains berjejer di lemari kaca sekolah dengan namamu terukir. Guru-guru menyebutmu contoh nyata bahwa kurikulum merdeka bisa melahirkan murid yang benar-benar merdeka berpikir.',
    },
    sedang: {
      title: 'Ending: Murid yang Diperhitungkan',
      text: 'Nilai raporrmu solid, cukup untuk membuka pintu ke SMA favorit incaranmu. Kamu bukan yang nomor satu, tapi kamu tahu persis bagaimana cara belajar untuk dirimu sendiri — bekal yang lebih berharga dari sekadar angka.',
    },
    rendah: {
      title: 'Ending: Belum Menemukan Ritme',
      text: 'Semester ini berjalan naik turun. Kamu belum menemukan cara belajar yang benar-benar cocok untukmu, tapi kegagalan ini mengajarkan sesuatu yang tak diajarkan buku manapun: pentingnya mengenal diri sendiri lebih dulu.',
    },
  },

  renang: {
    tinggi: {
      title: 'Ending: Sang Perenang Nasional',
      text: 'Medali emas kejuaraan renang antar-sekolah tingkat provinsi kini jadi milikmu. Pelatih daerah mulai memantaumu untuk pemusatan latihan nasional junior. Air kolam yang dulu terasa berat kini jadi rumah keduamu.',
    },
    sedang: {
      title: 'Ending: Perenang Andalan Sekolah',
      text: 'Kamu jadi salah satu andalan tim renang sekolah, meski belum juara provinsi. Tapi disiplin yang kamu bangun di kolam renang mulai menular ke bidang lain dalam hidupmu.',
    },
    rendah: {
      title: 'Ending: Belajar dari Tenggelam',
      text: 'Latihan tak selalu berjalan mulus, dan semester ini kamu lebih banyak belajar soal kegagalan daripada kemenangan. Tapi kamu tetap berenang sampai akhir — dan itu butuh keberanian tersendiri.',
    },
  },

  lari: {
    tinggi: {
      title: 'Ending: Kilat dari Sekolah Kita',
      text: 'Rekor lari 100m sekolah kini atas namamu, dan kamu terpilih mewakili kota di kejuaraan atletik junior. Julukan "si kilat" melekat padamu — bukan cuma soal kecepatan kaki, tapi juga kecepatanmu bangkit dari lelah.',
    },
    sedang: {
      title: 'Ending: Pelari yang Gigih',
      text: 'Kamu tak pernah jadi yang tercepat, tapi kamu selalu finis dengan usaha penuh. Pelatih bilang, semangat seperti itu yang justru sulit dicari.',
    },
    rendah: {
      title: 'Ending: Langkah yang Tertatih',
      text: 'Cedera kecil dan rasa malas sempat menghambat semester ini. Tapi kamu tetap berdiri di garis start sampai akhir musim — dan terkadang, hanya itu yang perlu dibuktikan pada diri sendiri.',
    },
  },

  sepakbola: {
    tinggi: {
      title: 'Ending: Kapten Masa Depan',
      text: 'Golmu di final turnamen antar sekolah membawa timmu juara kota. Scout dari akademi sepak bola lokal mulai memantaumu. Lapangan kini terasa seperti panggung yang memang untukmu.',
    },
    sedang: {
      title: 'Ending: Pemain Inti Tim Sekolah',
      text: 'Kamu jadi bagian penting skuad sekolah meski bukan bintang utama. Kekompakan tim yang kamu bangun jadi kenangan yang lebih berharga dari sekadar trofi.',
    },
    rendah: {
      title: 'Ending: Bangku Cadangan yang Setia',
      text: 'Lebih sering duduk di bangku cadangan daripada bermain, tapi kamu tak pernah absen latihan. Kadang, kesetiaan pada mimpi itu sendiri sudah jadi kemenangan.',
    },
  },

  basket: {
    tinggi: {
      title: 'Ending: Sang Sniper Tiga Angka',
      text: 'Tembakan three-point penentu di detik akhir final membawa sekolahmu juara kota. Namamu jadi legenda kecil di lorong sekolah, difoto dan ditempel di mading prestasi.',
    },
    sedang: {
      title: 'Ending: Pemain Rotasi Andalan',
      text: 'Kamu tak selalu starter, tapi setiap kali masuk lapangan, timmu tahu kamu bisa diandalkan. Konsistensi kecil itu ternyata membentuk karakter besar.',
    },
    rendah: {
      title: 'Ending: Belum Menemukan Ritme Permainan',
      text: 'Semester ini penuh kesalahan teknis dan kekalahan. Tapi kamu tetap datang ke setiap sesi latihan — dan pelatih tahu, itu adalah bibit pemain yang tidak menyerah.',
    },
  },

  esport: {
    tinggi: {
      title: 'Ending: Atlet Esport Muda Berbakat',
      text: 'Timmu menjuarai turnamen esport tingkat kota, dan sebuah organisasi esport lokal menawarimu program pembinaan. Orang tuamu yang dulu ragu kini justru paling semangat menonton pertandinganmu.',
    },
    sedang: {
      title: 'Ending: Core Player yang Dipercaya',
      text: 'Timmu belum juara, tapi kamu dikenal sebagai pemain dengan pengambilan keputusan paling tenang di saat genting. Esport mengajarimu strategi yang ternyata berguna juga di luar layar.',
    },
    rendah: {
      title: 'Ending: Hobi yang Belum Jadi Prestasi',
      text: 'Waktu bermainmu belum berubah jadi pencapaian nyata, dan orang tua sempat khawatir. Tapi kamu mulai belajar mengatur waktu — pelajaran yang mungkin lebih penting dari trofi turnamen manapun.',
    },
  },

  coding: {
    tinggi: {
      title: 'Ending: Programmer Cilik Berprestasi',
      text: 'Aplikasi buatanmu menang di lomba coding tingkat kota, dan videonya viral di media sosial sekolah. Beberapa startup lokal bahkan menghubungi gurumu untuk menawarimu program magang mini. Baris kode pertamamu ternyata jadi awal dari sesuatu yang besar.',
    },
    sedang: {
      title: 'Ending: Calon Developer Sekolah',
      text: 'Project codingmu belum juara lomba, tapi jadi bahan pamer favorit di kelas Informatika. Guru-guru mulai memercayakan tugas teknis sekolah kepadamu.',
    },
    rendah: {
      title: 'Ending: Baris Kode yang Belum Selesai',
      text: 'Banyak project codingmu berhenti di tengah jalan karena bug atau rasa putus asa. Tapi tiap kali gagal, kamu tetap membuka editor lagi keesokan harinya — dan itu adalah modal utama seorang programmer.',
    },
  },
};

export default endings;
