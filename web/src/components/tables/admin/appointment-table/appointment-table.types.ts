import { TableDataType } from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";

export type GetAppointmentType = (
  setTableData: Dispatch<SetStateAction<TableDataType | undefined>>,
  setOpenupdateForm: Dispatch<SetStateAction<boolean>>,
) => Promise<void>