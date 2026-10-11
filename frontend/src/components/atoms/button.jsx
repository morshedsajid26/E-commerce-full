import * as React from "react";
import { cn } from "@/utils/cn";

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm active:scale-[0.98]",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm active:scale-[0.98]",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
      ghost:
        "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
      danger:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm active:scale-[0.98]",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs rounded-lg",
      md: "h-11 px-4 text-sm rounded-xl font-medium",
      lg: "h-13 px-6 text-base rounded-xl font-semibold",
      icon: "h-10 w-10 p-0 rounded-xl flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer disabled:cursor-not-allowed select-none",
          variants[variant] || variants.primary,
          sizes[size] || sizes.md,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
