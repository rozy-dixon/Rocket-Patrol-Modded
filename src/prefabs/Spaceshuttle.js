class Spaceshuttle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)                            // add to existing scene
        this.points = pointValue                            // store pointValue
        this.moveSpeed = game.settings.spaceshuttleSpeed    // space shuttle speed in pixels/frame
    }

    update() {
        // move space shuttle left
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