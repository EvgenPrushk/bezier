class Canvas {
  constructor(param) {
    // мы ищем экземляр класса и запонимаем в поле экземпляра класса
    this.el = document.querySelector(param.el);
    this.el.width = param.width;
    this.el.height = param.height;
    this.background = param.background;
    this.context = this.el.getContext("2d");

    this.clear();
  }

  clear() {
    const { context } = this;

    context.beginPath();
    context.fillStyle = this.background;
    context.rect(0, 0, this.el.width, this.el.height);
    context.fill();
  }

  drawCircle(param) {
    const { context } = this;

    context.beginPath();
    context.arc(param.x, param.y, param.r, 0, 2 * Math.PI);

    if (param.fillStyle) {
      context.fillStyle = param.fillStyle;
      context.fill();
    }

    if (param.strokeStyle) {
      context.strokeStyle = param.strokeStyle;
      context.stroke();
    }
  }

  drawLine(param) {
    const { context } = this;
    // рисование  прямой линии
    context.beginPath();
    context.moveTo(param.x1, param.y1);
    context.lineTo(param.x2, param.y2);
    // передается толщина линии
    context.lineWidth = param.lineWidth ?? 1;

    // цвет линии
    if (param.strokeStyle) {
      context.strokeStyle = param.strokeStyle;
      context.stroke();
    }
  }

  drawGrid(param) {
    this.context.strokeStyle = param.strokeStyle;
    this.context.lineWidth = param.lineWidth;
    // рисуем горизонтальные линии
    for (let i = 0; i < this.el.width / param.cellSize; i++) {
      this.context.beginPath();
      this.context.moveTo(param.offsetX + i * param.cellSize, 0);

      this.context.lineTo(param.offsetX + i * param.cellSize, this.el.height);
      this.context.stroke();
    }
    // рисуем вертикальные линии линии
    for (let i = 0; i < this.el.height / param.cellSize; i++) {
      this.context.beginPath();
      this.context.moveTo(0, param.offsetY + i * param.cellSize);

      this.context.lineTo(this.el.width, param.offsetY + i * param.cellSize);
      this.context.stroke();
    }
  }

  save() {
    this.context.save();
  }

  restore() {
    this.context.restore();
  }

  translate(x, y) {
    this.context.translate(x, y);
  }

  scale(s) {
    this.context.scale(s, s);
  }
}
