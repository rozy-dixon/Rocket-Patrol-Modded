// MODS:
// [X] Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//     - this is the Spaceshuttle type
// [ ] Implement mouse control for player movement and left mouse click to fire (5)
// [X] Create 4 new explosion sound effects and randomize which one plays on impact (3)
// [ ] Display the time remaining (in seconds) on the screen (3)
// [ ] Using a texture atlas, create a new animated sprite (three frames minimum) for the enemy spaceships (3)
// [ ] Create a new title screen (e.g., new artwork, typography, layout) (3)
// [X] Allow the player to control the Rocket after it's fired (1)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3