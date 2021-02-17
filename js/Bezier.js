class Bezier {
    constructor(params) {
        this.nodes = [];
        this.step = params.step;

        this.add(...params.nodes);
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
                const b = C(n, k) * t ** k * (1 - t) ** (n - k)
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

    // соберем все узлы в один массив, когда не понятно, как работает оператор
    add(...nodes) {
        // пробежимся по всем узлам
        for (const node of nodes) {
            if (!this.nodes.includes(node)) {
                // если узел не добавлен, то мы его добавляем
                this.nodes.push(node);
            }
        }
    }

    draw(canvas) {
        for (const node of this.nodes) {
            canvas.drawCircle({
                x: node.x,
                y: node.y,
                r: 5,
                fillStyle: "red",
            });
        }
        // -1 вычитаем, чтобы не взять пару для последней точки. и строим лини между точками
        for (let i = 0; i < this.nodes.length - 1; i++) {
            canvas.drawLine({
                x1: this.nodes[i].x,
                y1: this.nodes[i].y,
                x2: this.nodes[i + 1].x,
                y2: this.nodes[i + 1].y,
                strokeStyle: 'red',
                lineWidth: 1.4,

            });

        }
        const curve = Bezier.getCurve(this.nodes, this.step);

        for (let i = 0; i < curve.length - 1; i++) {
            canvas.drawLine({
                x1: curve[i].x,
                y1: curve[i].y,
                x2: curve[i + 1].x,
                y2: curve[i + 1].y,
                strokeStyle: 'black',
                lineWidth: 1,

            });
        }
    }

    // возвращаем  точку(узел) по ее координате
    getPointUnder (x, y) {
        for (const node of this.nodes) {
            // получаем растояние 
            const dist = getDist(x, y, node.x, node.y);
            if (dist <= 5) {
                return node;
            }
        }


    }
}