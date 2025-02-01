"use client";

import { Table, TableDataType } from "@/components/ui/table";
import { CustomerTableHeader } from "./header";
import { useEffect, useState } from "react";
import { getSessions } from "./my-session-table.utils";
import { doctorType } from "@/types/user.type";
import { useAuth } from "@/contexts/auth-user.context";

export const MySessionTable = () => {
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
    getSessions(setTableData, setOpenUpdateForm, doctor?.email);

  useEffect(() => {    
    if (!openUpdateForm && doctor?.email) fethCustomers()
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
