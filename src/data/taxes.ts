interface TaxBracket {
  single: number;
  married: number;
  rate: number;
}

// 2024 Federal Tax Brackets
export const federalTaxBrackets: TaxBracket[] = [
  { single: 11600, married: 23200, rate: 0.10 },
  { single: 47150, married: 94300, rate: 0.12 },
  { single: 100525, married: 201050, rate: 0.22 },
  { single: 191950, married: 383900, rate: 0.24 },
  { single: 243725, married: 487450, rate: 0.32 },
  { single: 609350, married: 731200, rate: 0.35 },
  { single: Infinity, married: Infinity, rate: 0.37 }
];

export function calculateTax(salary: number, isMarried: boolean): number {
  let remainingSalary = salary;
  let totalTax = 0;
  let previousBracket = 0;

  for (const bracket of federalTaxBrackets) {
    const limit = isMarried ? bracket.married : bracket.single;
    const taxableInThisBracket = Math.min(remainingSalary, limit - previousBracket);
    
    if (taxableInThisBracket <= 0) break;
    
    totalTax += taxableInThisBracket * bracket.rate;
    remainingSalary -= taxableInThisBracket;
    previousBracket = limit;
  }

  // Add estimated state tax (simplified approximation)
  const stateTaxRate = 0.06; // 6% average state tax
  const stateTax = salary * stateTaxRate;

  // Add FICA taxes (7.65% for Social Security and Medicare combined)
  const ficaTax = Math.min(salary * 0.0765, 147000 * 0.0765);

  return totalTax + stateTax + ficaTax;
}