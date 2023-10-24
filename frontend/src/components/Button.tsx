import React from "react";
import { cn } from "../utils";

export default function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "bg-primary-500 px-4 py-2 font-bold text-white transition duration-200 ease-in-out hover:bg-primary-700 active:scale-95 active:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
