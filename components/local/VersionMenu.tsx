"use client"

import { MdDownload, MdHistory, MdOutlineDescription } from "react-icons/md";
import Dropdown from "./Dropdown";
import { Button } from "../design-system/Button";
import { DocumentVersion } from "@/types/project";
import { formatVersionDate } from "@/functions/formatVersionDate";

interface VersionMenuProps {
  versions: DocumentVersion[];
  onSelect?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export default function VersionMenu({ versions, onSelect, onDownload }: VersionMenuProps) {

  const [current, ...past] = versions;

  const row = (version: DocumentVersion) => (
    <div key={version.id} className="flex flex-row items-center gap-2">

      <button
        type="button"
        onClick={() => onSelect?.(version.id)}
        className="grow flex flex-row items-start gap-2 cursor-pointer text-left p-2 rounded-lg hover:bg-zinc-700"
      >
        <MdOutlineDescription size={20} className="mt-0.5 shrink-0" />

        <span className="flex flex-col">
          <span>{version.label}</span>
          <span className="text-sm opacity-60">Updated {formatVersionDate(version.updated)}</span>
        </span>
      </button>

      <Button type="Tertiary" size="Small" icon={MdDownload} onClick={() => onDownload?.(version.id)} />

    </div>
  );

  return (
    <Dropdown trigger={{ icon: MdHistory, type: "Tertiary" }} align="Left" width="min-w-90">

      {current && row(current)}

      {past.length > 0 && (
        <>
          <p className="text-sm font-bold px-2 pt-3 pb-1 border-t border-color mt-2">Past versions</p>
          {past.map(row)}
        </>
      )}

    </Dropdown>
  );
}
