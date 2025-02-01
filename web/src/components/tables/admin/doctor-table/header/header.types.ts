import { Dispatch, SetStateAction } from "react";

export interface CustomerTableHeaderProps {
  fetchCustomers: () => Promise<void>;
  setSearch: Dispatch<SetStateAction<string>>;
}
