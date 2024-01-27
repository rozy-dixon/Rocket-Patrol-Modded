class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    preload() {
        this.load.image('titlecard', './assets/titlecard.png')
    }

    create() {
        // key definition
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // display title card
        this.add.image(0, 0, 'titlecard').setOrigin(0, 0)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene')
        }
    }
}