// конкатинирует возможности canvas и обеспечивает базовую анимацию
const app = new Application({
    el: "canvas",
    width: 500,
    height: 500,
    background: '#d2d2d2',
})

// контейнер который создает экземпляр класса Bezier
app.container.push(
    new Bezier({
    step: 0.01,
    nodes: [
        {x: 100, y: 100},
        {x: 400, y: 200},
        {x: 100, y: 400},
        {x: 400, y: 400},
        {x: 100, y: 250},
    ],
}));

app.tickHandlers.push(({ fps }) => {
    console.log(app.mouse.x, app.mouse.y, app.mouse.over);
})