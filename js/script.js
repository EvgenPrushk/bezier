// конкатинирует возможности canvas и обеспечивает базовую анимацию
const app = new Application({
  el: "canvas",
  background: "#d2d2d2",
});

const bezier = new Bezier({
  step: 0.01,
  // showCtrlLines: false,
  nodes: [
    new Point(50, 100),
    new Point(150, 150),
    new Point(250, 300),
    new Point(400, 250),
  ],
  colors: ["green", "blue", "pink"],
  animation: true,
});

// если в localStorage  имеется предыдущее состояние, то
// то мы ее достаем и распарсим
if (localStorage.getItem("__bezier__")) {
  const params = JSON.parse(localStorage.getItem("__bezier__"));
  if (params.camera) {
    Object.assign(app.camera, params.camera);
  }

  if (params.nodes) {
    //удаляем все точкии
    bezier.nodes = [];
    bezier.add(...params.nodes.map((node) => new Point(node.x, node.y)));
  }
  if (params.hasOwnProperty("animation")) {
    bezier.animation = params.animation;
  }
}
// каждый раз, когда у нас изменяется событие
app.subscribe(() => {
  const params = {
    animation: bezier.animation,
    camera: {
      offsetX: app.camera.offsetX,
      offsetY: app.camera.offsetY,
      scale: app.camera.scale,
    },
    // запоминаем x and y  каждой точки
    nodes: bezier.nodes.map((node) => ({ x: node.x, y: node.y })),
  };
  localStorage.setItem("__bezier__", JSON.stringify(params));
});

// контейнер который создает экземпляр класса Bezier
app.add(bezier);
guiInit();

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
    app.camera.offsetX += app.mouse.dX;
    app.camera.offsetY += app.mouse.dY;
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

function guiInit() {
  const gui = new dat.GUI();

  const controller = gui.addFolder("Controller");
  controller.add(bezier, "animation").listen();
  controller.open();

  const cameraFolder = gui.addFolder("Camera");
  cameraFolder.add(app.camera, "offsetX").listen();
  cameraFolder.add(app.camera, "offsetY").listen();
  cameraFolder.open();

  bezier.nodes.forEach((node, i) => {
    const Folder = gui.addFolder(`Nodes ${i}`);
    Folder.add(node, "x").listen();
    Folder.add(node, "y").listen();
    Folder.open();
  });
}
