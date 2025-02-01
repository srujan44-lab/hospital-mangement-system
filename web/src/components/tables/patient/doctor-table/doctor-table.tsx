"use client";

import { Table, TableDataType } from "@/components/ui/table";
import { CustomerTableHeader } from "./header";
import { useEffect, useState } from "react";
import { getDoctors } from "./doctor-table.utils";
import { doctorType } from "@/types/user.type";
import { DialogBox } from "@/components/ui/dialog-box";
import { UpdateDoctorForm } from "@/components/forms/doctor-form/update";

export const DoctorTable = () => {
  const [tableData, setTableData] = useState<TableDataType>();
  const [search, setSearch] = useState<string>("");

  const fethCustomers = () =>
    getDoctors(setTableData);

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
