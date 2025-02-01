"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import clsx from "clsx";
import { DialogBoxProps } from "./dialog-box.types";

export const DialogBox = forwardRef<HTMLElement, DialogBoxProps>(
  ({ className, children, open, setOpen, title, ...props }, ref) => {
    return (
      <div
        className={clsx(
          "fixed h-dvh w-full top-0 left-0 flex justify-center items-center backdrop-blur-sm z-10 p-4 bg-black/50",
          !open && "hidden"
        )}
        id="blurBg"
        onClick={(e) =>
          (e.target as HTMLElement).id === "blurBg" ? setOpen(false) : null
        }
      >
        <article
          className={cn("p-6 bg-white shadow-xl rounded-lg space-y-8 animate-dialog-box-open", className)}
          ref={ref}
          {...props}
        >
          {title ? (
            <h2 className="border-l-4 border-primary pl-2 leading-none text-2xl font-bold">
              <span className="text-primary">
                {title.slice(0, 1).toUpperCase()}
              </span>
              {title.slice(1).toUpperCase()}
            </h2>
          ) : null}
          {children}
        </article>
      </div>
    );
  }
);
DialogBox.displayName = "DialogBox";
