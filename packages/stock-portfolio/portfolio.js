class Portfolio {
  constructor() {
    this.shares = new Map();
  }

  buy(symbol, shares) {
    this.shares.set(symbol, (this.shares.get(symbol) || 0) + shares);
  }

  isEmpty() {
    return this.shares.size === 0;
  }

  holdings() {
    return Object.fromEntries(this.shares);
  }
}

module.exports = Portfolio;
