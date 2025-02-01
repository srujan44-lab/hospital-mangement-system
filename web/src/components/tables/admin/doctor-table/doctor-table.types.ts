import { DoctorDefaultValuesType } from "@/components/forms/doctor-form/update";
import { TableDataType } from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";

export type GetDoctorType = (
  setTableData: Dispatch<SetStateAction<TableDataType | undefined>>,
  setOpenupdateForm: Dispatch<SetStateAction<boolean>>,
  setDefaultValues: Dispatch<SetStateAction<DoctorDefaultValuesType>>
) => Promise<void>