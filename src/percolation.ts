import { WeightedQuickUnionPathCompressionUF } from "./quick-union";
import { getRandomInt } from "./utils";

export class Percolation {
  private uf: WeightedQuickUnionPathCompressionUF;
  private opened: boolean[] = [];
  private openedCount = 0;
  private n: number;
  private size: number;
  private topVertex: number;
  private bottomVertex: number;

  // creates n-by-n grid, with all sites initially blocked
  constructor(n: number) {
    this.n = n;
    // Add two virtual sites for top and bottom for easier check if system percolates: e.g. is top vertex connected to bottom
    this.size = this.n * this.n + 2;
    this.uf = new WeightedQuickUnionPathCompressionUF(this.size);
    for (let i = 0; i < this.size; i++) {
      this.opened[i] = false;
    }

    // Open two virtual vertexes
    this.topVertex = 0;
    this.bottomVertex = this.opened.length - 1;
    this.opened[this.topVertex] = true;
    this.opened[this.bottomVertex] = true;
  }

  // opens the site (row, col) if it is not open already
  open(row: number, col: number): number[] {
    if (this.isOpen(row, col)) {
      const r = getRandomInt(1, this.n);
      const c = getRandomInt(1, this.n);
      return this.open(r, c);
    }
    else { 
      const index = this.getIndex(row, col);
      if (row === 1) { // connect with top virtual vertex
        this.uf.union(index, this.topVertex);
      }
      if (row === this.n) { //  connect with bottom virtual vertex
        this.uf.union(index, this.bottomVertex);
      }
      
      this.opened[index] = true;
      this.openedCount++;
      // Get opened neighbors
      const openedNeighbors = this.getNeighborsIndexes(row, col).filter(i => this.opened[i]);
      // Connect current site with opened neighbors
      openedNeighbors.forEach(site => this.uf.union(index, site));
      return [row, col];
    }
  }
 
  // is the site (row, col) into the tree that percolates?
  isFull(row: number, col: number): boolean {
    const index = this.getIndex(row, col);
    return this.uf.connected(index, this.topVertex);
  }

  // returns the number of open sites
  getNumberOfOpenSites(): number {
    return this.openedCount;
  }

  // does the system percolate?
  percolates(): boolean {
    return this.uf.connected(this.topVertex, this.bottomVertex);
  }

  // The site can have min 2 and max 4 neighbors
  private getNeighborsIndexes(row: number, col: number): number[] {
    const size = this.n * this.n;
    // First condition for every element in the array to skip side points
    return [
      row > 1 && this.getIndex(row - 1, col), // top
      row < this.n && this.getIndex(row + 1, col), // bottom
      col > 1 && this.getIndex(row, col - 1), // left
      col < this.n && this.getIndex(row, col + 1) // right
    ].filter(v => v > 0 && v <= size);
  }

  private getIndex(row: number, col: number): number {
    return this.n * (row - 1) + col;
  }

  // is the site (row, col) open?
  private isOpen(row: number, col: number): boolean {
    return this.opened[this.getIndex(row, col)];
  }
}