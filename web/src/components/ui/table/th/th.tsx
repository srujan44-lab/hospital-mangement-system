import { forwardRef } from "react";
import { ThProps } from "./th.types";
import { cn } from "@/lib/utils";

export const Th = forwardRef<HTMLTableHeaderCellElement, ThProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <th className={cn(["text-start px-4 py-3 whitespace-nowrap", className])} ref={ref} {...props}>
        {children}
      </th>
    );
  }
);

Th.displayName = "Th";
