function calcLaborPension(salary, selfPct = 6, taxRatePct = 12, years = 25) {
  const cappedSalary = Math.min(150000, Math.max(29500, Number(salary) || 29500));
  const pct = Math.min(6, Math.max(0, Number(selfPct) || 0)) / 100;
  const taxRate = Math.max(0, Number(taxRatePct) || 0) / 100;
  const yrs = Math.max(1, Math.min(45, Number(years) || 25));

  const monthlyEmployer = Math.round(cappedSalary * 0.06);
  const monthlySelf = Math.round(cappedSalary * pct);
  const monthlyTotal = monthlyEmployer + monthlySelf;
  const annualTaxSaved = Math.round(monthlySelf * 12 * taxRate);

  // Compound at 4% annual return
  const r = 0.04 / 12;
  const n = yrs * 12;
  const retireTotal = Math.round(monthlyTotal * ((Math.pow(1 + r, n) - 1) / r));
  return { cappedSalary, monthlySelf, monthlyTotal, annualTaxSaved, retireTotal };
}
if (typeof document !== "undefined") {
  const ids = ["salaryInput", "selfPctSelect", "taxRateSelect", "yearsInput"];
  function render() {
    const [s, sp, tr, y] = ids.map(id => document.getElementById(id).value);
    const res = calcLaborPension(s, sp, tr, y);
    document.getElementById("monthlySelfEl").textContent = `NT$ ${res.monthlySelf.toLocaleString()} / 月`;
    document.getElementById("taxSavedEl").textContent = `NT$ ${res.annualTaxSaved.toLocaleString()} / 年`;
    document.getElementById("totalDepositEl").textContent = `NT$ ${res.monthlyTotal.toLocaleString()} / 月`;
    document.getElementById("retireTotalEl").textContent = `約 ${(res.retireTotal / 10000).toFixed(1)} 萬元`;
  }
  ids.forEach(id => document.getElementById(id).addEventListener("input", render));
  render();
}
if (typeof module !== "undefined" && module.exports) module.exports = { calcLaborPension };
