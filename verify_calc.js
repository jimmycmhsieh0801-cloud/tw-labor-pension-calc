const assert = require("assert");
const { calcLaborPension } = require("./app.js");
// 150,000 * 6% = 9,000/月 -> 12% 稅率年省 12,960
const r = calcLaborPension(200000, 6, 12, 20);
assert.strictEqual(r.cappedSalary, 150000);
assert.strictEqual(r.monthlySelf, 9000);
assert.strictEqual(r.annualTaxSaved, 12960);
console.log("LABOR_PENSION_TESTS_PASSED");
