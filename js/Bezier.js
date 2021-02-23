class Bezier {
  #curve;
  #newState = false;
  constructor(params) {
    this.nodes = [];

    this.#curve = [];
    this.#newState = false;
    this.step = params.step;
    // показатель контрольной точки
    this.showCtrlPoints = params.showCtrlPoints ?? true;
    // показатель контрольной линии
    this.showCtrlLines = params.showCtrlLines ?? true;
    // рисуем определенную часть от кривой Бизье от 0 до 1
    this.part = 0.25;

    this.animation = params.animation ?? false;
    this.part = 0;
    this.speed = 1 / 2;

    this.add(...params.nodes);
  }
  // добавляет точки
  add(...nodes) {
    // проходимся по всем узлам
    for (const node of nodes) {
      // если узла, нет, то добавляем его
      if (!this.nodes.includes(node)) {
        this.nodes.push(node);
        // прослушивание. При изменение координат подымаем  newState в true
        node.subscribe(() => (this.#newState = true));

        this.#newState = true;
      }
    }
  }
  // удаляет точки
  remove() {}

  get curve() {
    return JSON.parse(JSON.stringify(this.#curve));
  }
  static getCurve(nodes, step) {
    const result = [];
    // - 1 береться, чтобы попасть в последнюю точку
    const n = nodes.length - 1;

    // пробегаемся по времени
    for (let t = 0; t <= 1; t = Math.min(1, t + step)) {
      const point = {
        x: 0,
        y: 0,
      };

      // пробегаемся по всем точкам
      for (let k = 0; k <= n; k++) {
        // коэффицент
        const b = C(n, k) * t ** k * (1 - t) ** (n - k);
        // порядковый номер точки
        const node = nodes[k];

        point.x += node.x * b;
        point.y += node.y * b;
      }
      // добавляем эту точку в результирующий массив
      result.push(point);
      //проверка для выхода
      if (t === 1) {
        break;
      }
    }
    return result;
  }

  tick({ secondPart }) {
    if (this.#newState) {
      this.#curve = Bezier.getCurve(this.nodes, this.step);
    }

    if (this.animation) {
      if (this.speed > 0) {
        this.part = Math.min(1, this.part + secondPart * this.speed);
        if (bezier.part === 1) {
          this.speed *= -1;
        }
      } else {
        this.part = Math.max(0, this.part + secondPart * this.speed);
        if (this.part === 0) {
          this.speed *= -1;
        }
      }
    }
  }

  draw(canvas) {
    if (this.showCtrlPoints) {
      for (const node of this.nodes) {
        canvas.drawCircle({
          x: node.x,
          y: node.y,
          r: 5,
          fillStyle: "red",
        });
      }
    }
    if (this.showCtrlLines) {
      // -1 вычитаем, чтобы не взять пару для последней точки. и строим лини между точками
      for (let i = 0; i < this.nodes.length - 1; i++) {
        canvas.drawLine({
          x1: this.nodes[i].x,
          y1: this.nodes[i].y,
          x2: this.nodes[i + 1].x,
          y2: this.nodes[i + 1].y,
          strokeStyle: "red",
          lineWidth: 1.4,
        });
      }
    }
    // если флаг поднят, то пересчитываем curve

    const curveLength = getcurveLength(this.#curve);
    const { context } = canvas;

    // рисование вспомогательной линии

    context.beginPath();
    context.moveTo(this.#curve[0].x, this.#curve[0].y);

    for (let i = 1; i < this.#curve.length; i++) {
      context.lineTo(this.#curve[i].x, this.#curve[i].y);
    }
    context.strokeStyle = "black";
    context.lineWidth = 2;
    if (this.animation) {
      context.setLineDash([curveLength * this.part, curveLength]);
    } else {
      context.setLineDash([]);
    }
    context.stroke();
  }

  // возвращаем  точку(узел) по ее координате
  getPointUnder(x, y) {
    for (const node of this.nodes) {
      // получаем растояние
      const dist = getDist(x, y, node.x, node.y);
      if (dist <= 5) {
        return node;
      }
    }
  }
}
