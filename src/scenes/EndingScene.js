import endings from '../data/endings.js';
import drawPixelActor from '../engine/PixelActor.js';

export default class EndingScene extends Phaser.Scene {
  constructor() {
    super('EndingScene');
  }

  create() {
    const { width, height } = this.scale;
    this.stats = this.registry.get('statManager');
    this.cameras.main.setBackgroundColor('#0b0b12');

    const dominant = this.stats.getDominantCategory();
    const tier = this.stats.getTier(dominant.value);
    const ending = endings[dominant.key][tier];

    this.add.text(width / 2, 40, 'SEMESTER BERAKHIR', {
      fontFamily: 'Courier New', fontSize: '22px', color: '#888',
    }).setOrigin(0.5);

    drawPixelActor(this, width / 2 - 16, 70, {});

    this.add.text(width / 2, 150, ending.title, {
      fontFamily: 'Courier New', fontSize: '26px', color: '#ffe08a', fontStyle: 'bold', align: 'center',
      wordWrap: { width: width - 100 },
    }).setOrigin(0.5);

    this.add.text(width / 2, 220, ending.text, {
      fontFamily: 'Courier New', fontSize: '15px', color: '#ffffff', align: 'center',
      wordWrap: { width: width - 120 }, lineSpacing: 6,
    }).setOrigin(0.5, 0);

    this.add.text(width / 2, 360, `Cabang dominan: ${this.stats.getLabel(dominant.key)} (${dominant.value}/100)`, {
      fontFamily: 'Courier New', fontSize: '13px', color: '#9be7ff',
    }).setOrigin(0.5);

    const restartBtn = this.add.text(width / 2, 410, '[ MAIN LAGI DARI AWAL ]', {
      fontFamily: 'Courier New', fontSize: '16px', color: '#fff',
      backgroundColor: '#2b6fb3', padding: { x: 14, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    restartBtn.on('pointerdown', () => {
      this.stats.reset();
      this.scene.start('MenuScene');
    });
  }
}
