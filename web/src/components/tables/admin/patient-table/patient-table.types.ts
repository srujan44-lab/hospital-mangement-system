import { TableDataType } from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";

export type GetPatientType = (
  setTableData: Dispatch<SetStateAction<TableDataType | undefined>>,
) => Promise<void>