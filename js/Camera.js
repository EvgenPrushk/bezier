class Camera extends Observer {
  #offsetX;
  #offsetY;
  #scale;
  constructor() {
    super();

    this.#offsetX = 0;
    this.#offsetY = 0;

    this.#scale = 1;
    //маштаб маштаба
    this.scaleStep = -0.1;
  }

  get offsetX() {
    return this.#offsetX;
  }

  set offsetX(value) {
    this.#offsetX = value;
    this.dispatch();
    return value;
  }

  get offsetY() {
    return this.#offsetY;
  }

  set offsetY(value) {
    this.#offsetY = value;
    this.dispatch();
    return value;
  }

  get scale() {
    return this.#scale;
  }

  set scale(value) {
    this.#scale = value;
    this.dispatch();
    return value;
  }
}
