"use client";

import { cloneElement, type FormEvent, forwardRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useFormState } from "@/hooks/useFormState";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import type { FormProps } from "./form.types";
import { useRouter } from "next/navigation";

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    { className, formFields, onSubmit, redirect, submitBtnLabel, ...props },
    ref
  ) => {
    const [state, formAction, isPending, setState] = useFormState(onSubmit);
    const router = useRouter();

    useEffect(() => {
      if (state?.status && redirect) router.push(redirect);
    }, [state]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      await formAction(formData);
    };

    return (
      <form
        onSubmit={(event) => handleSubmit(event)}
        className={cn(["space-y-4", className])}
        ref={ref}
        {...props}
      >
        {/* Form fields */}
        {formFields.map(({ label, input, children }) => (
          <div className="space-y-2" key={input.id}>
            <Label htmlFor={input.id}>{label.children}</Label>
            {children ? (
              cloneElement(children, {
                onChange: () => (state ? setState(undefined) : null),
              })
            ) : (
              <Input
                {...input}
                onChange={() => (state ? setState(undefined) : null)}
              />
            )}
            {state?.name === input.id && state?.error ? (
              <p className="text-red-500 text-sm">{state.error}</p>
            ) : null}
          </div>
        ))}
        {/* submit button */}
        <Button
          className="!mt-8 flex gap-2 font-semibold w-full"
          disabled={isPending}
          type="submit"
        >
          {submitBtnLabel}
        </Button>
      </form>
    );
  }
);

Form.displayName = "Form";
