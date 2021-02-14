const canvas = new Canvas({
    el: "canvas",
    width: 500,
    height: 500,
    background: '#d2d2d2',
});
// используем наследование от класса Bezier
const bezier = new Bezier({
    // шаг 
    step: 0.01,
    nodes: [
        {x: 100, y: 100},
        {x: 400, y: 200},
        {x: 100, y: 400},
        {x: 400, y: 400},
    ],
});

bezier.draw(canvas);


console.log(bezier);