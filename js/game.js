import Phaser from "phaser";
import EndGameScene from "/js/endgame-scene.js";
import Scene from "./scene.js";
import StartScene from "/js/start-scene.js";

let config = {
  width: 256,
  height: 272,
  backgroundColor: 0x000000,
  scene: [StartScene, Scene, EndGameScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

let game = new Phaser.Game(config);
