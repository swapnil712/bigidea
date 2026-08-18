"use client"

import { ReactNode, useEffect, useRef, useState } from "react";
import { Button, ButtonProps } from "../design-system/Button";

type DropdownAlign = "Left" | "Right";

interface DropdownProps {
  trigger: ButtonProps;
  align?: DropdownAlign;
  // Tailwind width class for the panel, e.g. "min-w-80".
  width?: string;
  children: ReactNode;
}

const alignStyles: Record<DropdownAlign, string> = {
  Left: "left-0",
  Right: "right-0",
};

export default function Dropdown({ trigger, align, width, children }: DropdownProps) {

  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onOutside = (e: MouseEvent) => {
      if (!container.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={container} className="relative">

      <Button {...trigger} onClick={() => setOpen(!open)} />

      {open && (
        <div
          // Anything picked closes the panel — the click runs first, then this.
          onClick={() => setOpen(false)}
          className={`wrapper bg-zinc-900! absolute z-30 top-full mt-1 p-2 shadow-xl
                      ${alignStyles[align || "Left"]} ${width || "min-w-60"}`}
        >
          {children}
        </div>
      )}

    </div>
  );
}
