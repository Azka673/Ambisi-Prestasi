import drawPixelActor from '../engine/PixelActor.js';

const PATHS = [
  { key: 'agama', label: 'Agama', color: 0x8a5cf6 },
  { key: 'akademik', label: 'Akademik', color: 0x38bdf8 },
  { key: 'renang', label: 'Olahraga: Renang', color: 0x2dd4bf },
  { key: 'lari', label: 'Olahraga: Lari', color: 0x34d399 },
  { key: 'sepakbola', label: 'Olahraga: Sepak Bola', color: 0x4ade80 },
  { key: 'basket', label: 'Olahraga: Basket', color: 0xfb923c },
  { key: 'esport', label: 'E-Sport', color: 0xf472b6 },
  { key: 'coding', label: 'Coding', color: 0xfacc15 },
];

export default class CharacterScene extends Phaser.Scene {
  constructor() {
    super('CharacterScene');
  }

  create() {
    const { width } = this.scale;
    this.cameras.main.setBackgroundColor('#0b0b12');

    this.add.text(width / 2, 50, 'Siapa Namamu?', {
      fontFamily: 'Courier New', fontSize: '26px', color: '#ffe08a', fontStyle: 'bold',
    }).setOrigin(0.5);

    drawPixelActor(this, width / 2 - 16, 80, {});

    this.playerName = 'Murid';
    this.nameDisplay = this.add.text(width / 2, 200, this.playerName, {
      fontFamily: 'Courier New', fontSize: '22px', color: '#ffffff', backgroundColor: '#222', padding: { x: 12, y: 6 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.nameDisplay.on('pointerdown', () => {
      const input = prompt('Masukkan nama karaktermu:', this.playerName);
      if (input && input.trim().length > 0) {
        this.playerName = input.trim().slice(0, 16);
        this.nameDisplay.setText(this.playerName);
      }
    });

    this.add.text(width / 2, 230, '(klik nama di atas untuk mengubahnya)', {
      fontFamily: 'Courier New', fontSize: '12px', color: '#777',
    }).setOrigin(0.5);

    this.add.text(width / 2, 270, 'Pilih Cita-cita Utamamu:', {
      fontFamily: 'Courier New', fontSize: '18px', color: '#9be7ff',
    }).setOrigin(0.5);

    this.add.text(width / 2, 292, '(pilihan ini beri awalan, tapi masa depanmu tetap ditentukan pilihanmu sehari-hari)', {
      fontFamily: 'Courier New', fontSize: '11px', color: '#666',
    }).setOrigin(0.5);

    const cols = 4;
    const startX = width / 2 - ((cols - 1) * 150) / 2;
    PATHS.forEach((path, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * 150;
      const y = 330 + row * 55;

      const btn = this.add.text(x, y, path.label, {
        fontFamily: 'Courier New',
        fontSize: '13px',
        color: '#000',
        backgroundColor: '#dddddd',
        padding: { x: 8, y: 8 },
        align: 'center',
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#ffffff' }));
      btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#dddddd' }));
      btn.on('pointerdown', () => {
        const stats = this.registry.get('statManager');
        stats.playerName = this.playerName;
        stats.setFocus(path.key);
        this.scene.start('HubScene');
      });
    });
  }
}
