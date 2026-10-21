class Portfolio {
  constructor() {
    this.shares = new Map();
  }

  isEmpty() {
    return this.shares.size === 0;
  }

  holdings() {
    return Object.fromEntries(this.shares);
  }
}

module.exports = Portfolio;
