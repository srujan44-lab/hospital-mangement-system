"use client";

import { Table, TableDataType } from "@/components/ui/table";
import { CustomerTableHeader } from "./header";
import { useState } from "react";
import { getPatients } from "./patient-table.utils";

export const PatientTable = () => {
  const [tableData, setTableData] = useState<TableDataType>();
  const [search, setSearch] = useState<string>("");

  const fethCustomers = () => getPatients(setTableData);

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
