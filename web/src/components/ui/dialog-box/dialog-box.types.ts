import { Dispatch, HTMLAttributes, SetStateAction } from "react";

export interface DialogBoxProps extends HTMLAttributes<HTMLElement> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
  title?: string;
}
