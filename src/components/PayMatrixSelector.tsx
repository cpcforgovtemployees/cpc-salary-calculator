import { useState, useMemo, useEffect } from "react";
import { PAY_LEVELS } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface PayMatrixSelectorProps {
  selectedLevel?: string; // we store label like "Level 1" here
  selectedBasic?: number;
  onSelect: (levelLabel: string, basic: number) => void;
}

export default function PayMatrixSelector({
  selectedLevel,
  selectedBasic,
  onSelect,
}: PayMatrixSelectorProps) {
  const [level, setLevel] = useState<string>(selectedLevel || "");
  const [basic, setBasic] = useState<number | "">(
    typeof selectedBasic === "number" ? selectedBasic : ""
  );

  // Sync with parent props (important for saved inputs)
  useEffect(() => {
    if (selectedLevel !== undefined) setLevel(selectedLevel);
  }, [selectedLevel]);

  useEffect(() => {
    if (selectedBasic !== undefined) setBasic(selectedBasic);
  }, [selectedBasic]);

  // List of pays for the selected level
  const payCells = useMemo(() => {
    const selected = PAY_LEVELS.find((pl) => pl.label === level);
    return selected ? selected.pays : [];
  }, [level]);

  const handleLevelChange = (value: string) => {
    setLevel(value);

    // ✅ Reset Basic Pay to "Select Basic Pay" instead of auto-selecting lowest
    if (value) {
      setBasic("");
      onSelect(value, 0); // 0 = no selection yet
    } else {
      setBasic("");
      onSelect("", 0);
    }
  };

  const handleBasicChange = (value: string) => {
    const amount = Number(value) || 0;
    setBasic(amount);
    onSelect(level, amount);
  };

  return (
    <div className="space-y-3">
      {/* Pay Level */}
      <div>
        <Label htmlFor="payLevel">Pay Level</Label>
        <Select
          id="payLevel"
          value={level}
          onChange={(e) => handleLevelChange(e.currentTarget.value)}
          className="mt-1"
          options={[
            { label: "Select Pay Level", value: "" },
            ...PAY_LEVELS.map((pl) => ({ label: pl.label, value: pl.label })),
          ]}
        />
      </div>

      {/* Basic Pay */}
      <div>
        <Label htmlFor="basicPay">Basic Pay</Label>
        <Select
          id="basicPay"
          value={basic ? String(basic) : ""}
          onChange={(e) => handleBasicChange(e.currentTarget.value)}
          className="mt-1"
          options={
            level
              ? [{ label: "Select Basic Pay", value: "" }].concat(
                  payCells.map((p) => ({
                    label: `₹${p.toLocaleString("en-IN")}`,
                    value: String(p),
                  }))
                )
              : [{ label: "Select Pay Level first", value: "" }]
          }
          disabled={!level}
        />
      </div>
    </div>
  );
}
