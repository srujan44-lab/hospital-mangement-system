import { doctorType } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";

export interface UpdateDoctorFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultValues: doctorType;
}
