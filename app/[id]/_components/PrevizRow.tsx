"use client"

import { MdAutoAwesome, MdDragHandle, MdMoreVert, MdOutlineMovie, MdOutlineViewCarousel } from "react-icons/md";
import { Button } from "@/components/design-system/Button";
import { Capsule } from "@/components/design-system/Capsule";
import { aspectStyles, baseStyle } from "@/constants/styles";
import { previzBeatOptions, shotOptions } from "@/constants/plot";
import { Shot } from "@/types/project";

interface PrevizRowProps {
  shot: Shot;
  index: number;
  aspectRatio: string;
  // Beat ids already generated for this shot.
  generated: string[];
  onGenerate: (beat: string) => void;
  onGenerateAll: () => void;
  storyboardHref: string;
}

export default function PrevizRow({
  shot,
  index,
  aspectRatio,
  generated,
  onGenerate,
  onGenerateAll,
  storyboardHref,
}: PrevizRowProps) {

  const aspectClass = aspectStyles[aspectRatio] ?? aspectStyles["16-9"];

  return (
    <div className="wrapper liftable p-3 flex flex-col gap-3">

      <div className={`${baseStyle.inlineRow} justify-between`}>

        <div className={baseStyle.inlineRow}>
          <span className="drag-handle"><MdDragHandle className="opacity-40" /></span>
          <span className="text-sm font-bold uppercase">{index + 1}. {shot.label}</span>
          <Capsule type="Tag" label={shotOptions.find((ix) => ix.id === shot.shotType)?.label ?? shot.shotType} />
        </div>

        <div className={baseStyle.inlineRow}>
          <Button type="Tertiary" size="Small" icon={MdAutoAwesome} label="Auto generate" onClick={onGenerateAll} />
          <Button type="Tertiary" size="Small" icon={ MdMoreVert } />
        </div>

      </div>

      {shot.description && <p className="text-sm opacity-60">{shot.description}</p>}

      <div className="grid grid-cols-3 gap-3">
        {previzBeatOptions.map((beat, beatIndex) => {

          const isDone = generated.includes(beat.id);
          // Each beat is generated from the previous one, so it stays locked
          // until that one exists.
          const previous = previzBeatOptions[beatIndex - 1];
          const isLocked = Boolean(previous) && !generated.includes(previous.id);

          return (
            <div key={beat.id} className="flex flex-col gap-2">

              <span className="text-sm font-bold opacity-60">{beat.label}</span>

              <div className={`${aspectClass} box w-full rounded-lg border bg-zinc-900
                              ${isDone ? "border-color" : "border-dashed border-color"}`}>
                {isDone ? (
                  <>
                    <MdOutlineMovie size={28} className="opacity-40" />
                    <span className="text-xs opacity-60">{beat.label} frame</span>
                  </>
                ) : (
                  <span className="text-xs opacity-40">
                    {isLocked ? `needs ${previous.label.toLowerCase()}` : "empty"}
                  </span>
                )}
              </div>

              {isLocked ? (
                <div className="text-center text-sm p-2 rounded bg-zinc-800/50 opacity-40">
                  {previous.label} first
                </div>
              ) : (
                <Button
                  type={isDone ? "Tertiary" : "Primary"}
                  size="Small"
                  stretch
                  label={isDone ? "Regenerate" : "Generate"}
                  onClick={() => onGenerate(beat.id)}
                />
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
