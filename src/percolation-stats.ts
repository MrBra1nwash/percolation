import { Percolation } from "./percolation";
import { getRandomInt } from "./utils";

export class PercolationStats  {
    constructor(n: number, trials: number) {
      const thresholdList: number[] = [];
      for (let i = 0; i < trials; i++) {
        const percolation: Percolation = new Percolation(n);
  
        while (!percolation.percolates()) {
          const row = getRandomInt(1, n);
          const col = getRandomInt(1, n);
          percolation.open(row, col);
        }
        // Save number of opened sites on every trial when the system percolates
        thresholdList[i] = percolation.numberOfOpenSites() / (n * n);
      }
  
      this.showResult(thresholdList);
    }
  
    showResult(thresholdList: number[]) {
      const sum = thresholdList.reduce((acc, cur) => acc += cur, 0);
      console.log((sum / thresholdList.length).toString());
    }
  }