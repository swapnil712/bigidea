"use client"

import { useRef } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Button } from "../design-system/Button";
import { ReferenceAudio } from "@/types/project";

interface ReferenceSoundsProps {
  id: string;
  sounds: ReferenceAudio[];
  onChange: (sounds: ReferenceAudio[]) => void;
  label?: string;
}

export default function ReferenceSounds({
  id,
  sounds,
  onChange,
  label = "Add reference sounds",
}: ReferenceSoundsProps) {

  const fileInput = useRef<HTMLInputElement>(null);

  const upload = (files: FileList | null) => {
    if (!files?.length) return;

    onChange([
      ...sounds,
      ...Array.from(files).map((file, index) => ({
        id: `snd-${Date.now()}-${index}`,
        name: file.name,
        // Nothing to upload to yet — play straight off the local file.
        url: URL.createObjectURL(file),
      })),
    ]);

    // Let the same file be picked again after a removal.
    if (fileInput.current) fileInput.current.value = "";
  };

  const remove = (sound: ReferenceAudio) => {
    URL.revokeObjectURL(sound.url);
    onChange(sounds.filter((ix) => ix.id !== sound.id));
  };

  return (
    <div className="flex flex-col gap-3">

      {sounds.map((sound) => (
        <div key={sound.id} className="wrapper p-3 flex flex-col gap-2">

          <div className="flex flex-row items-center gap-1">
            <span className="grow text-sm truncate" title={sound.name}>{sound.name}</span>
            <Button type="Tertiary" size="Small" icon={MdDelete} onClick={() => remove(sound)} />
          </div>

          <audio controls src={sound.url} className="w-full">
            Your browser does not support audio playback.
          </audio>

        </div>
      ))}

      <input
        ref={fileInput}
        id={id}
        type="file"
        accept="audio/*"
        multiple
        className="hidden"
        onChange={(e) => upload(e.target.files)}
      />

      <Button
        type="Inline"
        size="Small"
        icon={MdAdd}
        label={label}
        onClick={() => fileInput.current?.click()}
      />

    </div>
  );
}
