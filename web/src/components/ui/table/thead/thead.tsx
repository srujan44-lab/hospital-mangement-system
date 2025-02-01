import { forwardRef } from "react";
import { TheadProps } from "./thead.types";
import { cn } from "@/lib/utils";

export const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <thead className={cn(["bg-primary text-white", className])} ref={ref} {...props}>
        {children}
      </thead>
    );
  }
);

Thead.displayName = "Thead";
