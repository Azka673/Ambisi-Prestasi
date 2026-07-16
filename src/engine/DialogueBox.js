// DialogueBox.js
// Komponen UI dialog bergaya pixel/visual-novel yang bisa dipakai di scene manapun.
// Menampilkan nama pembicara, teks, dan tombol pilihan (choices).

export default class DialogueBox {
  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(100);
    this.width = scene.scale.width;
    this.height = scene.scale.height;

    const boxHeight = 170;
    const boxY = this.height - boxHeight - 16;

    this.bg = scene.add.rectangle(16, boxY, this.width - 32, boxHeight, 0x14141f, 0.95)
      .setOrigin(0, 0)
      .setStrokeStyle(4, 0xffffff, 0.9);

    this.nameTag = scene.add.rectangle(32, boxY - 22, 180, 34, 0x3b3b58)
      .setOrigin(0, 0)
      .setStrokeStyle(3, 0xffffff);

    this.nameText = scene.add.text(44, boxY - 16, '', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#ffe08a',
      fontStyle: 'bold',
    });

    this.bodyText = scene.add.text(36, boxY + 16, '', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#ffffff',
      wordWrap: { width: this.width - 80 },
      lineSpacing: 6,
    });

    this.container.add([this.bg, this.nameTag, this.nameText, this.bodyText]);
    this.choiceButtons = [];
  }

  clearChoices() {
    this.choiceButtons.forEach((c) => c.destroy());
    this.choiceButtons = [];
  }

  // node = { speaker, text, choices: [{ label, onSelect }] }
  show(node) {
    this.clearChoices();
    this.nameText.setText(node.speaker || '');
    this.bodyText.setText(node.text || '');

    if (!node.choices || node.choices.length === 0) return;

    const startY = this.bg.y + 62;
    node.choices.forEach((choice, i) => {
      const btnY = startY + i * 30;
      const label = this.scene.add.text(52, btnY, `▶ ${choice.label}`, {
        fontFamily: 'Courier New',
        fontSize: '15px',
        color: '#9be7ff',
      }).setInteractive({ useHandCursor: true });

      label.on('pointerover', () => label.setColor('#ffffff'));
      label.on('pointerout', () => label.setColor('#9be7ff'));
      label.on('pointerdown', () => choice.onSelect());

      this.container.add(label);
      this.choiceButtons.push(label);
    });
  }

  destroy() {
    this.clearChoices();
    this.container.destroy();
  }
}
