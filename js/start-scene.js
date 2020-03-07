import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("startScene");
  }
  preload() {
    this.load.image("play", "assets/start.png");
    this.load.spritesheet("ship", "assets/ship.png", {
      frameWidth: 32,
      frameHeigh: 32
    });
  }
  create() {
    this.background = this.add.image(256 / 2, 272 / 2, "play");
    this.rKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.ship = this.physics.add.sprite(256 / 2, 272 / 2, "ship");
  }
  update() {
    if (this.rKeys.isDown) {
      this.scene.start("bootGame");
    }
  }
}
