// ---------------------
// ITEMS FOR THE GAME
// ---------------------

const mountains = [[2, 2], [4, 9], [6, 4], [9, 10], [10, 6]]

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    }
]

const missions =
{
    "basic": [
        {
            "title": "Az erdő széle",
            "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
        },
        {
            "title": "Álmos-völgy",
            "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
        },
        {
            "title": "Krumpliöntözés",
            "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
        },
        {
            "title": "Határvidék",
            "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
        }
    ],
    "extra": [
        {
            "title": "Fasor",
            "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
        },
        {
            "title": "Gazdag város",
            "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
        },
        {
            "title": "Öntözőcsatorna",
            "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
        },
        {
            "title": "Mágusok völgye",
            "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
        },
        {
            "title": "Üres telek",
            "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
        },
        {
            "title": "Sorház",
            "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
        },
        {
            "title": "Páratlan silók",
            "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
        },
        {
            "title": "Gazdag vidék",
            "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
        }
    ],
}


// ---------------------
// MAIN LOGIC
// ---------------------

let game
let endGame = false

// Load game from localStorage if exists or create a new one
if (localStorage.gameState) {
    game = loadGame()
    game.board.display()
    game.getCurrentElement().display()
    game.updateSeason()
    game.updateTimer()
    game.calculateAndDisplayMissionPoints()
    game.displayThisSeasonPoints()
    game.displayTotalScore()

    // Check if game has ended
    if (game.getCurrentElementIndex() >= elements.length) {
        endGame = true
        game.endGame('Out of elements')
    }
    if (game.time_left <= 0) {
        endGame = true
        game.endGame('Time is up')
    }

} else {
    game = new Game(elements, mountains, missions)
}

// Rotate with press key 'R'
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase()
    if(key != 'R') return
    game.getCurrentElement().getElement().rotate()
    game.getCurrentElement().display()
})

// Mirror with press key 'M'
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase()
    if(key != 'M') return
    game.getCurrentElement().getElement().mirror()
    game.getCurrentElement().display()
})

// Add event listener to the buttons
const rotateButton = document.getElementById('rotate-button')
rotateButton.addEventListener('click', () => {
    game.getCurrentElement().getElement().rotate()
    game.getCurrentElement().display()
})

const mirrorButton = document.getElementById('mirror-button')
mirrorButton.addEventListener('click', () => {
    game.getCurrentElement().getElement().mirror()
    game.getCurrentElement().display()
})

const restartButton = document.getElementById('restart-button')
restartButton.addEventListener('click', () => {
    game.restart()
    start()
})


// Start the game
if (!endGame) {
    start()
}

function start() {
    // The board for the game -> add event listeners to the cells
    const board_table = document.getElementById('board-table')

    delegate(board_table, 'td', 'click', (event, cell) => {
        const row = cell.parentNode.rowIndex
        const col = cell.cellIndex

        // Try to place the current element at the clicked location, show the results and update the game
        if (game.board.placeElement(game.getCurrentElement().getElement(), [row, col])) {
            game.displayPoints()

            let timeBefore = game.time_left
            game.time_left -= game.getCurrentElement().getElement().getTime()
            let timeAfter = game.time_left

            game.board.display()
            game.getCurrentElement().display()
            game.incrementCurrentElementIndex()

            // Check if we have switched season -> reshuffle the element cards
            if (((timeAfter % 7 === 0) || ((Math.floor(timeBefore/7) > Math.floor(timeAfter/7))) && (timeBefore % 7 != 0)) && (timeBefore != 28)) {
                game.setCurrentElementIndex(0)
                game.setCards(shuffle(game.getCards()))
            }

            game.updateTimer()
            game.updateSeason()

            // Check if we're out of elements or time_left is zero
            if (game.getCurrentElementIndex() >= elements.length) {
                endGame = true
                game.endGame('Out of elements')
            } else if (game.time_left <= 0) {
                endGame = true
                game.endGame('Time is up')
            } else {
                game.getCurrentElement().display()
                game.displayPoints()
            }
            saveGame(game)
        }
    })

    delegate(board_table, 'td', 'mouseover', (event, cell) => {
        const row = cell.parentNode.rowIndex
        const col = cell.cellIndex

        game.preview(row, col, game.getCurrentElement().getElement())
    })
}

