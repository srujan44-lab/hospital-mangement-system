import { FormFields } from "@/components/ui/form";

export const loginFormFields: FormFields[] = [
  {
    label: {
      children: "Email",
    },
    input: {
      className: "text-base py-3 px-4",
      id: "email",
      name: "email",
      placeholder: "example@gmail.com",
      type: "email",
    },
  },
  {
    label: {
      children: "Password",
    },
    input: {
      className: "text-base py-3 px-4",
      id: "password",
      name: "password",
      placeholder: "••••••••",
      type: "password",
    },
  },
];
