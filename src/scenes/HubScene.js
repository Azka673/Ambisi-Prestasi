import DialogueBox from '../engine/DialogueBox.js';
import { getRandomEvent } from '../data/events.js';
import drawPixelActor from '../engine/PixelActor.js';

const ACTIVITIES = [
  { key: 'agama', label: 'Ibadah' },
  { key: 'akademik', label: 'Belajar' },
  { key: 'renang', label: 'Renang' },
  { key: 'lari', label: 'Lari' },
  { key: 'sepakbola', label: 'Sepak Bola' },
  { key: 'basket', label: 'Basket' },
  { key: 'esport', label: 'E-Sport' },
  { key: 'coding', label: 'Coding' },
];

export default class HubScene extends Phaser.Scene {
  constructor() {
    super('HubScene');
  }

  create() {
    const { width } = this.scale;
    this.stats = this.registry.get('statManager');
    this.cameras.main.setBackgroundColor('#12121c');

    this.uiLayer = this.add.container(0, 0);

    this.title = this.add.text(24, 20, '', {
      fontFamily: 'Courier New', fontSize: '20px', color: '#ffe08a', fontStyle: 'bold',
    });

    drawPixelActor(this, width - 70, 20, {});

    this.statTexts = {};
    let sy = 60;
    Object.keys(this.stats.stats).forEach((key) => {
      const t = this.add.text(24, sy, '', { fontFamily: 'Courier New', fontSize: '13px', color: '#cccccc' });
      this.statTexts[key] = t;
      sy += 18;
    });

    this.activityButtons = [];
    const startY = 60;
    ACTIVITIES.forEach((act, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = width - 260 + col * 140;
      const y = startY + row * 46;

      const btn = this.add.text(x, y, act.label, {
        fontFamily: 'Courier New',
        fontSize: '14px',
        color: '#000',
        backgroundColor: '#7dd3fc',
        padding: { x: 10, y: 8 },
        fixedWidth: 120,
        align: 'center',
      }).setOrigin(0, 0).setInteractive({ useHandCursor: true });

      btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#bae6fd' }));
      btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#7dd3fc' }));
      btn.on('pointerdown', () => this.doActivity(act.key));

      this.activityButtons.push(btn);
    });

    this.dialogue = new DialogueBox(this);
    this.dialogue.container.setVisible(false);

    this.refreshUI();
  }

  refreshUI() {
    this.title.setText(`${this.stats.playerName} — Hari ke-${this.stats.day} dari ${this.stats.maxDay}`);
    Object.keys(this.stats.stats).forEach((key) => {
      const val = this.stats.stats[key];
      const bar = '█'.repeat(Math.round(val / 5)).padEnd(20, '░');
      this.statTexts[key].setText(`${this.stats.getLabel(key).padEnd(12, ' ')} ${bar} ${val}`);
    });
  }

  setActivityButtonsEnabled(enabled) {
    this.activityButtons.forEach((b) => {
      b.disableInteractive();
      if (enabled) b.setInteractive({ useHandCursor: true });
    });
  }

  doActivity(categoryKey) {
    const event = getRandomEvent(categoryKey);
    if (!event) return;

    this.setActivityButtonsEnabled(false);
    this.dialogue.container.setVisible(true);

    this.dialogue.show({
      speaker: event.speaker,
      text: event.text,
      choices: event.choices.map((choice) => ({
        label: choice.label,
        onSelect: () => {
          Object.entries(choice.effects).forEach(([k, v]) => this.stats.addStat(k, v));
          this.stats.logChoice(`${event.speaker}: ${choice.label}`);
          this.dialogue.container.setVisible(false);
          this.advanceDay();
        },
      })),
    });
  }

  advanceDay() {
    const isOver = this.stats.nextDay();
    this.refreshUI();
    this.setActivityButtonsEnabled(true);

    if (isOver) {
      this.scene.start('EndingScene');
      return;
    }
  }
}
