import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { InfoTooltip } from "./InfoTooltip";
import type { SalaryInputs } from "@/lib/salary-calculator";
import PayMatrixSelector from "@/components/PayMatrixSelector";

interface CalculatorFormProps {
  inputs: SalaryInputs;
  onChange: (newInputs: SalaryInputs) => void;
}

export function CalculatorForm({ inputs, onChange }: CalculatorFormProps) {
  if (!inputs) return null;

  const handleInputChange = (field: keyof SalaryInputs, value: any) => {
    onChange({ ...inputs, [field]: value });
  };

  const handleAddAllowance = () => {
    const updatedAllowances = [
      ...(inputs.otherAllowances || []),
      { name: "", amount: 0 },
    ];
    onChange({ ...inputs, otherAllowances: updatedAllowances });
  };

  const handleRemoveAllowance = (index: number) => {
    const updatedAllowances = (inputs.otherAllowances || []).filter(
      (_, i) => i !== index
    );
    onChange({ ...inputs, otherAllowances: updatedAllowances });
  };

  const handleAllowanceChange = (
    index: number,
    field: "name" | "amount",
    value: string
  ) => {
    const updatedAllowances = [...(inputs.otherAllowances || [])];
    updatedAllowances[index] = {
      ...updatedAllowances[index],
      [field]: field === "amount" ? Number(value) : value,
    };
    onChange({ ...inputs, otherAllowances: updatedAllowances });
  };

  return (
    <Card className="p-6 shadow-sm border border-gray-200 rounded-xl bg-white">
      {/* Header */}
      <h2 className="text-lg font-semibold text-center py-2 mb-4 rounded-md bg-[#EEF2FF] text-indigo-800 tracking-wide shadow-sm">
        Salary Details
      </h2>
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-indigo-500 to-red-400 rounded-full mb-4"></div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Pay Level & Basic Pay */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label>Pay Level & Basic Pay</Label>
            <InfoTooltip content="Pay Level indicates your position in the 7th CPC Pay Matrix based on your post or grade, while Basic Pay is the fixed amount assigned to that level and its corresponding cell." />
          </div>
          <PayMatrixSelector
  selectedLevel={inputs.payLevelLabel}
  selectedBasic={inputs.basicPay}
  onSelect={(levelLabel, basic) => {
    const numericLevel = levelLabel.match(/\d+/)?.[0] || inputs.payLevel;

    // ✅ If a new Pay Level is selected, reset Basic Pay
    if (levelLabel !== inputs.payLevelLabel) {
      onChange({
        ...inputs,
        payLevel: numericLevel,
        payLevelLabel: levelLabel,
        basicPay: 0, // reset instead of auto-selecting lowest
      });
    } else {
      // ✅ If only Basic Pay changes, update it normally
      onChange({
        ...inputs,
        basicPay: basic,
      });
    }
  }}
/>

        </div>

        {/* City Category (HRA Class) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="cityCategory">City Category</Label>
            <InfoTooltip content="City Category determines your House Rent Allowance (HRA) rate — X for metros, Y for medium cities, and Z for smaller towns, based on population." />
          </div>
          <Select
            id="cityCategory"
            value={inputs.hraClass || ""}
            onChange={(e) => handleInputChange("hraClass", e.target.value)}
            options={[
              { value: "", label: "Select City for HRA" }, // ✅ default placeholder
              { value: "X", label: "X Class Cities (30% HRA)" },
              { value: "Y", label: "Y Class Cities (20% HRA)" },
              { value: "Z", label: "Z Class Cities (10% HRA)" },
              { value: "Other", label: "Other Cities (10% HRA)" },
            ]}
          />
        </div>

        {/* TA City Type */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="taCityType">Select the type of your City for TA</Label>
            <InfoTooltip content="City Type for TA decides your Transport Allowance based on posting location — higher rates for metro cities, lower for others, and none if not eligible." />
          </div>
          <Select
            id="taCityType"
            value={inputs.taCityType || ""}
            onChange={(e) => handleInputChange("taCityType", e.target.value)}
            options={[
              { value: "", label: "Select City for TA" }, // ✅ placeholder option
              { value: "none", label: "No TA" },
              { value: "higher", label: "Highest TPTA Cities" },
              { value: "other", label: "Other Cities" },
            ]}
          />
        </div>

        {/* DA Percentage */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="da">DA Percentage (%)</Label>
            <InfoTooltip content="Dearness Allowance (DA) is a cost-of-living adjustment added to your pay and is revised periodically by the government to offset inflation." />
          </div>
          <Select
            id="da"
            value={String(inputs.daPercentage)}
            onChange={(e) =>
              handleInputChange("daPercentage", parseInt(e.target.value))
            }
            options={[
              { value: "58", label: "58% Current (From July 2025)" },
              { value: "55", label: "55% Old (Before July 2025)" },
            ]}
          />
        </div>

        {/* Other Allowances */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-700">
            Other Allowances / Incomes (if any)
          </h3>

          {(inputs.otherAllowances || []).map((allowance, index) => (
  <div
    key={index}
    className="flex flex-wrap items-center gap-2 sm:gap-3 w-full"
  >
    {/* Allowance Name */}
    <div className="flex-1 min-w-[140px]">
  <label htmlFor={`allowance-name-${index}`} className="sr-only">
    Allowance Name {index + 1}
  </label>
  <input
    id={`allowance-name-${index}`}
    type="text"
    value={allowance.name}
    onChange={(e) => handleAllowanceChange(index, "name", e.target.value)}
    placeholder={`Allowance Name ${index + 1}`}
    className="w-full p-2 text-sm border rounded-md"
  />
</div>
<div className="w-28 sm:w-32">
  <label htmlFor={`allowance-amount-${index}`} className="sr-only">
    Allowance Amount {index + 1}
  </label>
  <input
    id={`allowance-amount-${index}`}
    type="number"
    value={allowance.amount === 0 ? "" : allowance.amount}
    onChange={(e) => handleAllowanceChange(index, "amount", e.target.value)}
    placeholder="Amount (₹)"
    className="w-full p-2 text-sm border rounded-md text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  />
</div>


    {/* Remove Button */}
    <button
      type="button"
      onClick={() => handleRemoveAllowance(index)}
      className="text-red-500 hover:text-red-700 text-sm font-medium px-2"
    >
      ✕ Remove
    </button>
  </div>
))}


          {/* Buttons Row */}
<div className="mt-4 flex justify-between items-center border-t pt-4">
  {/* Left side — Add Allowance */}
  <button
    type="button"
    onClick={handleAddAllowance}
    className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
  >
    + Add Allowance
  </button>

  {/* Right side — Reset Data */}
<button
  type="button"
  onClick={() => {
    localStorage.removeItem("salary-calculator-inputs-v2");
    onChange({
      payLevel: "",
      payLevelLabel: "",
      basicPay: 0,
      hraClass: "",
      taCityType: "",
      daPercentage: 58,
      otherAllowances: [],
      otherDeductions: [],
    });
  }}
  className="px-3 py-1.5 bg-orange-400 text-white text-sm rounded-md hover:bg-orange-600 transition"
>
  🧹 Reset Data
</button>

</div>

        </div>
      </div>
    </Card>
  );
}
