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
    // Open-world layout parameters
    const WORLD_W = 2000;
    const WORLD_H = 1200;

    this.stats = this.registry.get('statManager');
    this.cameras.main.setBackgroundColor('#12121c');

    // Create a retro tiled background using graphics
    const tile = this.add.graphics();
    const tileSize = 32;
    for (let tx = 0; tx < WORLD_W; tx += tileSize) {
      for (let ty = 0; ty < WORLD_H; ty += tileSize) {
        const shade = ((tx / tileSize + ty / tileSize) % 2 === 0) ? 0x11121a : 0x151524;
        tile.fillStyle(shade, 1);
        tile.fillRect(tx, ty, tileSize, tileSize);
      }
    }

    // World bounds and camera
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);

    // Create a player texture from the existing pixel-drawer, then make a physics sprite
    const preview = drawPixelActor(this, 0, 0, { scale: 4 });
    const texW = 8 * 4;
    const texH = 10 * 4;
    preview.generateTexture('playerPix', texW, texH);
    preview.destroy();

    this.player = this.physics.add.image(120, 120, 'playerPix').setDepth(2).setCollideWorldBounds(true);
    this.player.setScale(1);
    this.player.body.setSize(texW, texH);

    // Activity points scattered in the world (open-world interaction)
    this.activityPoints = ACTIVITIES.map((act, i) => {
      const angle = (i / ACTIVITIES.length) * Math.PI * 2;
      const px = Math.round(WORLD_W / 2 + Math.cos(angle) * 420 + (i * 13));
      const py = Math.round(WORLD_H / 2 + Math.sin(angle) * 260 + (i * 7));
      return { x: px, y: py, key: act.key, label: act.label };
    });

    // Labels for activity points (world objects)
    this.activityPoints.forEach((p) => {
      const bg = this.add.rectangle(p.x, p.y, 46, 28, 0x88e3ff).setOrigin(0.5).setDepth(1);
      const t = this.add.text(p.x, p.y, p.label, { fontFamily: 'Courier New', fontSize: '12px', color: '#000' }).setOrigin(0.5).setDepth(2);
      // Slight retro pixel border
      bg.setStrokeStyle(2, 0x18384a);
    });

    // UI text and stat area (fixed to camera)
    this.title = this.add.text(12, 10, '', { fontFamily: 'Courier New', fontSize: '18px', color: '#ffe08a', fontStyle: 'bold' }).setScrollFactor(0);

    this.statTexts = {};
    let sy = 36;
    Object.keys(this.stats.stats).forEach((key) => {
      const t = this.add.text(12, sy, '', { fontFamily: 'Courier New', fontSize: '12px', color: '#cccccc' }).setScrollFactor(0);
      this.statTexts[key] = t;
      sy += 16;
    });

    this.dialogue = new DialogueBox(this);
    this.dialogue.container.setVisible(false);

    // Camera follows player
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Interaction prompt (UI fixed)
    this.interactText = this.add.text(this.scale.width / 2, this.scale.height - 28, 'Tekan [SPACE] untuk berinteraksi', { fontFamily: 'Courier New', fontSize: '14px', color: '#ffffff', backgroundColor: '#222', padding: { x: 8, y: 6 } }).setOrigin(0.5).setScrollFactor(0).setVisible(false).setDepth(10);

    this.refreshUI();
  }

  update(time, delta) {
    // player movement
    const speed = 160;
    let vx = 0;
    let vy = 0;
    if (this.cursors.left.isDown) vx = -speed;
    else if (this.cursors.right.isDown) vx = speed;
    if (this.cursors.up.isDown) vy = -speed;
    else if (this.cursors.down.isDown) vy = speed;
    this.player.setVelocity(vx, vy);

    // Check proximity to activity points
    let near = null;
    for (const p of this.activityPoints) {
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, p.x, p.y);
      if (d < 48) { near = p; break; }
    }

    if (near) {
      this.interactText.setVisible(true);
      if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
        this.doActivity(near.key);
      }
    } else {
      this.interactText.setVisible(false);
    }
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
    // In open-world mode we don't use the old button list — keep as noop.
    // This method exists for compatibility with other code paths.
    return;
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
