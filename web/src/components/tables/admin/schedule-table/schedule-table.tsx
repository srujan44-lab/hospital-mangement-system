"use client";

import { Table, TableDataType } from "@/components/ui/table";
import { CustomerTableHeader } from "./header";
import { useEffect, useState } from "react";
import { getDoctors } from "./schedule-table.utils";
import { doctorType } from "@/types/user.type";
import { DialogBox } from "@/components/ui/dialog-box";
import { UpdateDoctorForm } from "@/components/forms/doctor-form/update";

export const ScheduleTable = () => {
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
    getDoctors(setTableData, setOpenUpdateForm);

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
      <DialogBox
        className="xl:w-1/3 sm:w-1/2"
        open={openUpdateForm}
        setOpen={setOpenUpdateForm}
        title="Update Doctor"
      >
        <UpdateDoctorForm
          defaultValues={defaultValues}
          setOpen={setOpenUpdateForm}
        />
      </DialogBox>
    </div>
  );
};
