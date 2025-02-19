type Point2D = {
  x: number;
  y: number;
};

export const drawLineBetweenTwoPoints = () => {
  var xy1: Point2D = {
    x: Math.floor(Math.random() * 200 + 1),
    y: Math.floor(Math.random() * 200 + 1),
  };

  var xy2: Point2D = {
    x: Math.floor(Math.random() * 200 + 1),
    y: Math.floor(Math.random() * 200 + 1),
  };

  var dotA = document.getElementById("dotA");

  if (!dotA) {
    return;
  }

  dotA.style.left = xy1.x - 5 + "px";
  dotA.style.top = xy1.y - 5 + "px";

  var dotB = document.getElementById("dotB");

  if (!dotB) {
    return;
  }

  dotB.style.left = xy2.x - 5 + "px";
  dotB.style.top = xy2.y - 5 + "px";

  var line = document.getElementById("line");

  if (!line) {
    return;
  }

  var distance = Math.hypot(xy2.x - xy1.x, xy2.y - xy1.y);

  line.style.width = distance + "px";
  line.style.left = xy1.x + "px";
  line.style.top = xy1.y + "px";

  var angle = ((Math.atan2(xy1.x - xy2.x, xy2.y - xy1.y) + Math.PI / 2.0) * 180) / Math.PI;
  line.style.transform = "rotate(" + angle + "deg)";
  line.style.display = "block";
};
