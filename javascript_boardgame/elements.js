class GameElement {
    constructor(data) {
        this.time = data.time
        this.type = data.type
        this.shape = data.shape
        this.rotation = data.rotation || 0 // Default value is 0 if not provided
        this.mirrored = data.mirrored || false // Default value is false if not provided
    }

    getTime() {
        return this.time
    }

    getType() {
        return this.type
    }

    getShape() {
        return this.shape
    }

    setShape(new_shape) {
        this.shape = new_shape
    }

    getRotation() {
        return this.rotation
    }

    setRotation(new_rotation) {
        this.rotation = new_rotation
    }

    getMirrored() {
        return this.mirrored
    }

    setMirrored(new_mirrored) {
        this.mirrored = new_mirrored
    }

    // rotate clockwise by 90 degrees = transpose matrix and take columns in reversed order
    rotate() {
        let shape_transposed = transposeMatrix(this.shape)
        let shape_reversed = reverseColumns(shape_transposed)
        this.shape = shape_reversed
        this.rotation = 1
    }

    mirror() {
        this.shape = this.shape.map(row => row.reverse())
        this.mirrored = 1
    }

    toJSON() {
        return JSON.stringify({
            time: this.time,
            type: this.type,
            shape: this.shape,
            rotation: this.rotation,
            mirrored: this.mirrored
        })
    }

    static fromJSON(json) {
        const data = JSON.parse(json)
        const element = new GameElement(data)

        return element
    }
}
