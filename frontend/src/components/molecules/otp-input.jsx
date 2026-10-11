"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/utils/cn";

export function OtpInput({ length = 6, value = "", onChange, className }) {
  const [digits, setDigits] = useState(
    Array(length)
      .fill("")
      .map((_, i) => value[i] || "")
  );
  const inputRefs = useRef([]);

  useEffect(() => {
    const newDigits = Array(length)
      .fill("")
      .map((_, i) => value[i] || "");
    setDigits(newDigits);
  }, [value, length]);

  const handleChange = (index, val) => {
    const char = val.slice(-1);
    if (char && !/^\d+$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    const combined = newDigits.join("");
    if (onChange) onChange(combined);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newDigits = Array(length).fill("");
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    if (onChange) onChange(newDigits.join(""));
    const focusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className={cn("flex items-center justify-center gap-2 sm:gap-3", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-11 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-background/60 border border-input rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
        />
      ))}
    </div>
  );
}

export default OtpInput;
