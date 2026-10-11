import * as React from "react";
import { cn } from "@/utils/cn";

const variantStyles = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-bold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-4",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

export const Typography = React.forwardRef(
  ({ className, variant = "p", as, children, ...props }, ref) => {
    let Component = as;

    if (!Component) {
      if (variant === "h1") Component = "h1";
      else if (variant === "h2") Component = "h2";
      else if (variant === "h3") Component = "h3";
      else if (variant === "h4") Component = "h4";
      else if (variant === "muted" || variant === "small") Component = "span";
      else Component = "p";
    }

    return (
      <Component
        ref={ref}
        className={cn(variantStyles[variant] || variantStyles.p, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";
