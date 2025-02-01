import type { FormHTMLAttributes, ReactElement } from "react";
import type { LabelProps } from "../label";
import { InputProps } from "../input";
import { OnSubmitType } from "@/hooks/useFormState";

export interface FormFields {
  label: LabelProps;
  input: InputProps;
  children?: ReactElement;
}

export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  formFields: FormFields[];
  onSubmit: OnSubmitType;
  submitBtnLabel: string;
  redirect?: string;
}
