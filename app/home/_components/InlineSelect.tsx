"use client";
import { useState, useRef, useEffect } from "react";
import { OptionType } from "@/constants/choices";
import { MdUnfoldMore, MdCheck } from "react-icons/md";

interface InlineSelectProps {
  label: string;
  options: OptionType[];
  value?: string;
  onChange?: (id: string) => void;
}

export default function InlineSelect({ label, options, value, onChange }: InlineSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((item) => item.id === value);
  const triggerLabel = selectedOption ? selectedOption.label : label;

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const estimatedPanelHeight = options.length * 40 + 16;
      setOpenUpward(spaceBelow < estimatedPanelHeight);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button type="button" onClick={handleToggle} className="cursor-pointer flex items-center gap-1">
        <span className="text-sm">{triggerLabel}</span>
        <MdUnfoldMore />
      </button>

      {isOpen && (
        <div
          className={`absolute rounded-lg bg-zinc-800 min-w-48 z-10 border border-zinc-700 shadow-xl ${
            openUpward ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onChange?.(item.id);
                setIsOpen(false);
              }}
              className="flex items-center cursor-pointer justify-between hover:bg-zinc-700 w-full px-3 py-2 text-left"
            >
              <span>{item.label}</span>
              {item.id === value && <MdCheck />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}