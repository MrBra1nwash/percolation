import { Percolation } from "./percolation";
import { getRandomInt } from "./utils";

export class PercolationStats  {
  private n: number;
  private trials: number;

  constructor(n: number, trials: number) {
    this.n = n;
    this.trials = trials;
    const thresholdList: number[] = [];
    for (let i = 0; i < this.trials; i++) {
      const percolation: Percolation = new Percolation(this.n);

      while (!percolation.percolates()) {
        const row = getRandomInt(1, this.n);
        const col = getRandomInt(1, this.n);
        percolation.open(row, col);
      }
      // Save number of opened sites on every trial when the system percolates
      thresholdList[i] = percolation.getNumberOfOpenSites() / (this.n * this.n);
    }

    this.showResult(thresholdList);
  }

  private showResult(thresholdList: number[]) {
    const percent = thresholdList.reduce((acc, cur) => acc += cur, 0) * 100 / (thresholdList.length);
    const container = document.getElementById('result');
    container.innerText = `Average percent of opened sites after ${this.trials} trials is ${percent.toFixed(4)}%`;
  }
}