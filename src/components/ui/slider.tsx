"use client";

import * as React from "react";

interface SliderProps {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
}: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [Number(e.target.value)];
    onValueChange?.(newValue);
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        type="range"
        value={value[0]}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="
          w-full h-[4px] 
          bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 
          rounded-full appearance-none cursor-pointer
          accent-indigo-600 transition-all duration-200

          /* Dark mode */
          dark:from-indigo-800 dark:via-indigo-700 dark:to-indigo-600

          /* Thumb styling */
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500
          [&::-webkit-slider-thumb]:shadow-sm
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-webkit-slider-thumb]:transition-transform

          /* Firefox support */
          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full 
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-500
          [&::-moz-range-thumb]:shadow-sm
          [&::-moz-range-thumb]:hover:scale-110
          [&::-moz-range-thumb]:transition-transform
        "
      />
    </div>
  );
}
