const Portfolio = require("./portfolio.js");

describe("Portfolio", () => {
  let portfolio;

  beforeEach(() => {
    portfolio = new Portfolio();
  });

  test("is created with no ticker symbols or shares", () => {
    expect(portfolio.holdings()).toEqual({});
  });
});
