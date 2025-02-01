"use client";

import { Table, TableDataType } from "@/components/ui/table";
import { CustomerTableHeader } from "./header";
import { useEffect, useState } from "react";
import { getAppointments } from "./appointment-table.utils";
import { doctorType } from "@/types/user.type";

export const AppointmentTable = () => {
  const [tableData, setTableData] = useState<TableDataType>();
  const [search, setSearch] = useState<string>("");
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<doctorType>(
    {
      name: "",
      email: "",
      specialties: "",
      mobileNumber: "",
    }
  );

  const fethCustomers = () =>
    getAppointments(setTableData, setOpenUpdateForm);

  useEffect(() => {
    if (!openUpdateForm) fethCustomers()
  }, [openUpdateForm])

  return (
    <div>
      <CustomerTableHeader
        fetchCustomers={fethCustomers}
        setSearch={setSearch}
      />
      <Table
        search={{ query: search, colNum: 0 }}
        tableData={tableData as TableDataType}
      />
    </div>
  );
};
