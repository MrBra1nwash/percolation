import { PercolationStats } from "./percolation-stats";
import { DrawPercolation } from "./draw-percolation";

const runBtn = document.getElementById('run');
const delayEl = <HTMLInputElement>document.getElementById('delay');
const sizeEl = <HTMLInputElement>document.getElementById('size');
const trialsEl = <HTMLInputElement>document.getElementById('trials');
const checkboxEl = <HTMLInputElement>document.getElementById('visualFlag');

let drawPerlocation: DrawPercolation;

function run() {
  if (drawPerlocation) {
    drawPerlocation.break();
    drawPerlocation = undefined; 
  }
  const min = 1;
  const max = 1000;
  const n = parseInt(sizeEl.value);
  const trials = parseInt(trialsEl.value);
  const isVisual = checkboxEl.checked;
  if (isVisual) {
    if (n >= min && n <= max) {
      const delay = parseInt(delayEl.value) > 0 ? parseInt(delayEl.value) : 0;
      drawPerlocation = new DrawPercolation(n, delay);
    } else {
      alert(`The value should be equal or more than ${min} and less or equal than ${max}`)
    }
  } else {
    if (parseInt(trialsEl.value) > 0 && n > 0) {
      return new PercolationStats(n, trials);
    }
  }
}

function checkboxHandler() {
  delayEl.classList.toggle('d-none');
}

runBtn.addEventListener('click', run);
checkboxEl.addEventListener('change', checkboxHandler);