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

  test("a sale subtracts shares from a symbol", () => {
    portfolio.buy("GME", 5);
    portfolio.sell("GME", 2);
    expect(portfolio.holdings()).toEqual({ GME: 3 });
  });

  test("a sale does not affect other symbols", () => {
    portfolio.buy("GME", 5);
    portfolio.buy("RBLX", 10);
    portfolio.sell("RBLX", 4);
    expect(portfolio.holdings()).toEqual({ GME: 5, RBLX: 6 });
  });

  test("counts unique ticker symbols, not shares", () => {
    portfolio.buy("GME", 5);
    portfolio.buy("RBLX", 10);
    expect(portfolio.symbolCount()).toBe(2);
  });

  test("counts zero symbols for an empty portfolio", () => {
    expect(portfolio.symbolCount()).toBe(0);
  });

  test("buying more of a symbol does not change the symbol count", () => {
    portfolio.buy("GME", 5);
    portfolio.buy("GME", 5);
    expect(portfolio.symbolCount()).toBe(1);
  });

  test("selling all shares removes the symbol", () => {
    portfolio.buy("GME", 5);
    portfolio.sell("GME", 5);
    expect(portfolio.holdings()).toEqual({});
    expect(portfolio.symbolCount()).toBe(0);
  });

  test("portfolio is empty after selling everything it owned", () => {
    portfolio.buy("GME", 5);
    portfolio.sell("GME", 5);
    expect(portfolio.isEmpty()).toBe(true);
  });

  test("answers how many shares exist for a symbol", () => {
    portfolio.buy("GME", 5);
    portfolio.buy("RBLX", 10);
    expect(portfolio.sharesOf("RBLX")).toBe(10);
  });

  test("answers zero for a symbol that is not in the portfolio", () => {
    expect(portfolio.sharesOf("AAPL")).toBe(0);
  });

  test("answers zero for a symbol whose shares were all sold", () => {
    portfolio.buy("GME", 5);
    portfolio.sell("GME", 5);
    expect(portfolio.sharesOf("GME")).toBe(0);
  });

  test("selling more shares than owned throws an error", () => {
    portfolio.buy("GME", 5);
    expect(() => portfolio.sell("GME", 6)).toThrow(
      "Not possible to sell this number of shares."
    );
  });

  test("selling a symbol that is not owned throws an error", () => {
    expect(() => portfolio.sell("AAPL", 1)).toThrow(
      "Not possible to sell this number of shares."
    );
  });

  test("a failed sale leaves the portfolio unchanged", () => {
    portfolio.buy("GME", 5);
    expect(() => portfolio.sell("GME", 6)).toThrow();
    expect(portfolio.holdings()).toEqual({ GME: 5 });
  });

  test("selling exactly the shares owned is allowed", () => {
    portfolio.buy("GME", 5);
    expect(() => portfolio.sell("GME", 5)).not.toThrow();
  });
});

/*
 * Reflection on TDD
 *
 * Yes, I followed the test-first approach for all eight increments. For each
 * one I wrote the failing test first, ran Jest to watch it fail (red), wrote
 * only enough production code to make it pass (green), and committed before
 * moving on, so the git history shows the cycle increment by increment. The
 * "minimum real code" rule was the hardest part to stick to: it was tempting
 * to write sell() with the zero-share removal and the error check from the
 * start, but holding back meant each rule (2.6, 2.8) only appeared once a
 * test demanded it. The refactor step at the end let me clean up sell() and
 * pull the error message into a constant with the tests as a safety net.
 * My opinion is that TDD felt slow at first, but it kept each change small,
 * caught mistakes immediately (for example, an unowned symbol in sell() gave
 * NaN until a test forced me to handle it), and left me with a test suite I
 * trust. I would use it for logic-heavy code like this, though I would
 * probably relax it for throwaway or UI-heavy code.
 */
