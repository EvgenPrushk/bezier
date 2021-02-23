// Наследование от класса Observer
class Point extends Observer {
  #x;
  #y;
  constructor(x, y) {
    // вызов для использования возможностей родительского класса
    super();
    // используем приватные данные, к оторым нельзя обратиться из вне
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  // задаем значение x
  set x(x) {
    return (this.#x = x);
    this.dispatch();
  }

  get y() {
    return this.#y;
  }

  // задаем значение y
  set y(y) {
    return (this.#y = y);
    this.dispatch();
  }
}
