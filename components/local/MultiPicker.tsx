"use client"

import { useEffect, useRef, useState } from "react";
import { MdAdd, MdSearch } from "react-icons/md";
import { IconType } from "react-icons";
import { OptionType } from "@/constants/choices";
import { baseStyle } from "@/constants/styles";
import { Button } from "../design-system/Button";
import { Capsule } from "../design-system/Capsule";
import { Choice } from "../design-system/Choice";
import { Input } from "../design-system/Input";

type PickerTone = "Neutral" | "Violet" | "Amber";

export interface PickerGroup {
  id: string;
  label: string;
  options: OptionType[];
  addNewLabel?: string;
}

interface MultiPickerProps {
  id: string;
  label?: string;
  hint?: string;
  tone?: PickerTone;
  capsuleIcon?: IconType;
  emptyLabel?: string;
  searchPlaceholder?: string;
  groups: PickerGroup[];
  selected: string[];
  onChange: (ids: string[]) => void;
  // Receives the group the "add new" sits under and whatever is typed in the
  // search box, so a fresh item can be created without leaving the picker.
  onAddNew?: (groupId: string, name: string) => void;
}

export default function MultiPicker({
  id,
  label,
  hint,
  tone,
  capsuleIcon,
  emptyLabel = "None selected",
  searchPlaceholder = "Search",
  groups,
  selected,
  onChange,
  onAddNew,
}: MultiPickerProps) {

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  // Input keeps its own uncontrolled value — bumping this remounts it when we
  // clear the query in code (after creating a new item).
  const [searchKey, setSearchKey] = useState(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (!container.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const allOptions = groups.flatMap((group) => group.options);
  const labelFor = (optionId: string) => allOptions.find((ix) => ix.id === optionId)?.label ?? optionId;

  const toggle = (optionId: string) =>
    onChange(selected.includes(optionId) ? selected.filter((ix) => ix !== optionId) : [...selected, optionId]);

  const matches = (option: OptionType) => option.label.toLowerCase().includes(query.trim().toLowerCase());

  return (
    <div ref={container} className={`${baseStyle.inlineCol} group grow w-full relative`}>

      {label && (
        <span className={baseStyle.inlineRow}>
          <span className="font-bold">{label}</span>
          {hint && <span className="opacity-60">{hint}</span>}
        </span>
      )}

      <div className="border-color border-2 rounded-md p-1 flex flex-row items-center gap-2 w-full">
        <div className="flex flex-row flex-wrap gap-1 grow p-1">
          {selected.length === 0 && <span className="opacity-60 text-sm">{emptyLabel}</span>}
          {selected.map((optionId) => (
            <Capsule
              key={optionId}
              type="Removable"
              tone={tone}
              leftIcon={capsuleIcon}
              label={labelFor(optionId)}
              onRemove={() => toggle(optionId)}
            />
          ))}
        </div>

        <Button type="Tertiary" size="Small" icon={MdAdd} onClick={() => setOpen(!open)} />
      </div>

      {open && (
        <div className="wrapper bg-zinc-900! absolute z-20 top-full left-0 mt-1 w-full p-3 shadow-xl max-h-80 overflow-y-auto
                        md:top-0 md:left-full md:ml-3 md:mt-0 md:w-72">

          <Input
            key={searchKey}
            id={`${id}-search`}
            size="S"
            leftIcon={MdSearch}
            placeholder={searchPlaceholder}
            value={query}
            onChange={setQuery}
          />

          {groups.map((group) => {
            const visible = group.options.filter(matches);
            if (!visible.length && !group.addNewLabel) return null;

            return (
              <div key={group.id} className="mt-3">
                <p className="text-sm font-bold opacity-60">{group.label}</p>

                {visible.map((option) => (
                  <Choice
                    key={option.id}
                    id={`${id}-${option.id}`}
                    type="Checkbox"
                    size="S"
                    label={option.label}
                    checked={selected.includes(option.id)}
                    onClick={() => toggle(option.id)}
                  />
                ))}

                {group.addNewLabel && onAddNew && (
                  <Button
                    type="Inline"
                    size="Small"
                    icon={MdAdd}
                    label={query.trim() ? `Add "${query.trim()}"` : group.addNewLabel}
                    onClick={() => {
                      onAddNew(group.id, query.trim());
                      setQuery("");
                      setSearchKey(searchKey + 1);
                    }}
                  />
                )}
              </div>
            );
          })}

          {query.trim() !== "" && groups.every((group) => !group.options.filter(matches).length) && (
            <p className="text-sm opacity-60 mt-3">No matches for “{query}”</p>
          )}
        </div>
      )}
    </div>
  );
}
