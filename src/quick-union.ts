export class WeightedQuickUnionPathCompressionUF {
  sites: number[] = [];
  size: number[] = []; // This array to track length of the trees to avoid union longer tree in shorter. size[i] = number of sites in subtree rooted at i

  constructor(n: number) {
    for (let i = 0; i < n; i++) {
      this.sites[i] = i;
      this.size[i] = i;
    }
  }

  connected(a: number, b: number) {
    return this.findRoot(a) === this.findRoot(b);
  }

  union(a: number, b: number) {
    const rootA = this.findRoot(a);
    const rootB = this.findRoot(b);
    if (rootA === rootB) {
      return;
    }
    if (this.size[rootA] < this.size[rootB]) {
      this.sites[rootA] = rootB;
      this.size[rootB] += this.size[rootA];
    } else {
      this.sites[rootB] = rootA;
      this.size[rootA] += this.size[rootB];
    }
  }

  findRoot(p: number) {
    while (p !== this.sites[p]) {
      this.sites[p] = this.sites[this.sites[p]];
      p = this.sites[p]
    }
    return p;
  }
}