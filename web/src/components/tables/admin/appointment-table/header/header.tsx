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
        className="bg-secondary-bg"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search patient name here ..."
      />
    </header>
  );
};
