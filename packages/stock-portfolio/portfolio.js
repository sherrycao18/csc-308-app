class Portfolio {
  constructor() {
    this.shares = new Map();
  }

  holdings() {
    return Object.fromEntries(this.shares);
  }
}

module.exports = Portfolio;
