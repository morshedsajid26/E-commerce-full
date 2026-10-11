import * as React from "react";
import { cn } from "@/utils/cn";

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-background cursor-pointer transition-colors accent-primary",
        className
      )}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";
