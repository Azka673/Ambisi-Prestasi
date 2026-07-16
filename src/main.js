import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import CharacterScene from './scenes/CharacterScene.js';
import HubScene from './scenes/HubScene.js';
import EndingScene from './scenes/EndingScene.js';
import StatManager from './engine/StatManager.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
  parent: 'game-container',
  pixelArt: true,
  backgroundColor: '#0b0b12',
  scene: [BootScene, MenuScene, CharacterScene, HubScene, EndingScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

// StatManager disimpan di registry supaya bisa diakses semua scene
game.registry.set('statManager', new StatManager());
