const test = require("node:test");
const assert = require("node:assert");

test("calculateEmi matches real 1Fi app figure for 3-month tenure", async () => {
  const { calculateEmi } = await import("./emiCalculator.js");
  const emi = calculateEmi(125900, 10, 3);
  assert.ok(Math.abs(emi - 42668) < 50, `Expected ~42668, got ${emi}`);
});

test("calculateEmi matches real 1Fi app figure for 6-month tenure", async () => {
  const { calculateEmi } = await import("./emiCalculator.js");
  const emi = calculateEmi(125900, 10, 6);
  assert.ok(Math.abs(emi - 21600) < 100, `Expected ~21600, got ${emi}`);
});

test("calculateEmi with 0% rate divides principal evenly across tenure", async () => {
  const { calculateEmi } = await import("./emiCalculator.js");
  const emi = calculateEmi(12000, 0, 12);
  assert.strictEqual(emi, 1000);
});

test("buildEmiPlans returns plans sorted ascending by tenure", async () => {
  const { buildEmiPlans } = await import("./emiCalculator.js");
  const plans = buildEmiPlans(100000, [
    { months: 12, ratePct: 12 },
    { months: 3, ratePct: 10 },
  ]);
  assert.strictEqual(plans[0].months, 3);
  assert.strictEqual(plans[1].months, 12);
});

test("calculateEmi never returns a negative or zero amount for valid input", async () => {
  const { calculateEmi } = await import("./emiCalculator.js");
  const emi = calculateEmi(50000, 11, 9);
  assert.ok(emi > 0);
});
