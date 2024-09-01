const colorPicker = document.getElementById("colorPicker");
const eraser = document.getElementById("eraser");
const sketchPad = document.querySelector(".sketchPad");
const clear = document.getElementById("clear");
let sketchDivs = document.querySelectorAll(".sketchDivs");
sketchPad.setAttribute("draggable", "false");

// function to create Squares
function createSquares() {
  let nofSquares = parseInt(prompt("How Much Square's Do you want each Side?"));
  const size = 100 / nofSquares;
  for (let i = 0; i < nofSquares * nofSquares; i++) {
    const squares = document.createElement("div");
    squares.classList.add("sketchDivs");
    squares.style.width = `${size}%`;
    squares.setAttribute("draggable", "false");
    sketchPad.appendChild(squares);
  }
}

// This Starts this Program for the First Time!
createSquares();
runPaint();

// logic for drawing and Erasing
function runPaint() {
  sketchDivs = document.querySelectorAll(".sketchDivs");
  let drawing = false;
  let erasing = false;
  let coloring = false;
  let color = colorPicker.value;

  colorPicker.addEventListener("click", () => {
    coloring = true;
    erasing = false;
  });

  eraser.addEventListener("click", () => {
    coloring = false;
    erasing = true;
  });

  const startDraw = () => {
    drawing = true;
  };
  const stopDraw = () => {
    drawing = false;
  };
  const draw = (e) => {
    if (!drawing) return;
    if (erasing) color = "lightgray";
    if (coloring) color = document.getElementById("colorPicker").value;
    e.target.style.backgroundColor = color;
    e.target.setAttribute("draggable", "false");
  };

  sketchDivs.forEach((element) => {
    element.addEventListener("mousedown", startDraw);
    element.addEventListener("mouseup", stopDraw);
    element.addEventListener("mousemove", draw);
  });
}

// logic for clearing
clear.onclick = () => {
  sketchDivs.forEach((element) => {
    element.remove();
  });
  createSquares();
  runPaint();
};
