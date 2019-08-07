import { Percolation } from "./percolation";
import { getRandomInt } from "./utils";

export class DrawPercolation {
  constructor(n: number) {
    const percolation: Percolation = new Percolation(n);
    
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const siteSize = Math.floor(width / n);
    context.fillStyle = 'black';
    
    while (!percolation.percolates()) {
      const row = getRandomInt(1, n);
      const col = getRandomInt(1, n);
      percolation.open(row, col);
    }
  }
  
}
