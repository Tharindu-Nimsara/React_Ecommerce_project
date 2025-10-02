import { expect, it, describe } from "vitest";
import formatMoney from "./money";

//we can use vitest package to make automated tests

//creating an Unit test to test 'formatMoney()' function
//we can group test using describe.
//'it()' this creates a test. string is the name of the test

describe("formatMoney", () => {
  it("formats 1999 cents as $19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });
  //expect() send the result to vitest and it will show a summary of what passed and failed.

  it("displays 2 decimals", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    expect(formatMoney(100)).toBe("$1.00");
  });
});
