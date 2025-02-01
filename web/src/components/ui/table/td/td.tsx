import { forwardRef } from "react";
import { TdProps } from "./td.types";
import { cn } from "@/lib/utils";

export const Td = forwardRef<HTMLTableDataCellElement, TdProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <td className={cn(["text-start px-4 py-3 whitespace-nowrap", className])} ref={ref} {...props}>
        {children}
      </td>
    );
  }
);

Td.displayName = "Td";
