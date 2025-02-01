"use client";

import { Form } from "@/components/ui/form";
import { loginFormFields } from "./login-form.strings";
import { handleLogin } from "./login-form.utils";

export const LoginForm = () => (
  <Form
    formFields={loginFormFields}
    onSubmit={handleLogin}
    submitBtnLabel="Login"
  />
);
