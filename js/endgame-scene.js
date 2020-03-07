import Phaser from "phaser";

export default class EndGameScene extends Phaser.Scene {
  constructor() {
    super("end");
  }
  preload() {
    this.load.image("endgame", "assets/youdead.png");

    this.load.spritesheet("wybuch", "assets/wybuch.png", {
      frameWidth: 32,
      frameHeigh: 32
    });
  }
  create() {
    this.background = this.add.image(256 / 2, 272 / 2, "endgame");

    this.rKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.wybuch = this.physics.add.sprite(256 / 2, 272 / 2, "wybuch");
    this.anims.create({
      key: "wybuch_anim",
      frames: this.anims.generateFrameNumbers("wybuch"),
      frameRate: 7,
      repeat: 0
    });
    this.wybuch.play("wybuch_anim");
  }
  update() {
    if (this.rKeys.isDown) {
      this.scene.start("startScene");
    }
  }
}
