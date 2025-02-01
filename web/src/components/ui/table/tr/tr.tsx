import { forwardRef } from "react";
import { TrProps } from "./tr.types";

export const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  ({ children, ...props }, ref) => {
    return (
      <tr ref={ref} {...props}>
        {children}
      </tr>
    );
  }
);

Tr.displayName = "Tr";
