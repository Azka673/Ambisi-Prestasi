// StatManager.js
// Menyimpan seluruh progres pemain: nama, hari, dan nilai tiap cabang pencapaian.
// Cabang: agama, akademik, renang, lari, sepakbola, basket, esport, coding

const CATEGORY_LABELS = {
  agama: 'Agama',
  akademik: 'Akademik',
  renang: 'Renang',
  lari: 'Lari',
  sepakbola: 'Sepak Bola',
  basket: 'Basket',
  esport: 'E-Sport',
  coding: 'Coding',
};

export default class StatManager {
  constructor() {
    this.reset();
  }

  reset() {
    this.playerName = 'Murid';
    this.focusPath = null; // cabang yang dipilih di awal (niat awal pemain)
    this.day = 1;
    this.maxDay = 12; // panjang satu "semester" permainan
    this.stats = {
      agama: 10,
      akademik: 10,
      renang: 10,
      lari: 10,
      sepakbola: 10,
      basket: 10,
      esport: 10,
      coding: 10,
    };
    this.history = []; // log pilihan pemain, berguna utk epilog
  }

  setFocus(path) {
    this.focusPath = path;
    // bonus niat awal, tapi tidak menjamin ending — tetap harus diperjuangkan lewat pilihan harian
    this.addStat(path, 15);
  }

  addStat(key, amount) {
    if (!(key in this.stats)) return;
    this.stats[key] = Phaser.Math.Clamp(this.stats[key] + amount, 0, 100);
  }

  logChoice(text) {
    this.history.push(`Hari ${this.day}: ${text}`);
  }

  nextDay() {
    this.day += 1;
    return this.day > this.maxDay;
  }

  getLabel(key) {
    return CATEGORY_LABELS[key] || key;
  }

  // Menentukan cabang dominan pemain di akhir permainan
  getDominantCategory() {
    let best = null;
    let bestVal = -1;
    for (const key of Object.keys(this.stats)) {
      if (this.stats[key] > bestVal) {
        bestVal = this.stats[key];
        best = key;
      }
    }
    return { key: best, value: bestVal };
  }

  // Menentukan tingkat pencapaian: 'tinggi' | 'sedang' | 'rendah'
  getTier(value) {
    if (value >= 80) return 'tinggi';
    if (value >= 50) return 'sedang';
    return 'rendah';
  }
}

export { CATEGORY_LABELS };
