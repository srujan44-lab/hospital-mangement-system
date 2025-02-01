import { FormFields } from "@/components/ui/form";
import { doctorType } from "@/types/user.type";
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

export const updateDoctorFormFiedls = ({
  name,
  email,
  mobileNumber,
  specialties
}: doctorType): FormFields[] => [
  {
    label: {
      children: "Name",
    },
    input: {
      className: "py-3",
      defaultValue: name,
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
      defaultValue: email,
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
      defaultValue: mobileNumber,
      id: "mobileNumber",
      name: "mobileNumber",
      placeholder: "+91 9876543210",
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
      <Select defaultValue={specialties} name="specialties">
        <SelectTrigger>
          <SelectValue placeholder={specialties} />
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
];
