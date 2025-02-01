import { FormFields } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchAllDoctors } from "./add-schedule-form.utils";
import { doctorType } from "@/types/user.type";

const doctors = fetchAllDoctors()

export const addDoctorFormFiels: FormFields[] = [
  {
    label: {
      children: "Title",
    },
    input: {
      className: "py-3",
      id: "title",
      name: "title",
      placeholder: "Schedule 1",
      type: "text",
    },
  },
  {
    label: {
      children: "Doctor",
    },
    input: {
      className: "py-3",
      id: "doctor",
      name: "doctor",
    },
    children: (
      <Select name="doctor">
        <SelectTrigger>
          <SelectValue placeholder="Select a Doctor" />
        </SelectTrigger>
        <SelectContent>
          {(await doctors).map(({name, email}: doctorType) => (
            <SelectItem key={email} value={email}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    label: {
      children: "Schedule Date",
    },
    input: {
      className: "py-3",
      id: "scheduleDate",
      name: "scheduleDate",
      type: "date",
      defaultValue: new Date().toISOString().split("T")[0],
    },
  },
  {
    label: {
      children: "Schedule Time",
    },
    input: {
      className: "py-3",
      id: "scheduleTime",
      name: "scheduleTime",
      type: "time",
      defaultValue: `${String(new Date().getHours()).padStart(2, "0")}:${String(
        new Date().getMinutes()
      ).padStart(2, "0")}`,
    },
  },
  {
    label: {
      children: "Max Number of Peoples",
    },
    input: {
      className: "py-3",
      id: "nop",
      name: "nop",
      placeholder: "1",
      defaultValue: 1,
      type: "number",
    },
  },
];
