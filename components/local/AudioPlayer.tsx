"use client"

import { MdAutoAwesome, MdOutlineGraphicEq } from "react-icons/md";
import { Button } from "../design-system/Button";

interface AudioPlayerProps {
  label: string;
  src?: string;
  onGenerate?: () => void;
}

export default function AudioPlayer({ label, src, onGenerate }: AudioPlayerProps) {
  return (
    <div className="wrapper p-4 flex flex-col gap-3 w-full">

      <div className="flex flex-row items-center gap-2">
        <MdOutlineGraphicEq size={20} className="opacity-60" />
        <span className="grow font-bold">{label}</span>
        {src && <Button size="Small" type="Tertiary" icon={MdAutoAwesome} label="Regenerate" onClick={onGenerate} />}
      </div>

      {src ? (
        <audio controls src={src} className="w-full">
          Your browser does not support audio playback.
        </audio>
      ) : (
        <div className="box border border-dashed border-color rounded-lg bg-zinc-900 py-8">
          <span className="text-sm opacity-40">Nothing generated yet</span>
          <Button size="Small" type="Secondary" icon={MdAutoAwesome} label="Generate" onClick={onGenerate} />
        </div>
      )}

    </div>
  );
}
