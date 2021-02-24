// конкатинирует возможности canvas и обеспечивает базовую анимацию
const app = new Application({
  el: "canvas",
  width: 500,
  height: 500,
  background: "#d2d2d2",
});

const bezier = new Bezier({
  step: 0.01,
  // showCtrlLines: false,
  nodes: [new Point(50, 100), new Point(150, 150), new Point(250, 300), new Point(400, 250)],
  colors: ["green", "blue", "pink"],
  animation:true,
});

// контейнер который создает экземпляр класса Bezier
app.container.push(bezier);

let pointUnderMouse = null;
app.tickHandlers.push(() => {
  if (app.mouse.over && app.mouse.click && bezier.showCtrlPoints) {
    pointUnderMouse = bezier.getPointUnder(
      (app.mouse.x - app.camera.offsetX) / app.camera.scale,
      (app.mouse.y - app.camera.offsetY) / app.camera.scale
    );
  }
  // если мы точку не нашли
  if (!pointUnderMouse && app.mouse.left) {
    app.camera.offsetX += app.mouse.dx;
    app.camera.offsetY += app.mouse.dy;
  }
  // если мышка не над canvas или мы отпустили клавишу
  if (!app.mouse.left) {
    pointUnderMouse = null;
  }
  // если есть такая точка
  if (pointUnderMouse && app.mouse.over) {
    pointUnderMouse.x = (app.mouse.x - app.camera.offsetX) / app.camera.scale;
    pointUnderMouse.y = (app.mouse.y - app.camera.offsetY) / app.camera.scale;
  }
});

// app.tickHandlers.push(() => {
//   const modal = document.querySelector("#modal");

//   const table = document.createElement("table");

//   for (const node of bezier.nodes) {
//     const tr = document.createElement("tr");
//     table.append(tr);
//     tr.innerHTML = `
//     <td>${node.x}</td>
//     <td>${node.y}</td>
//     `;
//   }
//   modal.innerHTML = "";
//   modal.append(table);
// });
