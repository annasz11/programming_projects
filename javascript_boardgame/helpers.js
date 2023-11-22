// Fisher–Yates shuffle algorithm
function shuffle(array) {
    let currentIndex = array.length
    let randomIndex = 0
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}

function delegate(parent, child, when, what){
    function eventHandlerFunction(event){
        let eventTarget  = event.target
        let eventHandler = this
        let closestChild = eventTarget.closest(child)

        if(eventHandler.contains(closestChild)){
            what(event, closestChild)
        }
    }

    parent.addEventListener(when, eventHandlerFunction)
}

function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))
}

function reverseColumns(matrix) {
    if (!matrix || matrix.length === 0) {
        return []
    }

    const numRows = matrix.length
    const numCols = matrix[0].length

    let reversedMatrix = []

    for (let i = 0; i < numRows; i++) {
        let reversedRow = []
        for (let j = 0; j < numCols; j++) {
            reversedRow[j] = matrix[i][numCols - 1 - j]
        }
        reversedMatrix.push(reversedRow)
    }

    return reversedMatrix
}

function missionNameToLower(missionName) {
    switch (true) {
        case (missionName === 'Az erdő széle'):
            return 'erdoSzele'
        case (missionName === 'Álmos-völgy'):
            return 'almosVolgy'
        case (missionName === 'Krumpliöntözés'):
            return 'krumpliOntozes'
        case (missionName === 'Határvidék'):
            return 'hatarVidek'
    }
    switch (missionName) {
        case ('Az erdő széle'):
            return 'erdoSzele'
        case ('Álmos-völgy'):
            return 'almosVolgy'
        case ('Krumpliöntözés'):
            return 'krumpliOntozes'
        case ('Határvidék'):
            return 'hatarVidek'
        case ("Fasor"):
            return 'fasor'
        case ("Gazdag város"):
            return 'gazdagVaros'
        case ("Öntözőcsatorna"):
            return 'ontozoCsatorna'
        case ("Mágusok völgye"):
            return 'magusokVolgye'
        case ("Üres telek"):
            return 'uresTelek'
        case ("Sorház"):
            return 'sorhaz'
        case ("Páratlan silók"):
            return 'paratlanSilok'
        case ("Gazdag vidék"):
            return 'gazdagVidek'
    }

}

function seasonNameToLower(seasonName) {
    switch (true) {
        case (seasonName === 'Tavasz'):
            return 'spring'
        case (seasonName === 'Nyár'):
            return 'summer'
        case (seasonName === 'Ősz'):
            return 'fall'
        case (seasonName === 'Tél'):
            return 'winter'
    }
}
