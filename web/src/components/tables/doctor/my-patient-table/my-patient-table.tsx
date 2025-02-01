"use client";

import { Table, TableDataType } from "@/components/ui/table";
import { CustomerTableHeader } from "./header";
import { useEffect, useState } from "react";
import { getPatients } from "./my-patient-table.utils";
import { useAuth } from "@/contexts/auth-user.context";

export const MyPatientTable = () => {
  const [tableData, setTableData] = useState<TableDataType>();
  const [search, setSearch] = useState<string>("");
  const patient = useAuth()

  const fethCustomers = () => getPatients(setTableData, patient?.email);

  useEffect(() => {}, [patient])

  return (
    <div>
      <CustomerTableHeader
        fetchCustomers={fethCustomers}
        setSearch={setSearch}
      />
      <Table
        search={{ query: search, colNum: 1 }}
        tableData={tableData as TableDataType}
      />
    </div>
  );
};
