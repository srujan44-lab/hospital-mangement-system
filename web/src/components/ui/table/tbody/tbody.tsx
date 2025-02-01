import { forwardRef } from "react";
import { TbodyProps } from "./tbody.types";

export const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <tbody ref={ref} {...props}>
        {children}
      </tbody>
    );
  }
);

Tbody.displayName = "Tbody";
