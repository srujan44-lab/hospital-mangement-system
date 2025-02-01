import { ReactNode, TableHTMLAttributes } from "react";
import { ThProps } from "./th";
import { TdProps } from "./td";

export interface TableHeadType extends ThProps {
  label: string;
  sortBtn?: boolean;
}

export interface TableBodyType extends TdProps {
  values: Array<ReactNode | string>;
}

export interface TableDataType {
  head: TableHeadType[];
  body: TableBodyType[];
}

export interface SortType {
  label: number;
  order: number;
}

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  tableData: TableDataType;
  search: {
    query: string;
    colNum: number;
  }
}
