"use client";

import { Table, TableDataType } from "@/components/ui/table";
import { CustomerTableHeader } from "./header";
import { useEffect, useState } from "react";
import { getAppointments } from "./my-appointment-table.utils";
import { doctorType } from "@/types/user.type";
import { useAuth } from "@/contexts/auth-user.context";

export const MyAppointmentTable = () => {
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
  const doctor = useAuth()

  const fethCustomers = () =>
    getAppointments(setTableData, setOpenUpdateForm, doctor?.email);

  useEffect(() => {
    console.log(!openUpdateForm && doctor);
    
    if (!openUpdateForm && doctor) fethCustomers()
  }, [openUpdateForm, doctor])

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
