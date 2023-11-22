// Base board class
class Board {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.matrix = this.createMatrix(rows, columns)
    }

    createMatrix(rows, columns) {
        let board = []
        for (let i = 0; i < rows; i++) {
            let row = []
            for (let j = 0; j < columns; j++) {
                row.push(0)
            }
            board.push(row)
        }
        return board
    }

    setValue(row, column, value) {
        if (row < this.rows && column < this.columns) {
            this.matrix[row][column] = value
        } else {
            console.error('Index out of range')
        }
    }

    getValue(row, column) {
        if (row < this.rows && column < this.columns) {
            return this.matrix[row][column]
        } else {
            console.error('Index out of range')
            return null
        }
    }

    getRows() {
        return this.rows
    }

    getColumns() {
        return this.columns
    }

    getBoardType() {
        return 'baseboard'
    }

    display() {
        const board_type = this.getBoardType()
        const boardBody = document.querySelector(`#${board_type}-body`)
        boardBody.innerHTML = ''  // Clear the existing board
    
        for (let i = 0; i < this.rows; i++) {
            const newTR = document.createElement('tr')
            for (let j = 0; j < this.columns; j++) {
                const newTD = document.createElement('td')
                const cellValue = this.matrix[i][j]

                if (cellValue !== 0) {
                    newTD.classList.add(cellValue)
                }

                newTR.appendChild(newTD)
            }
            boardBody.appendChild(newTR)
        }

        if (board_type === "element") {
            const elementTime = document.querySelector(`#element-time`)
            elementTime.innerHTML = '(' + this.time + ' időegység)'
        }
    }

    placeElement(element, starting_cell, previewOnly = false) {
        const shape = element.getShape()
        const elementType = element.getType()

        // First, check if the entire shape can be placed validly
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                let boardRow = starting_cell[0] + i
                let boardCol = starting_cell[1] + j

                // Check if board cell is outside the boundaries
                if (boardRow < 0 || boardRow >= this.rows || boardCol < 0 || boardCol >= this.columns) {
                    if (shape[i][j] != 0) {
                        if (!previewOnly) {
                            console.error('Element is outside of the board.')
                        }
                        return 0
                    }
                    continue
                }

                if (this.matrix[boardRow][boardCol] != 0 && shape[i][j] === 1) {
                    if (!previewOnly) {
                        console.error('Cannot place element due to an obstacle.')
                    }
                    return 0
                }
            }
        }

        // Now the element can be placed to the board
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                let boardRow = starting_cell[0] + i
                let boardCol = starting_cell[1] + j
                
                if (boardRow >= 0 && boardRow < this.rows && boardCol >= 0 && boardCol < this.columns) {
                    if (shape[i][j] === 1) {
                        this.matrix[boardRow][boardCol] = previewOnly ? `preview-${elementType}-cell` : `${elementType}-cell`;
                    }
                }
            }
        }
        return 1
    }

    toJSON() {
        return JSON.stringify({
            rows: this.rows,
            columns: this.columns,
            matrix: this.matrix,
            mountains: this.mountains,
            type: this.getBoardType()
        })
    }

    static fromJSON(json) {
        const data = JSON.parse(json)
        let board
        if (data.type === 'board') {
            board = new MainBoard(data.rows, data.columns, data.mountains)
        }
        board.matrix = data.matrix

        return board
    }
}


// The board of the game
class MainBoard extends Board {
    constructor(rows, columns, mountains) {
        super(rows, columns)
        this.mountains = mountains
        for (const mountain of this.mountains) {
            this.setValue(mountain[0], mountain[1], "mountain-cell")
        }
    }

    getBoardType() {
        return 'board'
    }

    getMountains() {
        return this.mountains
    }

    getPoints(mission) {
        return mission.getPoints(this)
    }
}


// The current element is also represented by a board
class ElementBoard extends Board {
    constructor(rows, columns, currentElement) {
        super(rows, columns)
        this.element = currentElement
        this.time = currentElement.getTime()
        this.placeElement(currentElement, [0,0])
        this.display()
    }

    getBoardType() {
        return 'element'
    }

    getElement() {
        return this.element
    }
}
