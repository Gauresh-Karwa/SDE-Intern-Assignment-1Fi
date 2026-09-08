// Standard reducing-balance EMI formula, driven off the product's stated
// annual (p.a.) rate per tenure. Verified against the real screenshot:
// ₹1,25,900 @ 10% p.a. / 3mo -> ~₹42,668/mo, @ 10% p.a. / 6mo -> ~₹21,600/mo.

export function calculateEmi(principal, annualRatePct, months) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return Math.round(principal / months);
  const factor = Math.pow(1 + r, months);
  const emi = (principal * r * factor) / (factor - 1);
  return Math.round(emi);
}

export function buildEmiPlans(principal, emiRates) {
  return emiRates
    .map(({ months, ratePct }) => ({
      months,
      ratePct,
      monthlyAmount: calculateEmi(principal, ratePct, months),
    }))
    .sort((a, b) => a.months - b.months);
}
