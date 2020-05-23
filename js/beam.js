import Phaser from "phaser";

export default class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    let x = scene.ship.x;
    let y = scene.ship.y - 16;

    super(scene, x, y, "beam");
    scene.add.existing(this);
    this.play("beam_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.y = -250;
    scene.bullets.add(this);
  }
  update() {
    if (this.y < 32) {
      this.destroy();
    }
  }
}
