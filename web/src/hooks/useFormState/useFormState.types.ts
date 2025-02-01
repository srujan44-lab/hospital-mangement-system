import { Dispatch, SetStateAction } from "react";

export interface StateType {
  name?: string;
  error?: string;
  status: boolean;
}

export type FormActionType = (formData: FormData) => Promise<void>;

export type OnSubmitType = (
  formData: FormData,
  ...restParams: unknown[]
) => Promise<StateType | undefined>;

export type UseFormStateType = (
  onSubmit: OnSubmitType
) => [
  StateType | undefined,
  FormActionType,
  boolean,
  Dispatch<SetStateAction<StateType | undefined>>
];
