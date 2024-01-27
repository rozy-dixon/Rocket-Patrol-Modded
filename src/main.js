// MODS:
// [X] Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//     - this is the Spaceshuttle type
// [ ] Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
// [X] Create 4 new explosion sound effects and randomize which one plays on impact (3)
// [X] Display the time remaining (in seconds) on the screen (3)
// [ ] Create a new title screen (e.g., new artwork, typography, layout) (3)
// [X] Allow the player to control the Rocket after it's fired (1)
// [ ] Track a high score that persists across scenes and display it in the UI (1)
// [ ] Implement the 'FIRE' UI text from the original game (1)
// [ ] Implement the speed increase that happens after 30 seconds in the original game (1)
// [ ] Randomize each spaceship's movement direction at the start of each play (1)

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
// high score
let highScore = 0