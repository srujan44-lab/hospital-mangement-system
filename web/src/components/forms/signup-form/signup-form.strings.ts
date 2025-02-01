import { FormFields } from "@/components/ui/form";

export const signupFormFields: FormFields[] = [
  {
    label: {
      children: "Name",
    },
    input: {
      className: "text-base py-3 px-4",
      id: "name",
      name: "name",
      placeholder: "John Doe",
      type: "text",
    },
  },
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
      children: "Mobile Number",
    },
    input: {
      className: "text-base py-3 px-4",
      id: "mobileNumber",
      name: "mobileNumber",
      placeholder: "+91 9999999999",
      type: "tel",
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
