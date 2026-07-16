import drawPixelActor from '../engine/PixelActor.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#0b0b12');

    // Background pattern sederhana (grid pixel)
    const g = this.add.graphics();
    g.fillStyle(0x1a1a2e, 1);
    for (let x = 0; x < width; x += 32) {
      for (let y = 0; y < height; y += 32) {
        if ((x / 32 + y / 32) % 2 === 0) g.fillRect(x, y, 32, 32);
      }
    }

    this.add.text(width / 2, 90, 'AMBISI SANG MURID', {
      fontFamily: 'Courier New',
      fontSize: '38px',
      color: '#ffe08a',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, 135, 'Sebuah Kisah Pilihan Bergaya Pixel', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#9be7ff',
    }).setOrigin(0.5);

    drawPixelActor(this, width / 2 - 16, 190, { outfit: 0x2b6fb3 });

    const startBtn = this.add.text(width / 2, 340, '[ MULAI CERITA BARU ]', {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#2b6fb3',
      padding: { x: 16, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    startBtn.on('pointerover', () => startBtn.setStyle({ backgroundColor: '#3f8ce0' }));
    startBtn.on('pointerout', () => startBtn.setStyle({ backgroundColor: '#2b6fb3' }));
    startBtn.on('pointerdown', () => this.scene.start('CharacterScene'));

    this.add.text(width / 2, 400, 'Pilih jalan hidupmu: Agama, Akademik, Olahraga, E-Sport, atau Coding.', {
      fontFamily: 'Courier New',
      fontSize: '13px',
      color: '#888',
    }).setOrigin(0.5);
  }
}
