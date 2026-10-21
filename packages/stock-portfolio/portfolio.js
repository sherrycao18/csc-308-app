const OVERSELL_ERROR = "Not possible to sell this number of shares.";

class Portfolio {
  constructor() {
    this.shares = new Map();
  }

  buy(symbol, shares) {
    this.shares.set(symbol, this.sharesOf(symbol) + shares);
  }

  sell(symbol, shares) {
    const remaining = this.sharesOf(symbol) - shares;
    if (remaining < 0) {
      throw new Error(OVERSELL_ERROR);
    }
    if (remaining === 0) {
      this.shares.delete(symbol);
    } else {
      this.shares.set(symbol, remaining);
    }
  }

  sharesOf(symbol) {
    return this.shares.get(symbol) || 0;
  }

  symbolCount() {
    return this.shares.size;
  }

  isEmpty() {
    return this.shares.size === 0;
  }

  holdings() {
    return Object.fromEntries(this.shares);
  }
}

module.exports = Portfolio;
