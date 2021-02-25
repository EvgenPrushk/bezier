class Mouse {
  constructor(el) {
    // координат
    (this.x = 0), (this.y = 0);
    // координаты x and y перед тиком
    this.pX = 0;
    this.pY = 0;
    // говорят о том на сколько между тиками была смещена мышка
    this.dX = 0;
    this.dY = 0;
    //
    this.delta = 0;
    this.pDelta = 0;
    this.cDelta = 0;

    // нажатие кнопок мыши
    this.left = false;
    this.pLeft = false;
    // находиться ли мышка над элементов
    this.over = false;
    this.el = el;
    this.click = false;
    this.firstTick = true;

    this.el.addEventListener("mouseenter", (e) => this.mouseenterHadler(e));
    this.el.addEventListener("mouseout", (e) => this.mouseoutHadler(e));
    this.el.addEventListener("mousemove", (e) => this.mousemoveHadler(e));

    this.el.addEventListener("mousedown", (e) => this.mousedownHadler(e));
    this.el.addEventListener("mouseup", (e) => this.mouseupHadler(e));
    this.el.addEventListener("wheel", (e) => this.wheelHadler(e));
  }

  tick() {
    this.click = !this.pLeft && this.left;
    this.pLeft = this.left;

    this.dX = this.x - this.pX;
    this.dY = this.y - this.pY;

    this.pX = this.x;
    this.pY = this.y;
    // вычисляем разницу во время тика
    this.delta = this.cDelta - this.pDelta;
    this.pDelta = this.cDelta;
    
  }

  mouseenterHadler(event) {
    this.over = true;

    if (this.firstTick) {
        this.dX = 0;
        this.dY = 0;
  
        this.x = event.clientX;
        this.y = event.clientY;
  
        this.pX = event.clientX;
        this.pY = event.clientY;
        
      }
    this.firstTick = false;
  }

  mouseoutHadler(event) {
    this.over = false;
    this.firstTick = false;
  }

  mousemoveHadler(event) {
    // положение относительно левого угла страницы
    const rect = this.el.getBoundingClientRect();
    // находим координаты х и на canvas
    this.x = event.clientX - rect.left;
    this.y = event.clientY - rect.top;
    this.firstTick = false;
  }

  mousedownHadler(event) {
    if (event.button === 0) {
      this.left = true;
    }
    
  }

  mouseupHadler(event) {
    if (event.button === 0) {
      this.left = false;
    }
  }

  wheelHadler(event) {
    this.cDelta += event.deltaY / 53;
  }
}
