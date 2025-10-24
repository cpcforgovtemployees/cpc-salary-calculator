// src/lib/salary-calculator.ts
import {
  HRA_RATES,
  HRA_MINIMUM,
  NPS_EMPLOYEE_RATE,
  NPS_EMPLOYER_RATE,
  FITMENT_FACTOR_8TH,
} from "./constants";

// ------------------ Types ------------------
export interface OtherItem {
  name: string;
  amount: number;
}

export interface SalaryInputs {
  payLevel: string;
  payLevelLabel?: string;
  basicPay: number;
  hraClass: "" | "X" | "Y" | "Z" | "Other";
  taCityType?: "" | "none" | "higher" | "other";
  daPercentage: number;
  otherAllowances?: OtherItem[];
  otherDeductions?: OtherItem[];
}

export interface SalaryBreakdown {
  daPercentage?: number;
  basicPay: number;
  da: number;
  hra: number;
  ta: number;
  daOnTa: number;
  otherAllowances: OtherItem[];
  grossSalary: number;
  npsEmployee: number;
  cghs: number;
  incomeTax: number;
  otherDeductions: OtherItem[];
  totalDeductions: number;
  netSalary: number;
  npsEmployer: number;
  cpc: "7th" | "8th";
}

// ------------------ Helper ------------------
function sumItems(items?: OtherItem[]) {
  if (!Array.isArray(items) || items.length === 0) return 0;
  return Math.round(items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0));
}

// ------------------ Component Calculations ------------------
export function calculateDA(basicPay: number, daPercentage: number): number {
  if (!basicPay || !daPercentage) return 0;
  return Math.round((basicPay * daPercentage) / 100);
}

export function calculateHRA(
  basicPay: number,
  hraClass: "" | "X" | "Y" | "Z" | "Other"
): number {
  // ✅ Don't use blank key directly; handle safely
  const validClass: "X" | "Y" | "Z" | "Other" =
    hraClass === "" ? "Other" : hraClass;

  const rate = HRA_RATES[validClass] ?? 0.1;
  const calculated = Math.round(basicPay * rate);
  const minimum = HRA_MINIMUM[validClass] ?? 0;

  return Math.max(calculated, minimum);
}



export function calculateTA(
  payLevel: number | string,
  taCityType: "none" | "higher" | "other" = "other"
): number {
  const level = Number(payLevel) || 0;
  if (taCityType === "none") return 0;

  if (taCityType === "higher") {
    if (level >= 9) return 7200;
    if (level >= 3 && level <= 8) return 3600;
    return 1350;
  }

  if (taCityType === "other") {
    if (level >= 9) return 3600;
    if (level >= 3 && level <= 8) return 1800;
    return 900;
  }

  return 0;
}

export function calculateDAonTA(ta: number, daPercentage: number): number {
  if (!ta || !daPercentage) return 0;
  return Math.round((ta * daPercentage) / 100);
}

export function calculateNPSEmployee(basicPay: number, da: number): number {
  return Math.round((basicPay + da) * NPS_EMPLOYEE_RATE);
}

export function calculateNPSEmployer(basicPay: number, da: number): number {
  return Math.round((basicPay + da) * NPS_EMPLOYER_RATE);
}

export function calculateCGHSFromBasic(basicPay: number): number {
  if (!basicPay) return 0;
  if (basicPay <= 25000) return 250;
  if (basicPay <= 50000) return 450;
  if (basicPay <= 100000) return 650;
  if (basicPay <= 150000) return 1000;
  return 1250;
}

// -----------------------------
// ✅ Income Tax Calculation (FY 2025–26, New Regime)
// -----------------------------
export function calculateIncomeTax(income: number): number {
  // Step 1 – Apply ₹75,000 Standard Deduction
  income = Math.max(0, income - 75000);
  let tax = 0;

  // Step 2 – Apply New Regime Slabs
  if (income <= 400000) tax = 0;
  else if (income <= 800000) tax = (income - 400000) * 0.05;
  else if (income <= 1200000) tax = 20000 + (income - 800000) * 0.10;
  else if (income <= 1600000) tax = 60000 + (income - 1200000) * 0.15;
  else if (income <= 2000000) tax = 120000 + (income - 1600000) * 0.20;
  else if (income <= 2400000) tax = 200000 + (income - 2000000) * 0.25;
  else tax = 300000 + (income - 2400000) * 0.30;

  // Step 3 – Rebate (Section 87A) up to ₹60,000
  if (income <= 1200000) {
    tax = Math.max(0, tax - 60000);
  }

  // Step 4 – Marginal Relief (for incomes up to ₹12.75L)
  if (income > 1200000 && income <= 1275000) {
    const excess = income - 1200000;
    if (tax > excess) {
      tax = excess;
    }
  }

  // Step 5 – Add 4% Health & Education Cess
  tax *= 1.04;

  // Step 6 – Return monthly
  return Math.round(tax / 12);
}

// ------------------ 7th CPC ------------------
export function calculate7thCPC(inputs: SalaryInputs): SalaryBreakdown {
  const {
    basicPay = 0,
    hraClass = "Other",
    taCityType = "other",
    daPercentage = 0,
    payLevel = "0",
    otherAllowances = [],
    otherDeductions = [],
  } = inputs;

  const da = calculateDA(basicPay, daPercentage);
  const hra = calculateHRA(basicPay, hraClass);
  const ta = calculateTA(payLevel, taCityType as "none" | "other" | "higher" | undefined);
  const daOnTa = calculateDAonTA(ta, daPercentage);
  const otherAllowancesTotal = sumItems(otherAllowances);

  const grossSalary = Math.round(basicPay + da + hra + ta + daOnTa + otherAllowancesTotal);
  const npsEmployee = calculateNPSEmployee(basicPay, da);
  const cghs = calculateCGHSFromBasic(basicPay);
  const incomeTax = calculateIncomeTax(grossSalary * 12); // Annual → Monthly
  const otherDeductionTotal = sumItems(otherDeductions);

  const totalDeductions = Math.round(npsEmployee + cghs + incomeTax + otherDeductionTotal);
  const netSalary = Math.round(grossSalary - totalDeductions);
  const npsEmployer = calculateNPSEmployer(basicPay, da);

  return {
    basicPay,
    da,
    hra,
    ta,
    daOnTa,
    otherAllowances,
    grossSalary,
    npsEmployee,
    cghs,
    incomeTax,
    otherDeductions,
    totalDeductions,
    netSalary,
    npsEmployer,
    cpc: "7th",
  };
}

// ------------------ 8th CPC ------------------
export function calculate8thCPC(
  inputs: SalaryInputs,
  fitmentFactor: number = FITMENT_FACTOR_8TH
): SalaryBreakdown {
  const basicPay8th = Math.round(inputs.basicPay * fitmentFactor);
  const hraRates8th = { X: 0.24, Y: 0.16, Z: 0.08, Other: 0.08 };

  const validHraClass = inputs.hraClass || "Other";
const hra = Math.round(basicPay8th * (hraRates8th[validHraClass] ?? 0.08));
  const baseTa7th = calculateTA(
    inputs.payLevel || "0",
    (inputs.taCityType as "none" | "other" | "higher" | undefined) || "other"
  );
  const ta = Math.round(baseTa7th * fitmentFactor);
  const daOnTa = calculateDAonTA(ta, 0);

  const otherAllowancesTotal = sumItems(inputs.otherAllowances);
  const grossSalary = Math.round(basicPay8th + hra + ta + daOnTa + otherAllowancesTotal);
  const npsEmployee = calculateNPSEmployee(basicPay8th, 0);
  const cghs = calculateCGHSFromBasic(basicPay8th);
  const incomeTax = calculateIncomeTax(grossSalary * 12);
  const totalDeductions = Math.round(npsEmployee + cghs + incomeTax);
  const netSalary = Math.round(grossSalary - totalDeductions);
  const npsEmployer = calculateNPSEmployer(basicPay8th, 0);

  return {
    basicPay: basicPay8th,
    da: 0,
    hra,
    ta,
    daOnTa,
    otherAllowances: inputs.otherAllowances || [],
    grossSalary,
    npsEmployee,
    cghs,
    incomeTax,
    otherDeductions: inputs.otherDeductions || [],
    totalDeductions,
    netSalary,
    npsEmployer,
    daPercentage: 0,
    cpc: "8th",
  };
}

// ------------------ Formatter ------------------
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}
