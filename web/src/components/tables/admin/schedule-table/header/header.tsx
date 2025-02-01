"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomerTableHeaderProps } from "./header.types";
import { DialogBox } from "@/components/ui/dialog-box";
import { useEffect, useState } from "react";
import { AddScheduleForm } from "@/components/forms/schedule-form/add";

export const CustomerTableHeader = ({ fetchCustomers, setSearch }: CustomerTableHeaderProps) => {
  const [openCustomerForm, setOpenCustomerForm] = useState<boolean>(false);

  useEffect(() => {
    if (!openCustomerForm) fetchCustomers()
  }, [openCustomerForm])

  return (
    <header className="py-4 bg-primary-bg rounded-lg mb-2 flex justify-between gap-4">
      <Input
        className="bg-secondary-bg w-2/3"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search schedule title here ..."
      />
      <Button
        className="md:inline hidden"
        onClick={() => setOpenCustomerForm(true)}
      >
        + Add New Schedule
      </Button>
      <Button
        className="md:hidden inline"
        onClick={() => setOpenCustomerForm(true)}
      >
        + Add
      </Button>
      <DialogBox
        className="xl:w-1/3 sm:w-1/2"
        open={openCustomerForm}
        setOpen={setOpenCustomerForm}
        title="Add schedule"
      >
        <AddScheduleForm setOpen={setOpenCustomerForm} />
      </DialogBox>
    </header>
  );
};
