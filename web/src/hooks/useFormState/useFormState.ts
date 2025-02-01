"use client";

import { useEffect, useState } from "react";
import type {
  FormActionType,
  StateType,
  UseFormStateType,
} from "./useFormState.types";

export const useFormState: UseFormStateType = (onSubmit) => {
  const [state, setState] = useState<StateType | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {}, [isPending]);

  const formAction: FormActionType = async (formData) => {
    setIsPending(true);

    const responce = await onSubmit(formData);
    setState(responce);

    setIsPending(false);
  };

  return [state, formAction, isPending, setState];
};
