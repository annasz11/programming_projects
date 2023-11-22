class Game {
    constructor(elements, mountains, missions) {
        this.board = this.createBoard(mountains)

        // Create and shuffle the element cards
        this.elements = elements
        this.cards = this.createGameElements(elements)
        this.cards = shuffle(this.cards)

        // Create and shuffle mission cards
        this.missions = missions
        this.mission_cards = this.createMissionCards(missions)

        // Set the init values and display
        this.setUp()
        this.displayBaseSetUp()
    }

    setUp() {
        this.time_left = 28
        this.springPoints = 0
        this.summerPoints = 0
        this.fallPoints = 0
        this.winterPoints = 0

        this.erdoSzelePoints = 0
        this.almosVolgyPoints = 0
        this.krumpliOntozesPoints = 0
        this.hatarVidekPoints = 0

        this.totalPoints = 0

        this.currentElementIndex = 0
    }

    displayBaseSetUp() {
        this.board.display()
        this.getCurrentElement().display()
        document.getElementById('left-from-season').innerText = `Évszakból hátralevő idő: 7/7`
        document.getElementById('current-season').innerText = `Jelenlegi évszak: Tavasz`
        this.displayPoints()
        this.updateTimer()
        this.updateSeason()

        this.displayThisSeasonPoints()
    }

    createBoard(mountains) {
        return new MainBoard(11, 11, mountains)
    }

    createGameElements(elements) {
        let cards = []
        for (const elem of elements) {
            const element = new GameElement(elem)
            cards.push(element)
        }
        return cards
    }

    createMissionCards(missions) {
        let letters = ['A', 'B', 'C', 'D']
        let allMissions = [...missions.basic, ...missions.extra]
        let selectedMissions = shuffle(allMissions).slice(0, 4)

        let mission_cards = []
        for (const mission of selectedMissions) {
            let mission_card = ''
            switch (mission.title) {
                case ("Az erdő széle"):
                    mission_card = new MissionErdoSzele(this.board)
                    break
                case ("Álmos-völgy"):
                    mission_card = new MissionAlmosVolgy(this.board)
                    break
                case ("Krumpliöntözés"):
                    mission_card = new MissionKrumpliOntozes(this.board)
                    break
                case ("Határvidék"):
                    mission_card = new MissionHatarvidek(this.board)
                    break
                case ("Fasor"):
                    mission_card = new MissionFasor(this.board)
                    break
                case ("Gazdag város"):
                    mission_card = new MissionGazdagVaros(this.board)
                    break
                case ("Öntözőcsatorna"):
                    mission_card = new MissionOntozoCsatorna(this.board)
                    break
                case ("Mágusok völgye"):
                    mission_card = new MissionMagusokVolgye(this.board)
                    break
                case ("Üres telek"):
                    mission_card = new MissionUresTelek(this.board)
                    break
                case ("Sorház"):
                    mission_card = new MissionSorhaz(this.board)
                    break
                case ("Páratlan silók"):
                    mission_card = new MissionParatlanSilok(this.board)
                    break
                case ("Gazdag vidék"):
                    mission_card = new MissionGazdagVidek(this.board)
                    break
            }
            mission_cards.push(mission_card)
        }
        const mission_div = document.querySelector(`#missions`)
        mission_div.innerHTML = ''
        for (let i = 0; i < 4; i++) {
            mission_cards[i].display(letters[i])
        }
        return mission_cards
    }

    getCurrentElementIndex() {
        return this.currentElementIndex
    }

    setCurrentElementIndex(i) {
        this.currentElementIndex = i
    }

    incrementCurrentElementIndex() {
        this.currentElementIndex++
    }

    getCards() {
        return this.cards
    }

    setCards(newCards) {
        this.cards = newCards
    }

    getCurrentElement() {
        let currentElement = this.cards[this.currentElementIndex]
        let card = new ElementBoard(3, 3, currentElement)
        return card
    }

    getCurrentSeasonName() {
        let season = ''
        switch (true) {
            case (this.time_left > 21):
                season = 'Tavasz'
                break
            case (this.time_left > 14):
                season = 'Nyár'
                break
            case (this.time_left > 7):
                season = 'Ősz'
                break
            default:
                season = 'Tél'
                break
        }
        return season
    }

    getCurrentSeasonClass() {
        return seasonNameToLower(this.getCurrentSeasonName())
    }

    getSeasonMissions() {
        let season = this.getCurrentSeasonName()
        switch (season) {
            case ('Tavasz'):
                return 'AB'
            case ('Nyár'):
                return 'BC'
            case ('Ősz'):
                return 'CD'
            case ('Tél'):
                return 'DA'
        }
    }

    updateSeason() {
        document.getElementById('current-season').innerText = `Jelenlegi évszak: ${this.getCurrentSeasonName()} (${this.getSeasonMissions()})`
    }

    updateTimer() {
        let daysLeft = this.time_left % 7 === 0 ? 7 : this.time_left % 7
        if (this.time_left <= 0) {
            daysLeft = 0
        }
        document.getElementById('left-from-season').innerText = `Évszakból hátralevő idő: ${daysLeft}/7`
    }

    getPointsFromMission(missionType) {
        let mission
        switch (missionType) {
            case ('Az erdő széle'):
                mission = new MissionErdoSzele(this.board)
                break
            case ('Álmos-völgy'):
                mission = new MissionAlmosVolgy(this.board)
                break
            case ('Krumpliöntözés'):
                mission = new MissionKrumpliOntozes(this.board)
                break
            case ('Határvidék'):
                mission = new MissionHatarvidek(this.board)
                break
            case ("Fasor"):
                mission = new MissionFasor(this.board)
                break
            case ("Gazdag város"):
                mission = new MissionGazdagVaros(this.board)
                break
            case ("Öntözőcsatorna"):
                mission = new MissionOntozoCsatorna(this.board)
                break
            case ("Mágusok völgye"):
                mission = new MissionMagusokVolgye(this.board)
                break
            case ("Üres telek"):
                mission = new MissionUresTelek(this.board)
                break
            case ("Sorház"):
                mission = new MissionSorhaz(this.board)
                break
            case ("Páratlan silók"):
                mission = new MissionParatlanSilok(this.board)
                break
            case ("Gazdag vidék"):
                mission = new MissionGazdagVidek(this.board)
                break
            case ('Hegybekertítés'):
                mission = new MissionHegybekerites(this.board)
                break
        }
        return mission.getPoints()
    }

    calculateSeasonPoints(season) {
        let seasonPoints = 0
        switch (season) {
            case ('Tavasz'):
                seasonPoints = this.getPointsFromMission(this.mission_cards[0].name) + this.getPointsFromMission(this.mission_cards[1].name)
                this.springPoints = seasonPoints
                return seasonPoints
            case ('Nyár'):
                seasonPoints = this.getPointsFromMission(this.mission_cards[1].name) + this.getPointsFromMission(this.mission_cards[2].name)
                this.summerPoints = seasonPoints
                return seasonPoints
            case ('Ősz'):
                seasonPoints = this.getPointsFromMission(this.mission_cards[2].name) + this.getPointsFromMission(this.mission_cards[3].name)
                this.fallPoints = seasonPoints
                return seasonPoints
            case ('Tél'):
                seasonPoints = this.getPointsFromMission(this.mission_cards[3].name) + this.getPointsFromMission(this.mission_cards[0].name)
                this.winterPoints = seasonPoints
                return seasonPoints
        }
    }

    displaySeasonPoints() {
        const seasonDoc = document.querySelector(`.${this.getCurrentSeasonClass()}`)
        const seasonPointsDoc = seasonDoc.querySelector(`.season-points`)
        seasonPointsDoc.innerHTML = this.calculateSeasonPoints(this.getCurrentSeasonName()) + ' pont'
    }

    displayThisSeasonPoints() {
        const spring = document.querySelector(`.spring`)
        const summer = document.querySelector(`.summer`)
        const fall = document.querySelector(`.fall`)
        const winter = document.querySelector(`.winter`)
        const seasonPointsSpring = spring.querySelector(`.season-points`)
        seasonPointsSpring.innerHTML = this.springPoints +' pont'
        const seasonPointsSummer = summer.querySelector(`.season-points`)
        seasonPointsSummer.innerHTML = this.summerPoints + ' pont'
        const seasonPointsFall = fall.querySelector(`.season-points`)
        seasonPointsFall.innerHTML = this.fallPoints + ' pont'
        const seasonPointsWinter = winter.querySelector(`.season-points`)
        seasonPointsWinter.innerHTML = this.winterPoints + ' pont'
    }

    calculateAndDisplayMissionPoints() {
        let missionDocs = document.querySelectorAll(`.mission`)
        for (let missionDoc of missionDocs) {
            let missionspointsDoc = missionDoc.querySelector(`.mission-points`)
            missionspointsDoc.innerHTML = '(0 pont)'
        }

        const season = this.getCurrentSeasonName()
        let mission1 = ''
        let mission2 = ''
        let pointsFromMission1 = 0
        let pointsFromMission2 = 0
        switch (season) {
            case ('Tavasz'):
                mission1 = this.mission_cards[0].name
                mission2 = this.mission_cards[1].name
                break
            case ('Nyár'):
                mission1 = this.mission_cards[1].name
                mission2 = this.mission_cards[2].name
                break
            case ('Ősz'):
                mission1 = this.mission_cards[2].name
                mission2 = this.mission_cards[3].name
                break
            case ('Tél'):
                mission1 = this.mission_cards[3].name
                mission2 = this.mission_cards[0].name
                break
        }

        pointsFromMission1 = this.getPointsFromMission(mission1)
        pointsFromMission2 = this.getPointsFromMission(mission2)

        mission1 = missionNameToLower(mission1)
        mission2 = missionNameToLower(mission2)

        const mission1Doc = document.querySelector(`.${mission1}-mission`)
        const mission2Doc = document.querySelector(`.${mission2}-mission`)

        const mission1pointsDoc = mission1Doc.querySelector(`.mission-points`)
        const mission2pointsDoc = mission2Doc.querySelector(`.mission-points`)

        mission1pointsDoc.innerHTML = '(' + pointsFromMission1 + ' pont)'
        mission2pointsDoc.innerHTML = '(' + pointsFromMission2 + ' pont)'
    }

    displayTotalScore() {
        let mountainPoints = this.getPointsFromMission('Hegybekertítés')

        const totalScore = document.querySelector(`#total-score`)
        this.totalPoints = this.springPoints + this.summerPoints + this.fallPoints + this.winterPoints + mountainPoints
        totalScore.innerHTML = 'Összesen: ' + this.totalPoints + ' pont'
    }

    displayPoints() {
        this.calculateAndDisplayMissionPoints()
        this.displaySeasonPoints()
        this.displayTotalScore()
    }

    endGame(string) {
        // Make sure that the document is rendered before ending the game with the alert
        setTimeout(() => {
            alert(`${string}, game over!`)
        }, 0)

        const table = document.getElementById("board-table")
        const newTable = table.cloneNode(true)
        table.parentNode.replaceChild(newTable, table)

        const restartButton = document.getElementById("restart-button")
        restartButton.disabled = false
    }

    restart() {
        // Create a new board
        this.board = new MainBoard(11, 11, mountains)

        // Reset the game
        this.setUp()

        // Shuffle cards again
        this.cards = shuffle(this.cards)

        // Recreate mission cards
        this.mission_cards = this.createMissionCards(missions)

        this.displayBaseSetUp()
    }

    preview(row, col, currentElement) {
        const previewBoard = new MainBoard(11, 11, this.board.getMountains())
        // Copy the state from the main board to the preview board
        for (let i = 0; i < this.board.getRows(); i++) {
            for (let j = 0; j < this.board.getColumns(); j++) {
                previewBoard.matrix[i][j] = this.board.getValue(i, j)
            }
        }

        previewBoard.placeElement(currentElement, [row, col], true)
        previewBoard.display()
    }

    toJSON() {
        let game_cards = []
        for (let a of this.cards) {
            game_cards.push(a.toJSON())
        }

        let game_missions = []
        for (let a of this.mission_cards) {
            game_missions.push(a.toJSON())
        }

        return JSON.stringify({
            board: this.board.toJSON(),
            mountains: this.board.mountains,
            elements: this.elements,
            missions: this.missions,
            cards: game_cards,
            mission_cards: game_missions,
            time_left: this.time_left,
            springPoints: this.springPoints,
            summerPoints: this.summerPoints,
            fallPoints: this.fallPoints,
            winterPoints: this.winterPoints,
            erdoSzelePoints: this.erdoSzelePoints,
            almosVolgyPoints: this.almosVolgyPoints,
            krumpliOntozesPoints: this.krumpliOntozesPoints,
            hatarVidekPoints: this.hatarVidekPoints,
            totalPoints: this.totalPoints,
            currentElementIndex: this.currentElementIndex
        })
    }

    static fromJSON(json) {
        const data = JSON.parse(json)
        const game = new Game(data.elements, data.mountains, data.missions)

        let game_cards = []
        for (let a of data.cards) {
            game_cards.push(GameElement.fromJSON(a))
        }

        let game_missions = []
        for (let a of data.mission_cards) {
            game_missions.push(Mission.fromJSON(a))
        }
        let letters = ['A', 'B', 'C', 'D']
        const mission_div = document.querySelector(`#missions`)
        mission_div.innerHTML = ''
        for (let i = 0; i < 4; i++) {
            game_missions[i].display(letters[i])
        }

        game.board = Board.fromJSON(data.board)
        game.cards = game_cards
        game.mission_cards = game_missions
        game.time_left = data.time_left
        game.springPoints = data.springPoints
        game.summerPoints = data.summerPoints
        game.fallPoints = data.fallPoints
        game.winterPoints = data.winterPoints
        game.erdoSzelePoints = data.erdoSzelePoints
        game.almosVolgyPoints = data.almosVolgyPoints
        game.krumpliOntozesPoints = data.krumpliOntozesPoints
        game.hatarVidekPoints = data.hatarVidekPoints
        game.totalPoints = data.totalPoints
        game.currentElementIndex = data.currentElementIndex
        return game
    }
}
