class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)                        // Add to the existing scene
        this.points = pointValue                        // Store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed   // Spaceship speed in pixels/frames
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed

        // wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }
    }

    // reset to right
    reset() {
        this.x = game.config.width
    }
}