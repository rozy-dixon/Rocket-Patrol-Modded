class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // tile sprites
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        // borders and UI
        // x coord, y coord, width, height, color
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFFFFFF).setOrigin(0, 0) // green UI background 0x00FF00
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0) // white border top
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0) // white border bottom
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0) // white border left
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0) // white border right
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0)
        // add space shuttle (1)
        this.shuttle = new Spaceshuttle(this, game.config.width + borderUISize, borderUISize*7 + borderPadding*6, 'spaceshuttle', 0, 40).setOrigin(0,0)
        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // initialize score
        this.p1Score = 0
        // display score
        let UITextConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',     //'#F3B141',
            color: '#FFFFFF',               //'#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, UITextConfig)
        // initialize and display high score
        this.highScoreLeft = this.add.text(borderUISize + borderPadding + 110, borderUISize + borderPadding*2, highScore, UITextConfig)
        // initialize and display countdown
        this.countdown = game.settings.gameTimer/1000
        this.countdownLeft = this.add.text(borderUISize + borderPadding + (110*2), borderUISize + borderPadding*2, this.countdown, UITextConfig)
        this.countdownTimer = this.time.addEvent({ delay: 1000, callback: this.updateCountdown, callbackScope: this, loop: true})
        // initialize and display "FIRE"
        this.fire = 'FIRE'
        this.fireLeft = this.add.text(borderUISize + borderPadding + (110*3), borderUISize+ borderPadding*2, this.fire, UITextConfig)
        // GAME OVER flag
        this.gameOver = false
        // 60-second play clock
        UITextConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', UITextConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', UITextConfig).setOrigin(0.5)
            if (this.p1Score > highScore) { 
                highScore = this.p1Score
                this.highScoreLeft.text = highScore
            }
            this.gameOver = true
        }, null, this)
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        this.starfield.tilePositionX -= 4

        if (!this.gameOver) {               
            this.p1Rocket.update()      // update rocket sprite
            this.ship01.update()        // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.shuttle.update()       // update space shuttle
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if (this.checkCollision(this.p1Rocket, this.shuttle)) {
            this.p1Rocket.reset()
            this.shipExplode(this.shuttle)
        }

        if (this.p1Rocket.isFiring && !this.gameOver) {
            this.fireLeft.setVisible(true);
        } else {
            this.fireLeft.setVisible(false);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')              // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset()                          // reset ship position
          ship.alpha = 1                        // make ship visible again
          boom.destroy()                        // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        // kaboom sound x5
        const explosions = [ 'sfx-explosion1', 'sfx-explosion2', 'sfx-explosion3', 'sfx-explosion4', 'sfx-explosion5' ]
        var explosionSound = explosions[Math.floor(Math.random()*5)]
        this.sound.play(explosionSound)
    }

    updateCountdown() {
        if (!this.gameOver) {
            this.countdown--
            this.countdownLeft.text = this.countdown
        }
    }
}