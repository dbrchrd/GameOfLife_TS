const resolution_range = <HTMLInputElement>(
  document.querySelector("input.resolution")
);
const interval_range = <HTMLInputElement>(
  document.querySelector("input.interval")
);
const start_btn = <HTMLInputElement>document.querySelector("button.start");
const resolution_display = <HTMLDivElement>(
  document.querySelector("div.resolution")
);
const interval_display = <HTMLDivElement>document.querySelector("div.interval");

let resolutions: number[] = [2, 4, 8, 10, 20, 40, 80, 100, 200];
let intervals: number[] = [
  0, 10, 20, 50, 75, 100, 150, 300, 500, 750, 1000, 2000, 3000, 5000,
];

start_btn.onclick = () => {
  if (start_btn.innerText === "Start") start_btn.innerText = "Restart";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resolution = resolutions[parseInt(resolution_range.value)];
  interval = intervals[parseInt(interval_range.value)];
  setup(resolution, interval);
};
