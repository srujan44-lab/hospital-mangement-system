"use client";

import { Form } from "@/components/ui/form";
import { signupFormFields } from "./signup-form.strings";
import { handleSignup } from "./signup-form.utils";

export const SignupForm = () => (
  <Form
    formFields={signupFormFields}
    onSubmit={handleSignup}
    submitBtnLabel="Signup"
    redirect="/login"
  />
);
