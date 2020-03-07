import Phaser from "phaser";
//taki boost co jak sie w niego wejdzie to wtedy dodaje ci jednego dush`a jak nacisniesz space to teleportujesz sie o iles tam pokseli
//boost --- samonamierzająca amunicaja
export default class Scene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("bg", "assets/bg.png");
    this.load.spritesheet("ship", "assets/ship.png", {
      frameWidth: 32,
      frameHeigh: 32
    });
    this.load.image("eship1", "assets/enemyship1.png");
    this.load.image("eship2", "assets/enemyship2.png");
    this.load.spritesheet("eship3", "assets/enemyship3.png", {
      frameWidth: 32,
      frameHeigh: 32
    });
    this.load.image("eship4", "assets/enemyship4.png");
    this.load.image("pu", "assets/powerup.png");

    this.load.spritesheet("wybuch", "assets/wybuch.png", {
      frameWidth: 32,
      frameHeigh: 32
    });
    this.load.spritesheet("beam", "assets/beam.png", {
      frameHeigh: 16,
      frameWidth: 16
    });
  }

  create() {
    this.lives = 3;
    this.background = this.add.image(256 / 2, 272 / 2, "bg");
    this.gamename = this.add.text(50, 5, "latajace samoloty");
    this.scoreText = this.add.text(100, 20, "lives: " + this.lives);
    this.ship = this.physics.add.sprite(256 / 2, 272 / 2, "ship");
    this.eship1 = this.physics.add.image(190 / 2, 100 / 2, "eship1");
    this.eship1.flipY = true;
    this.eship2 = this.physics.add.image(330 / 2, 100 / 2, "eship2");
    this.eship2.flipY = true;
    this.eship3 = this.physics.add.image(120 / 2, 100 / 2, "eship3");
    this.eship3.flipY = true;
    this.eship4 = this.physics.add.image(400 / 2, 100 / 2, "eship4");
    this.eship4.flipY = true;
    this.KDown = 1;
    this.KDownA = 1;
    this.KDownB = 1;
    this.KDownC = 1;

    this.anims.create({
      key: "shot_anim",
      frames: this.anims.generateFrameNumbers("Beam"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "wybuch_anim",
      frames: this.anims.generateFrameNumbers("wybuch"),
      frameRate: 7,
      repeat: 0
    });

    this.ship.play("ship_anim");
    this.keys = this.input.keyboard.createCursorKeys();
    this.rKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.physics.add.overlap(this.ship, this.eship1, this.endgame, null, this);
    this.physics.add.overlap(this.ship, this.eship2, this.endgame, null, this);
    this.physics.add.overlap(this.ship, this.eship3, this.endgame, null, this);
    this.physics.add.overlap(this.ship, this.eship4, this.endgame, null, this);
    this.createPowerUps();

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  hitEnemy(bullet, enemyShip) {
    bullet.destroy();
    enemyShip.destroy();
  }

  createBullers() {
    this.bullets = this.add.group();

    this.anim.creat({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });
    this.physics.add.overlap(
      this.bullets,
      this.enemyShips,
      this.hitEFnemy,
      null,
      this
    );
  }

  createPowerUps() {
    this.powerUps = this.physics.add.group();

    this.powerUp1 = this.physics.add.sprite(0, 0, "pu");
    this.powerUp1.setRandomPosition(0, 0, this.sceneWidth, this.sceneHeight);
    this.powerUp1.setVelocity(100, 100);
    this.physics.world.setBoundsCollision();
    this.powerUp1.setCollideWorldBounds(true);
    this.powerUp1.setBounce(1);

    this.physics.add.overlap(
      this.powerUp1,
      this.ship1,
      this.onPowerUpPickup,
      null,
      this
    );
  }

  onPowerUpPickup(powerup) {
    this.lives = this.lives + 1;
    this.updateLives();
    powerup.destroy();
  }

  update() {
    let speed = 3;
    let sceneW = 256;
    let sceneH = 272;
    if (this.keys.left.isDown) {
      this.ship.x = this.ship.x - speed;
      if (this.ship.x < 14) {
        this.ship.x = 14;
      }
    }
    if (this.keys.right.isDown) {
      this.ship.x = this.ship.x + speed;
      if (this.ship.x > sceneW - 14) {
        this.ship.x = sceneW - 14;
      }
    }
    if (this.keys.up.isDown) {
      this.ship.y = this.ship.y - speed;
      if (this.ship.y < 14) {
        this.ship.y = 14;
      }
    }
    if (this.keys.down.isDown) {
      this.ship.y = this.ship.y + speed;
      if (this.ship.y > sceneH - 14) {
        this.ship.y = sceneH - 14;
      }
    }
    if (this.rKeys.isDown) {
      this.ship.y = this.ship.y = 256 / 2;
      this.ship.x = this.ship.x = 272 / 2;
    }

    this.KDown = this.MoveShip(this.KDown, this.eship1, 2.5);

    this.KDownA = this.MoveShip(this.KDownA, this.eship2, 2.1);

    this.KDownB = this.MoveShip(this.KDownB, this.eship3, 3.5);

    this.KDownC = this.MoveShip(this.KDownC, this.eship4, 3);

    if (this.lives === 0) {
      this.wybuch = this.physics.add.sprite(this.ship.x, this.ship.y, "wybuch");
    }
  }

  updateLives() {
    this.scoreText.setText("lives: " + this.lives);
  }

  onEnemiesCollide() {
    if (this.lives > 0) {
      this.lives = this.lives - 1;
      this.updateLives();
    } else {
      this.endGame();
    }
  }

  endGame() {
    this.lives = this.lives - 1;
  }

  MoveShip(KDown, eship, speed) {
    if (KDown === 1) {
      eship.y = eship.y + speed;
      if (eship.y > 275) {
        KDown = 0;
        eship.flipY = false;
      }
    } else {
      eship.y = eship.y - speed;
      if (eship.y < -10) {
        KDown = 1;
        eship.flipY = true;
        eship.x = Math.random() * 256;
      }
    }

    return KDown;
  }
  endgame() {
    this.scene.start("end");
  }
}
