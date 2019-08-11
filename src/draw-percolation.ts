import { Percolation } from "./percolation";
import { getRandomInt } from "./utils";

export class DrawPercolation {
  private n: number;
  private percolation: Percolation;
  private context: CanvasRenderingContext2D;
  private siteSize: number;
  private delay: number;
  private stop = false;

  constructor(n: number, delay: number) {
    this.n = n;
    this.delay = delay;
    this.init();
  }

  break() {
    this.stop = true;
  }
  
  private async init() {
    this.percolation = new Percolation(this.n);
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const width = canvas.width;
    this.context = canvas.getContext('2d');
    this.siteSize = width / this.n;
    // fill black color on init
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, width, width);
    // add border
    this.context.strokeStyle = '#D3B486';
    this.context.strokeRect(0, 0, width, width);

    while (!this.percolation.percolates() && !this.stop) {
      const row = getRandomInt(1, this.n);
      const col = getRandomInt(1, this.n);
      const [openedRow, openedCol] = this.percolation.open(row, col);
      // Fill opened site with white color
      this.context.fillStyle = 'white';
      const y = (openedRow - 1) * this.siteSize;
      const x = (openedCol - 1) * this.siteSize;
      this.context.fillRect(x, y, this.siteSize, this.siteSize);
      this.context.strokeStyle = 'black';
      this.context.strokeRect(x, y, this.siteSize, this.siteSize);
      // Find and mark full sites after each iteration
      this.markFullSites();
      if (this.delay) {
        await this.timer(this.delay);
      }
    }
    this.showResults();
  }

  // Color all sites connected to top in blue color
  private async markFullSites() {
    for (let row = 1; row < this.n + 1; row++) {
      for (let col = 1; col < this.n + 1; col++) {
        if (this.percolation.isFull(row, col)) {
          this.context.fillStyle = '#5894FB'
          const y = (row - 1) * this.siteSize;
          const x = (col - 1) * this.siteSize;
          this.context.fillRect(x, y, this.siteSize, this.siteSize);
        }
      }
    }
  }

  private showResults() {
    const container = document.getElementById('result');
    const percent = this.percolation.getNumberOfOpenSites() * 100 / (this.n * this.n);
    container.innerText = `Percent of opened sites is ${percent.toFixed(4)}%`;
  }

  // This function allows adding delays wherever you want
  private timer(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
