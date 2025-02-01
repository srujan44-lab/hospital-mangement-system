import { FormFields } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const spetialities = [
  "Accident and emergency medicine",
  "Allergology",
  "Anaesthetics",
  "Biological hematology",
  "Cardiology",
  "Child psychiatry",
  "Clinical biology",
  "Clinical chemistry",
  "Clinical neurophysiology",
  "Clinical radiology",
  "Dental, oral and maxillo-facial surgery",
  "Dermato-venerology",
  "Dermatology",
  "Endocrinology",
  "Gastro-enterologic surgery",
  "Gastroenterology",
  "General hematology",
  "General Practice",
  "General surgery",
  "Geriatrics",
  "Immunology",
  "Infectious diseases",
  "Internal medicine",
  "Laboratory medicine",
  "Maxillo-facial surgery",
];

export const addDoctorFormFiels: FormFields[] = [
  {
    label: {
      children: "Name",
    },
    input: {
      className: "py-3",
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
      className: "py-3",
      id: "email",
      name: "email",
      placeholder: "example@doctor.com",
      type: "email",
    },
  },
  {
    label: {
      children: "Mobile Number",
    },
    input: {
      className: "py-3",
      id: "mobileNumber",
      name: "mobileNumber",
      placeholder: "+91 9999999999",
      type: "tel",
    },
  },
  {
    label: {
      children: "Specialities",
    },
    input: {
      className: "py-3",
      id: "specialties",
      name: "specialties",
    },
    children: (
      <Select name="specialties">
        <SelectTrigger>
          <SelectValue placeholder="Select a Speciality" />
        </SelectTrigger>
        <SelectContent>
          {spetialities.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
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
