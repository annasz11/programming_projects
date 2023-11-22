function loadGame() {
    const gameStateJSON = localStorage.getItem('gameState')
    if (gameStateJSON) {
        const loadedGame = Game.fromJSON(gameStateJSON)
        return loadedGame
    }
    return null
}

function saveGame(game) {
    if(localStorage) {
        const gameStateJSON = game.toJSON()
        localStorage.setItem('gameState', gameStateJSON)
    }
}
