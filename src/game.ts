const canvas = <HTMLCanvasElement>document.querySelector("canvas#game");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
const generation_display = <HTMLSpanElement>(
  document.querySelector("span.generation")
);

let grid: number[][];
let next_grid: number[][];
let cols: number;
let rows: number;
let resolution: number = 2;
let interval: number = 0; //ms
let step: number = 0;
let total_count: number = 0;
let neverused_square_color: string = "#111"; // hex or rgb or color name
let dead_square_color: string = "#444"; // hex or rgb or color name
let alive_square_color: string = "#fff"; // hex or rgb or color name

const fillSquare = (i: number, j: number, color: string): void => {
  ctx.fillStyle = color;
  ctx.fillRect(i * resolution, j * resolution, resolution - 1, resolution - 1);
};

const buildMatrix = (cols: number, rows: number): number[][] => {
  let arr: number[][] = new Array(cols);

  for (let i: number = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
};

const countAdjacentsSquares = (
  grid: number[][],
  x: number,
  y: number
): number => {
  let count: number = 0;
  for (let i: number = -1; i < 2; i++) {
    for (let j: number = -1; j < 2; j++) {
      let col: number = (x + i + cols) % cols;
      let row: number = (y + j + rows) % rows;

      count += grid[col][row];
    }
  }

  count -= grid[x][y];
  return count;
};

let inte: number = 0;
const draw = (): void => {
  total_count = grid
    .reduce(function (a, b) {
      return a.concat(b);
    })
    .reduce(function (a, b) {
      return a + b;
    });

  generation_display.innerHTML = `Generation n°${step.toString()}`;

  next_grid = buildMatrix(cols, rows);

  for (let i: number = 0; i < cols; i++) {
    for (let j: number = 0; j < rows; j++) {
      let state: number = grid[i][j];

      let neighbors: number = countAdjacentsSquares(grid, i, j);

      if (state === 0 && neighbors === 3) {
        fillSquare(i, j, alive_square_color);
        next_grid[i][j] = 1;
      } else if ((state === 1 && neighbors < 2) || neighbors > 3) {
        fillSquare(i, j, dead_square_color);
        next_grid[i][j] = 0;
      } else {
        next_grid[i][j] = state;
      }
    }
  }

  if (total_count <= 0) {
    clearInterval(inte);
    generation_display.innerHTML = `Life spanned ${step.toString()} generations`;
    return;
  }

  grid = next_grid;
  step++;
};
