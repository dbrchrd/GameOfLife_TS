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
