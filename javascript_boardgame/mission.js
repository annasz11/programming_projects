class Mission {
    constructor(board) {
        this.board = board
        this.name = ''
        this.description = ''
    }

    getType() {
        return ''
    }

    getPoints() {
        return 0
    }

    display(letter) {
        const mission_div = document.querySelector(`#missions`)

        mission_div.innerHTML += `<div class="${this.getType()}-mission mission">
                                    <div class="${this.getType()}-mission-picture"></div>
                                    <div class="mission-text">
                                        <div class="mission-title-description">
                                            <div class="mission-title">${this.name}</div>
                                            <div class="mission-description">${this.description}</div>
                                        </div>
                                        <div class="mission-points-letter">
                                            <div class="mission-points">(0 pont)</div>
                                            <div class="mission-letter">${letter}</div>
                                        </div>
                                    </div>
                                </div>
                                `
    }

    toJSON() {
        return JSON.stringify({
            board: this.board.toJSON(),
            name: this.name,
            description: this.description,
            type: this.getType()
        })
    }

    static fromJSON(json) {
        const data = JSON.parse(json)
        let board = Board.fromJSON(data.board)
        let mission
        switch (data.name) {
            case ("Az erdő széle"):
                mission = new MissionErdoSzele(board)
                return mission
            case ("Álmos-völgy"):
                mission = new MissionAlmosVolgy(board)
                return mission
            case ("Krumpliöntözés"):
                mission = new MissionKrumpliOntozes(board)
                return mission
            case ("Határvidék"):
                mission = new MissionHatarvidek(board)
                return mission
            case ("Fasor"):
                mission = new MissionFasor(board)
                return mission
            case ("Gazdag város"):
                mission = new MissionGazdagVaros(board)
                return mission
            case ("Öntözőcsatorna"):
                mission = new MissionOntozoCsatorna(board)
                return mission
            case ("Mágusok völgye"):
                mission = new MissionMagusokVolgye(board)
                return mission
            case ("Üres telek"):
                mission = new MissionUresTelek(board)
                return mission
            case ("Sorház"):
                mission = new MissionSorhaz(board)
                return mission
            case ("Páratlan silók"):
                mission = new MissionParatlanSilok(board)
                return mission
            case ("Gazdag vidék"):
                mission = new MissionGazdagVidek(board)
                return mission
        }
    }
}


class MissionErdoSzele extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Az erdő széle'
        this.description = 'A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.'
    }

    getType() {
        return 'erdoSzele'
    }

    getPoints() {
        let points = 0
        for (let i = 0; i < this.board.getColumns(); i++) {
            if (this.board.getValue(0, i) === 'forest-cell') {
                points++
            }
            if (this.board.getValue(this.board.getRows() - 1, i) === 'forest-cell') {
                points++
            }
        }
        for (let j = 1; j < this.board.getRows() - 1; j++) {
            if (this.board.getValue(j, 0) === 'forest-cell') {
                points++
            }
            if (this.board.getValue(j, this.board.getColumns() - 1) === 'forest-cell') {
                points++
            }
        }
        return points
    }
}


class MissionAlmosVolgy extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Álmos-völgy'
        this.description = 'Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.'
    }

    getType() {
        return 'almosVolgy'
    }

    getPoints() {
        let points = 0
        for (let i = 0; i < this.board.getRows(); i++) {
            let noForests = 0
            for (let j = 0; j < this.board.getColumns(); j++) {
                if (this.board.getValue(i, j) === 'forest-cell') {
                    noForests++
                }
            }
            if (noForests === 3) {
                points += 4
            }
        }
        return points
    }
}


class MissionKrumpliOntozes extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Krumpliöntözés'
        this.description = 'A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.'
    }

    getType() {
        return 'krumpliOntozes'
    }

    getPoints() {
        let points = 0
        for (let i = 0; i < this.board.getRows(); i++) {
            for (let j = 0; j < this.board.getColumns(); j++) {
                if (this.board.getValue(i, j) === 'farm-cell') {
                    if (i - 1 >= 0 && this.board.getValue(i - 1, j) === 'water-cell') {
                        points += 2
                    }
                    if (i + 1 < this.board.getRows() && this.board.getValue(i + 1, j) === 'water-cell') {
                        points += 2
                    }
                    if (j - 1 >= 0 && this.board.getValue(i, j - 1) === 'water-cell') {
                        points += 2
                    }
                    if (j + 1 < this.board.getColumns() && this.board.getValue(i, j + 1) === 'water-cell') {
                        points += 2
                    }
                }
            }
        }
        return points
    }
}


class MissionHatarvidek extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Határvidék'
        this.description = 'Minden teli sorért vagy oszlopért 6-6 pontot kapsz.'
    }

    getType() {
        return 'hatarVidek'
    }

    getPoints() {
        let points = 0

        for (let i = 0; i < this.board.getRows(); i++) {
            let rowHasZero = false
            for (let j = 0; j < this.board.getColumns(); j++) {
                if (this.board.getValue(i, j) === 0) {
                    rowHasZero = true
                    break
                }
            }
            if (!rowHasZero) {
                points += 6
            }
        }

        for (let j = 0; j < this.board.getColumns(); j++) {
            let colHasZero = false
            for (let i = 0; i < this.board.getRows(); i++) {
                if (this.board.getValue(i, j) === 0) {
                    colHasZero = true
                    break
                }
            }
            if (!colHasZero) {
                points += 6
            }
        }
        return points
    }
}


class MissionFasor extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Fasor'
        this.description = 'A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.'
    }

    getType() {
        return 'fasor'
    }

    getPoints() {
        let numOfForests = 0
        let currentNumOfForests = 0

        for (let j = 0; j < this.board.getColumns(); j++) {
            currentNumOfForests = 0
            for (let i = 0; i < this.board.getRows(); i++) {
                if (this.board.getValue(i,j) === 'forest-cell') {
                    currentNumOfForests++
                    if (currentNumOfForests > numOfForests) {
                        numOfForests = currentNumOfForests
                    }
                } else {
                    currentNumOfForests = 0
                }
            }
        }
        return 2*numOfForests
    }
}


class MissionGazdagVaros extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Gazdag város'
        this.description = 'A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.'
    }

    getType() {
        return 'gazdagVaros'
    }

    getPoints() {
        let points = 0
        let diffCells = new Set([])
        for (let i = 0; i < this.board.getRows(); i++) {
            for (let j = 0; j < this.board.getColumns(); j++) {
                let diffCells = new Set([])
                if (this.board.getValue(i, j) === 'town-cell') {
                    if (i - 1 >= 0 && this.board.getValue(i - 1, j) != 0) {
                        diffCells.add(this.board.getValue(i - 1, j))
                    }
                    if (i + 1 < this.board.getRows() && this.board.getValue(i + 1, j) != 0) {
                        diffCells.add(this.board.getValue(i + 1, j))
                    }
                    if (j - 1 >= 0 && this.board.getValue(i, j - 1) != 0) {
                        diffCells.add(this.board.getValue(i, j - 1))
                    }
                    if (j + 1 < this.board.getColumns() && this.board.getValue(i, j + 1) != 0) {
                        diffCells.add(this.board.getValue(i, j + 1))
                    }
                }
                if (diffCells.size >= 3) {
                    points += 3
                }
            }
        }
        return points
    }
}


class MissionOntozoCsatorna extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Öntözőcsatorna'
        this.description = 'Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.'
    }

    getType() {
        return 'ontozoCsatorna'
    }

    getPoints() {
        let points = 0
        let numOfFarms = 0
        let numOfWaters = 0

        for (let j = 0; j < this.board.getColumns(); j++) {
            numOfFarms = 0
            numOfWaters = 0
            for (let i = 0; i < this.board.getRows(); i++) {
                if (this.board.getValue(i,j) === 'farm-cell') {
                    numOfFarms++
                } else if (this.board.getValue(i,j) === 'water-cell') {
                    numOfWaters++
                }
            }
            if (numOfFarms === numOfWaters && numOfWaters != 0) {
                points+=4
            }
        }
        return points
    }
}


class MissionMagusokVolgye extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Mágusok völgye'
        this.description = 'A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.'
    }

    getType() {
        return 'magusokVolgye'
    }

    getPoints() {
        let points = 0
        for (let i = 0; i < this.board.getRows(); i++) {
            for (let j = 0; j < this.board.getColumns(); j++) {
                if (this.board.getValue(i, j) === 'mountain-cell') {
                    if (i - 1 >= 0 && this.board.getValue(i - 1, j) === 'water-cell') {
                        points += 3
                    }
                    if (i + 1 < this.board.getRows() && this.board.getValue(i + 1, j) === 'water-cell') {
                        points += 3
                    }
                    if (j - 1 >= 0 && this.board.getValue(i, j - 1) === 'water-cell') {
                        points += 3
                    }
                    if (j + 1 < this.board.getColumns() && this.board.getValue(i, j + 1) === 'water-cell') {
                        points += 3
                    }
                }
            }
        }
        return points
    }
}


class MissionUresTelek extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Üres telek'
        this.description = 'A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.'
    }

    getType() {
        return 'uresTelek'
    }

    getPoints() {
        let points = 0
        for (let i = 0; i < this.board.getRows(); i++) {
            for (let j = 0; j < this.board.getColumns(); j++) {
                if (this.board.getValue(i, j) === 'town-cell') {
                    if (i - 1 >= 0 && this.board.getValue(i - 1, j) === 0) {
                        points += 2
                    }
                    if (i + 1 < this.board.getRows() && this.board.getValue(i + 1, j) === 0) {
                        points += 2
                    }
                    if (j - 1 >= 0 && this.board.getValue(i, j - 1) === 0) {
                        points += 2
                    }
                    if (j + 1 < this.board.getColumns() && this.board.getValue(i, j + 1) === 0) {
                        points += 2
                    }
                }
            }
        }
        return points
    }
}


class MissionSorhaz extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Sorház'
        this.description = 'A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.'
    }

    getType() {
        return 'sorhaz'
    }

    getPoints() {
        let numOfTowns = 0
        let currentNumOfTowns = 0

        for (let i = 0; i < this.board.getRows(); i++) {
            currentNumOfTowns = 0
                for (let j = 0; j < this.board.getColumns(); j++) {
                if (this.board.getValue(i,j) === 'town-cell') {
                    currentNumOfTowns++
                    if (currentNumOfTowns > numOfTowns) {
                        numOfTowns = currentNumOfTowns
                    }
                } else {
                    currentNumOfTowns = 0
                }
            }
        }
        return 2*numOfTowns
    }
}


class MissionParatlanSilok extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Páratlan silók'
        this.description = 'Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.'
    }

    getType() {
        return 'paratlanSilok'
    }

    getPoints() {
        let points = 0

        for (let j = 0; j < this.board.getColumns(); j++) {
            let colHasZero = false
            for (let i = 0; i < this.board.getRows(); i++) {
                if (this.board.getValue(i, j) === 0) {
                    colHasZero = true
                    break
                }
            }
            // Odd is now the even because indexing starts from 0
            if (!colHasZero && (j%2 === 0)) {
                points += 10
            }
        }
        return points
    }
}


class MissionGazdagVidek extends Mission {
    constructor(board) {
        super(board)
        this.name = 'Gazdag vidék'
        this.description = 'Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.'
    }

    getType() {
        return 'gazdagVidek'
    }

    getPoints() {
        let points = 0

        for (let i = 0; i < this.board.getRows(); i++) {
            let diffCells = new Set([])
            for (let j = 0; j < this.board.getColumns(); j++) {
                if (this.board.getValue(i, j) != 0) {
                    diffCells.add(this.board.getValue(i, j))
                }
            }
            if (diffCells.size >= 5) {
                points += 4
            }
        }

        return points
    }
}



class MissionHegybekerites extends Mission {
    constructor(board) {
        super(board)
    }

    getType() {
        return 'hegybekerites'
    }

    getPoints() {
        let points = 0
        for (let mountain of this.board.getMountains()) {
            if (mountain[0] != 0 && mountain[1] != 0 && mountain[0] != this.board.getRows() - 1 && mountain[1] != this.board.getColumns() - 1) {
                if (this.board.getValue(mountain[0] - 1, mountain[1]) != 0 && this.board.getValue(mountain[0] + 1, mountain[1]) != 0 && this.board.getValue(mountain[0], mountain[1] - 1) != 0 && this.board.getValue(mountain[0], mountain[1] + 1) != 0) {
                    points += 1
                }
            }
        }
        return points
    }
}
