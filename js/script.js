// конкатинирует возможности canvas и обеспечивает базовую анимацию
const app = new Application({
    el: "canvas",
    width: 500,
    height: 500,
    background: '#d2d2d2',
})

const bezier =   new Bezier({
    step: 0.01,
    nodes: [
        {x: 100, y: 100},
        {x: 400, y: 200},
        {x: 100, y: 400},
        {x: 400, y: 400},
        {x: 100, y: 250},
    ],
})

let pointUnderMouse = null;
// контейнер который создает экземпляр класса Bezier
app.container.push(bezier);

app.tickHandlers.push(({ fps }) => {
    if (app.mouse.over && app.mouse.click) {
        pointUnderMouse = bezier.getPointUnder(app.mouse.x, app.mouse.y);
    }
    // если мышка не над canvas или мы отпустили клавишу 
    if (!app.mouse.left) {
        pointUnderMouse = null;
    }
    // если есть такая точка 
    if (pointUnderMouse && app.mouse.over) {
        pointUnderMouse.x = app.mouse.x;
        pointUnderMouse.y = app.mouse.y;
    }
})