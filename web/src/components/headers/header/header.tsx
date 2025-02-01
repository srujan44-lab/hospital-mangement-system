"use client";

import { usePathname } from "next/navigation";
import { headerTitle } from "./header.strings";

export const Header = (): JSX.Element => {
  const path = usePathname();

  return (
    <header className="p-8 flex justify-between">
      <h2 className="text-3xl font-semibold">{headerTitle(path)}</h2>
      <section>
        <div className="text-end">
          <p className="text-sm text-secondary-foreground">Today's Date</p>
          <h4 className="text-xl font-semibold">
            {new Date().getFullYear()}-
            {new Date().getMonth() + 1 < 10
              ? `0${new Date().getMonth() + 1}`
              : new Date().getMonth() + 1}
            -
            {new Date().getDate() < 10
              ? `0${new Date().getDate()}`
              : new Date().getDate()}
          </h4>
        </div>
      </section>
    </header>
  );
};
