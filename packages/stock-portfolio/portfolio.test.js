const Portfolio = require("./portfolio.js");

describe("Portfolio", () => {
  let portfolio;

  beforeEach(() => {
    portfolio = new Portfolio();
  });

  test("is created with no ticker symbols or shares", () => {
    expect(portfolio.holdings()).toEqual({});
  });

  test("is empty when no shares are owned", () => {
    expect(portfolio.isEmpty()).toBe(true);
  });

  test("is not empty after a purchase", () => {
    portfolio.buy("GME", 5);
    expect(portfolio.isEmpty()).toBe(false);
  });

  test("a purchase adds shares to a symbol", () => {
    portfolio.buy("GME", 5);
    expect(portfolio.holdings()).toEqual({ GME: 5 });
  });

  test("purchases of the same symbol accumulate", () => {
    portfolio.buy("GME", 5);
    portfolio.buy("GME", 3);
    expect(portfolio.holdings()).toEqual({ GME: 8 });
  });

  test("purchases of different symbols are tracked separately", () => {
    portfolio.buy("GME", 5);
    portfolio.buy("RBLX", 10);
    expect(portfolio.holdings()).toEqual({ GME: 5, RBLX: 10 });
  });
});
