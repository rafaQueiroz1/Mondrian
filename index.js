const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = 13; // Reduced the line width for better visibility

canvas.addEventListener("click", onRectangleClick);

const rectangles = [];

let splitDirectionVertical = true;

function createRectangle(x, y, width, height, color) {
  rectangles.push({ x, y, width, height, color });
}

function drawRectangles() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  rectangles.forEach((rectangle) => {
    context.fillStyle = rectangle.color
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.closePath();
    context.fill()
    context.stroke();
  });
}

function onRectangleClick(e) {
  const clickedIndex = rectangles.findIndex((rectangle) => {
    return (
      e.clientX > rectangle.x &&
      e.clientX < rectangle.x + rectangle.width &&
      e.clientY > rectangle.y &&
      e.clientY < rectangle.y + rectangle.height
    );
  });

  if (clickedIndex !== -1) {
    const clickedRectangle = rectangles[clickedIndex];
    rectangles.splice(clickedIndex, 1);

    splitRectangleAt(clickedRectangle, {
      x: e.clientX - clickedRectangle.x,
      y: e.clientY - clickedRectangle.y,
    });
  }
}

function splitRectangleAt(rectangle, position) {
  if (splitDirectionVertical) {
    rectangles.push({
      x: rectangle.x,
      y: rectangle.y,
      width: position.x,
      height: rectangle.height,
      color: getColor()
    });
    rectangles.push({
      x: rectangle.x + position.x,
      y: rectangle.y,
      width: rectangle.width - position.x,
      height: rectangle.height,
      color: getColor()
    });
  } else {
    rectangles.push({
      x: rectangle.x,
      y: rectangle.y,
      width: rectangle.width,
      height: position.y,
      color: getColor()
    });
    rectangles.push({
      x: rectangle.x,
      y: rectangle.y + position.y,
      width: rectangle.width,
      height: rectangle.height - position.y,
      color: getColor()
    });
  }

  splitDirectionVertical = !splitDirectionVertical;
  drawRectangles();
}

function getColor() {
  const colors = [
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#EBEBED",
    "#C53632",
    "#3E4984",
    "#F8DD67",
  ];

return colors[Math.floor(Math.random() * colors.length)];
}
createRectangle(0, 0, window.innerWidth, window.innerHeight, "#EBEBED");
drawRectangles();
