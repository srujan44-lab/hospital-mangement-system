"use client";

import { forwardRef, useEffect, useState } from "react";
import clsx from "clsx";
import { SortType, TableDataType, TableProps } from "./table.types";
import { Thead } from "./thead";
import { Tr } from "./tr";
import { Th } from "./th";
import { Td } from "./td";
import { Tbody } from "./tbody";
import { Button } from "../button";
import { SortIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, search, tableData, ...props }, ref) => {
    const [data, setData] = useState<TableDataType>(tableData);
    const [sort, setSort] = useState<SortType>({ label: -1, order: 0 });

    useEffect(() => {
      const _tableData = tableData?.body.filter(({ values }) =>
        (values[search.colNum] as string)
          .toLowerCase()
          .includes(search.query.toLowerCase())
      );

      if (sort.order !== 0) {
        const sortedData = [..._tableData].sort((a, b) => {
          const serviceA = a.values[sort.label]!;
          const serviceB = b.values[sort.label]!;

          if (serviceA < serviceB) return sort.order === 1 ? -1 : 1;
          if (serviceA > serviceB) return sort.order === 1 ? 1 : -1;
          return 0;
        });
        setData((prev) => ({ ...prev, body: sortedData }));
      } else if (tableData)
        setData({ head: tableData?.head, body: _tableData });
    }, [search, sort, tableData]);

    return data ? (
      <div className="w-full overflow-x-scroll rounded-lg">
        <table className={cn(["w-full", className])} ref={ref} {...props}>
          <Thead>
            <Tr>
              {data.head.map(
                ({ label, sortBtn = false, ...attributes }, index) => (
                  <Th key={index} {...attributes}>
                    {sortBtn ? (
                      <Button
                        className="p-0 transition-all duration-300 space-x-2 hover:bg-transparent hover:text-white font-semibold text-base"
                        onClick={() =>
                          setSort((pre) => ({
                            label: index,
                            order: pre.order == 1 ? 2 : 1,
                          }))
                        }
                        variant="ghost"
                      >
                        <span>{label}</span>
                        <SortIcon
                          className={clsx(
                            sort.order === 0 || sort.label !== index
                              ? "text-white/50"
                              : "text-white",
                            sort.order === 2 && sort.label === index
                              ? "rotate-180"
                              : "rotate-0",
                            "mb-1 transition-all duration-300"
                          )}
                          height={15}
                          width={15}
                        />
                      </Button>
                    ) : (
                      label
                    )}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {data.body.length ? (
              data.body.map(({ values, ...attributes }, index) => (
                <Tr
                  key={index}
                  className="hover:bg-ternary-bg transition-all duration-300"
                >
                  {values.map((value, index) => (
                    <Td key={index} {...attributes}>
                      {value}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td
                  className="text-center py-8 font-bold text-black/50"
                  colSpan={data.head.length}
                >
                  {search.query.length
                    ? "Search resulte Not Found"
                    : "No Data to Display"}
                </Td>
              </Tr>
            )}
          </Tbody>
        </table>
      </div>
    ) : (
      <div className="flex justify-center mt-28">
        Loading ...
      </div>
    );
  }
);

Table.displayName = "Table";
