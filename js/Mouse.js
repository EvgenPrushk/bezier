class Mouse {
    constructor(el) {
        // координат
        this.x = 0,
        this.y = 0;
        //смещение мыши 
        this.dx = 0;
        this.dy = 0;

        this.left = false;
        this.pLeft = false;
        // находиться ли мышка над элементов
        this.over = false;
        this.el = el;

       this.el.addEventListener("mouseenter", (e) => this.mouseenterHadler(e));
       this.el.addEventListener("mouseout", (e) => this.mouseoutHadler(e));
       this.el.addEventListener("mousemove", (e) => this.mousemoveHadler(e));

       this.el.addEventListener("mousedown", (e) => this.mousedownHadler(e));
       this.el.addEventListener("mouseup", (e) => this.mouseupHadler(e));
    }

    mouseenterHadler (event) {
        this.over = true;
    }

    mouseoutHadler (event) {
        this.over = false;
    }

    mousemoveHadler (event) {
        // положение относительно левого угла страницы
        const rect = this.el.getBoundingClientRect();
        // находим координаты х и на canvas
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log(x, y);
    }

    mousedownHadler (event) {
        console.log(event);
    }

    mouseupHadler (event) {
    console.log(event);        
    }
}