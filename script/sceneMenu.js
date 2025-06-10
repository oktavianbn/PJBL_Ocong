let snd_ambience = null;

var sceneMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "sceneMenu" });
  },
  preload() {
    this.load.image("bg_start", "assets/images/bg_start.png");
    this.load.image("btn_play", "assets/images/btn_play.png");
    this.load.image("title_game", "assets/images/title_game.png");
    this.load.image("panel_skor", "assets/images/panel_skor.png");
    this.load.audio("snd_klik_1", "assets/audio/klik_1.mp3");
    this.load.audio("snd_klik_2", "assets/audio/klik_2.mp3");
    this.load.audio("snd_klik_3", "assets/audio/klik_3.mp3");
    this.load.audio("snd_ambience", "assets/audio/ambience.mp3");
    this.load.audio("snd_transisi_menu", "assets/audio/transisi_menu.mp3");
  },
  create() {
    var btnClicked = false;

    if (snd_ambience == null) {
      snd_ambience = this.sound.add("snd_ambience");
      snd_ambience.loop = true;
      snd_ambience.setVolume(0.35);
      snd_ambience.play();
    }
    this.snd_klik1 = this.sound.add("snd_klik_1");
    this.snd_transisi = this.sound.add("snd_transisi_menu");

    // High score dari localStorage
    var skorTertinggi = localStorage["highscore"] || 0;
    this.add.image(1024 / 2, 768 / 2, "bg_start");

    // Tombol play
    var btnPlay = this.add.image(1024 / 2, 768 / 2 + 50, "btn_play");
    btnPlay.setInteractive();
    btnPlay.setDepth(10);

    // Title Game
    this.titleGame = this.add.image(1024 / 2, 768 / 2 + 384, "title_game");
    this.titleGame.setDepth(10);

    this.titleGame.y -= 600;

    // Panel skor
    var panelSkor = this.add.image(1024 / 2, 768 - 120, "panel_skor");
    panelSkor.setOrigin(0.5);
    panelSkor.setDepth(10);
    panelSkor.setAlpha(0.8);

    // Label skor
    var lblSkor = this.add.text(
      panelSkor.x + 25,
      panelSkor.y,
      "High Score: " + skorTertinggi
    );
    lblSkor.setFontSize(30);
    lblSkor.setDepth(10);
    lblSkor.setTint(0xff732e);
    lblSkor.setOrigin(0.5);

    var diz = this;

    // Animasi title
    this.tweens.add({
      targets: diz.titleGame,
      ease: 'Bounce.easeOut',
      duration: 750,
      delay: 250,
      y: 200,
      onComplete: function () {
        diz.snd_transisi.play();
      },
    });
    btnPlay.setScale(0);

    // Animasi tombol play
    this.tweens.add({
      targets: btnPlay,
      ease: 'Back',
      duration: 500,
      delay: 750,
      scaleX: 1,
      scaleY: 1,
    });
    this.titleGame.setScale(0);

    // Animasi Title
    this.tweens.add({
      targets: diz.titleGame,
      ease: 'Elastic',
      duration: 750,
      delay: 1000,
      scaleX: 1,
      scaleY: 1,
    });

    // Interaksi tombol play
    this.input.on( "gameobjectover", function (pointer, gameObject) {
        console.log("a");
        if (btnClicked) return;
        if (gameObject === btnPlay) {
          btnPlay.setTint(0x616161);
          return
        }
      },
      this
    );

    this.input.on( "gameobjectout", function (pointer, gameObject) {
        console.log("b");
        if (btnClicked) return;
        if (gameObject === btnPlay) {
          btnPlay.setTint(0xffffff);
          return
        }
      },
      this
    );

    this.input.on( "gameobjectdown", function (pointer, gameObject) {
        console.log("c");
        if (gameObject === btnPlay) {
          btnPlay.setTint(0x616161);
          btnClicked = true;
        }
      },
      this
    );

    this.input.on( "gameobjectup", function (pointer, gameObject) {
        if (gameObject === btnPlay) {
          console.log("Play");
          btnPlay.setTint(0xffffff);
          this.snd_klik1.play();
          this.scene.start("scenePlay");
        }
      },
      this
    );

    this.input.on( "pointerup", function (pointer) {
        console.log("e");
        btnClicked = false;
      },
      this
    );
  },
  update() {},
});
