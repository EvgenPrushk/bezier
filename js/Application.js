class Application {
    constructor (params) {
       this.canvas = new Canvas({
                el: "canvas",
                width: 500,
                height: 500,
                background: '#d2d2d2',
            });

            this.pTimestamp = 0;
            // в э  том массиве будут храниться элементы, которые мы хотим отрисовывать
            this.container = [];
            this.tickHandlers = [];
            // регистрирует вызов функции
            requestAnimationFrame((x) => this.tick(x));
    }
    // метод, который обнавляет наш экран( очистка, проход по всему контейнеру и отрисовка)
// timestamp - время жизни страницы
    tick (timestamp) {
        requestAnimationFrame((x) => this.tick(x));
        const diff = timestamp - this.pTimestamp;
        const secondPart = 1000 / diff;
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
        this.canvas.clear();
        
        for (const item of this.container) {
            item.draw(this.canvas);
        }
    }
}