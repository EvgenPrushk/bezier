class Point {
    constructor (x, y) {
        // используем приватные данные, к оторым нельзя обратиться из вне
        this.#x = x;
        this.#y = y;
    }

    get x () {
        return this.#x;
    }

    // задаем значение x
    set x (x) {
        return this.#x = x;
    }

    get y () {
        return this.#y;
    }

    // задаем значение y
    set y (y) {
        return this.#y = y;
    }
}