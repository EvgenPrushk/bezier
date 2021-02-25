class Application extends Observer {
  constructor(params) {
    super();

    this.canvas = new Canvas({
      el: "canvas",
      width: 500,
      height: 500,
      background: "#d2d2d2",
    });
    // создаем экземпляр класса Mouse
    this.mouse = new Mouse(this.canvas.el);
    // сборщик информации о том маштабе и сдвеге в canvas
    this.camera = new Camera();
    // подписываемся на изменение камеры
    this.camera.subscribe(() => this.dispatch());

    this.pTimestamp = 0;
    // в э  том массиве будут храниться элементы, которые мы хотим отрисовывать
    this.container = [];
    this.tickHandlers = [];
    this.firstTick = true;

    //изменяем размер экрана
    this.resize();
    window.addEventListener("resize", () => this.resize());
    // регистрирует вызов функции
    requestAnimationFrame((x) => this.tick(x));
  }

  add(...items) {
    for (const item of items) {
      if ( !this.container.includes(item)) {
        this.container.push(item);
        // пренадлежит ли Observer
        if (item instanceof Observer) {
          // вызываем метод dispatch()
          item.subscribe(() => this.dispatch());
        }
      }
    }
  }
  // метод, который обнавляет наш экран( очистка, проход по всему контейнеру и отрисовка)
  // timestamp - время жизни страницы
  tick(timestamp) {
    requestAnimationFrame((x) => this.tick(x));
    // если у нас было смещение мыши

    // делаем так, что точко под мышкой сохранилась относительно обсолютного нуля
    // проверка находиться ли мышка над canvas
    if (this.mouse.over && this.mouse.delta) {
      // находим положение мыши относительно обсолютных координат
      const x = (app.mouse.x - app.camera.offsetX) / app.camera.scale;
      const y = (app.mouse.y - app.camera.offsetY) / app.camera.scale;

      this.camera.scale += this.mouse.delta * this.camera.scaleStep;
      this.camera.scale = Math.max(0.4, this.camera.scale);

      // вытаскиваем обратно offset
      app.camera.offsetX = -x * app.camera.scale + app.mouse.x;
      app.camera.offsetY = -y * app.camera.scale + app.mouse.y;
    } else {
      this.camera.scale += this.mouse.delta * this.camera.scaleStep;
    }

    const diff = timestamp - this.pTimestamp;
    const secondPart = diff / 1000;
    const fps = 1000 / diff;

    this.pTimestamp = timestamp;

    //  проходимся по всем функциям и вызываем их
    for (const tickHandler of this.tickHandlers) {
      tickHandler({
        timestamp,
        diff,
        secondPart,
        fps,
      });
    }
    // вызываем tick у всех элементов в container
    for (const item of this.container) {
      item.tick({
        timestamp,
        diff,
        secondPart,
        fps,
      });
    }
    this.canvas.clear();

    // метод для рисования сетки
    this.canvas.drawGrid({
      // гарантируем, что (0, 0) не дальше размера ячейки
      offsetX: this.camera.offsetX % (75 * this.camera.scale),
      offsetY: this.camera.offsetY % (75 * this.camera.scale),
      cellSize: 75 * this.camera.scale,
      lineWidth: 0.5,
      strokeStyle: "green",
    });

    this.canvas.save();
    this.canvas.translate(this.camera.offsetX, this.camera.offsetY);

    this.canvas.scale(this.camera.scale);

    for (const item of this.container) {
      item.draw(this.canvas);
    }

    this.canvas.restore();

    this.mouse.tick();
  }
  // изменяет рамзмер canvas. запрашиваем у el canvas
  resize() {
    this.canvas.el.width = window.innerWidth;
    this.canvas.el.height = window.innerHeight;
  }
}
