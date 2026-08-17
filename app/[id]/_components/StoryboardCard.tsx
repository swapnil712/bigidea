"use client"

import { MdAutoAwesome, MdOutlineImage } from "react-icons/md";
import { Button } from "@/components/design-system/Button";
import { Capsule } from "@/components/design-system/Capsule";
import { Input } from "@/components/design-system/Input";
import { baseStyle } from "@/constants/styles";
import { shotOptions } from "@/constants/plot";
import { aspectRatioOptions } from "@/constants/choices";
import { Shot } from "@/types/project";

type AspectRatioId = (typeof aspectRatioOptions)[number]["id"];

// Full literal class names so Tailwind can scan them.
const aspectStyles: Record<AspectRatioId, string> = {
  "9-16": "aspect-[9/16]",
  "16-9": "aspect-[16/9]",
  "1-1": "aspect-square",
  "4-5": "aspect-[4/5]",
  "21-9": "aspect-[21/9]",
};

interface StoryboardCardProps {
  shot: Shot;
  index: number;
  aspectRatio: AspectRatioId;
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
}

export default function StoryboardCard({
  shot,
  index,
  aspectRatio,
  prompt,
  onPromptChange,
  onGenerate,
}: StoryboardCardProps) {

  const aspectClass = aspectStyles[aspectRatio] ?? aspectStyles["16-9"];

  return (
    <div className="wrapper p-3 flex flex-col gap-3">

      <div className={`${aspectClass} box w-full rounded-lg border border-dashed border-color bg-zinc-900`}>
        <MdOutlineImage size={32} className="opacity-40" />
        <Button type="Secondary" size="Small" icon={MdAutoAwesome} label="Generate" onClick={onGenerate} />
      </div>

      <div className={`${baseStyle.inlineRow} justify-between`}>
        <span className="text-sm font-bold uppercase">{index + 1}. {shot.label}</span>
        <Capsule type="Tag" label={shotOptions.find((ix) => ix.id === shot.shotType)?.label ?? shot.shotType} />
      </div>

      <Input
        type="textarea"
        size="G"
        id={`prompt-${shot.id}`}
        placeholder="Describe this frame…"
        rows={5}
        value={prompt}
        onChange={onPromptChange}
      />

    </div>
  );
}
