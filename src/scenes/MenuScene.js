import drawPixelActor from '../engine/PixelActor.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#0b0b12');
    // Subtle animated pixel grid background
    const bg = this.add.graphics();
    const tile = 24;
    for (let x = 0; x < width; x += tile) {
      for (let y = 0; y < height; y += tile) {
        const c = ((x / tile + y / tile) % 2 === 0) ? 0x0f1220 : 0x121424;
        bg.fillStyle(c, 1);
        bg.fillRect(x, y, tile, tile);
      }
    }

    this.add.text(width / 2, 76, 'AMBISI SANG MURID', {
      fontFamily: 'Courier New',
      fontSize: '36px',
      color: '#ffe08a',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, 116, 'Sebuah Kisah Pilihan Bergaya Pixel', {
      fontFamily: 'Courier New',
      fontSize: '14px',
      color: '#9be7ff',
    }).setOrigin(0.5);

    // Pixel character preview
    drawPixelActor(this, width / 2 - 16, 160, { outfit: 0x2b6fb3, scale: 5 });

    // Button helper
    const makeButton = (x, y, label, color, onClick) => {
      const btnBg = this.add.rectangle(x, y, 300, 48, color, 1).setOrigin(0.5).setStrokeStyle(2, 0x0b2540);
      const btnText = this.add.text(x, y, label, { fontFamily: 'Courier New', fontSize: '18px', color: '#fff' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      btnText.on('pointerover', () => btnBg.setFillStyle(Phaser.Display.Color.HexStringToColor('#3f8ce0').color, 1));
      btnText.on('pointerout', () => btnBg.setFillStyle(color, 1));
      btnText.on('pointerdown', onClick);
      return { bg: btnBg, text: btnText };
    };

    // Start New Game
    makeButton(width / 2, 300, '[ MULAI CERITA BARU ]', 0x2b6fb3, () => this.scene.start('CharacterScene'));

    // Continue if we have a player saved in registry
    const stats = this.registry.get('statManager');
    if (stats && stats.playerName) {
      makeButton(width / 2, 360, '[ LANJUTKAN ]', 0x5cb85c, () => this.scene.start('HubScene'));
    }

    this.add.text(width / 2, 420, 'Pilih jalan hidupmu: Agama, Akademik, Olahraga, E-Sport, atau Coding.', {
      fontFamily: 'Courier New',
      fontSize: '12px',
      color: '#888',
    }).setOrigin(0.5);
  }
}
