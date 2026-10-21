const myFunctions = require("./sample-functions.js");

describe("div", () => {
  test("divides evenly", () => {
    expect(myFunctions.div(10, 2)).toBe(5);
  });

  test("divides with a fractional result", () => {
    expect(myFunctions.div(1, 4)).toBe(0.25);
  });

  test("repeating decimals compare approximately", () => {
    expect(myFunctions.div(1, 3)).toBeCloseTo(0.3333, 4);
  });

  test("negative numerator", () => {
    expect(myFunctions.div(-9, 3)).toBe(-3);
  });

  test("negative denominator", () => {
    expect(myFunctions.div(9, -3)).toBe(-3);
  });

  test("two negatives give a positive", () => {
    expect(myFunctions.div(-8, -2)).toBe(4);
  });

  test("zero numerator", () => {
    expect(myFunctions.div(0, 5)).toBe(0);
  });

  test("dividing by zero gives Infinity", () => {
    expect(myFunctions.div(5, 0)).toBe(Infinity);
  });

  test("dividing a negative by zero gives -Infinity", () => {
    expect(myFunctions.div(-5, 0)).toBe(-Infinity);
  });

  test("0 / 0 is NaN", () => {
    expect(myFunctions.div(0, 0)).toBeNaN();
  });

  test("dividing by 1 returns the same number", () => {
    expect(myFunctions.div(7.5, 1)).toBe(7.5);
  });
});

describe("containsNumbers", () => {
  test("string with a digit", () => {
    expect(myFunctions.containsNumbers("abc1")).toBe(true);
  });

  test("digit at the start", () => {
    expect(myFunctions.containsNumbers("1abc")).toBe(true);
  });

  test("digit in the middle", () => {
    expect(myFunctions.containsNumbers("ab3cd")).toBe(true);
  });

  test("only digits", () => {
    expect(myFunctions.containsNumbers("12345")).toBe(true);
  });

  test("letters only", () => {
    expect(myFunctions.containsNumbers("hello")).toBe(false);
  });

  test("empty string", () => {
    expect(myFunctions.containsNumbers("")).toBe(false);
  });

  test("punctuation only", () => {
    expect(myFunctions.containsNumbers("!?.,")).toBe(false);
  });

  test("zero counts as a number", () => {
    expect(myFunctions.containsNumbers("a0")).toBe(true);
  });

  /*
   * BUG FOUND in containsNumbers: the implementation uses
   * !isNaN(text.charAt(i)). isNaN() coerces its argument with Number(), and
   * Number(" ") is 0, so a whitespace character is treated as a digit.
   * Any string containing a space, tab or newline therefore returns true
   * even when it has no digits. The three tests below expect the correct
   * answer (false) and FAIL against the current implementation, which is
   * how the test suite catches the bug.
   */
  test("BUG: a string with a space but no digits should be false", () => {
    expect(myFunctions.containsNumbers("hello world")).toBe(false);
  });

  test("BUG: a single space should be false", () => {
    expect(myFunctions.containsNumbers(" ")).toBe(false);
  });

  test("BUG: tabs and newlines should be false", () => {
    expect(myFunctions.containsNumbers("a\tb\nc")).toBe(false);
  });
});
