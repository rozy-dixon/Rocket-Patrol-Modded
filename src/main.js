// MODS:
// [X] Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//     - this is the Spaceshuttle type
// [X] Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)
//     - https://github.com/nathanaltice/PartyCoolFX
//     - main.js, Basic.js, and ArcadeCollide.js as primary references
// [X] Create 4 new explosion sound effects and randomize which one plays on impact (3)
// [X] Display the time remaining (in seconds) on the screen (3)
// [X] Create a new title screen (e.g., new artwork, typography, layout) (3)
// [X] Allow the player to control the Rocket after it's fired (1)
// [X] Track a high score that persists across scenes and display it in the UI (1)
// [X] Implement the 'FIRE' UI text from the original game (1)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: [ Title, Menu, Play ]
}
let game = new Phaser.Game(config)
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
// high score
let highScore = 0