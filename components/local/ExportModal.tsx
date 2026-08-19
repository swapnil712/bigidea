"use client"

import { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload, MdPlayArrow, MdSwapHoriz, MdWarningAmber } from "react-icons/md";
import Modal from "./Modal";
import { Button } from "../design-system/Button";
import { Input } from "../design-system/Input";
import { Choice } from "../design-system/Choice";
import { baseStyle } from "@/constants/styles";
import { aspectRatioOptions } from "@/constants/choices";
import { frameRateOptions, resolutionOptions, videoFormatOptions } from "@/constants/export";
import { sceneLabel } from "@/functions/sceneLabel";
import { LocationProps, SceneProps } from "@/types/project";

interface ExportModalProps {
  show: boolean;
  onClose: () => void;
  scenes: SceneProps[];
  locations?: LocationProps[];
  aspectRatio: string;
}

export default function ExportModal({ show, onClose, scenes, locations, aspectRatio }: ExportModalProps) {

  const [selected, setSelected] = useState<string[]>([]);
  const [resolution, setResolution] = useState(resolutionOptions[0].id);
  const [format, setFormat] = useState(videoFormatOptions[0].id);
  const [frameRate, setFrameRate] = useState(frameRateOptions[2].id);
  const [width, setWidth] = useState("1080");
  const [height, setHeight] = useState("1920");

  // Render progress, 0–100. Undefined means we haven't started.
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Only a scene with shots has anything to render.
  const clips = scenes.map((scene) => ({ scene, shots: scene.shots?.length ?? 0 }));

  useEffect(() => {
    if (!show) return;
    setSelected(clips.filter((clip) => clip.shots > 0).map((clip) => clip.scene.id));
    setProgress(undefined);
  }, [show]);

  // Clear the ticker if the modal closes mid-render.
  useEffect(() => () => clearInterval(timer.current), []);

  const pickResolution = (value: string) => {
    setResolution(value);
    const [w, h] = value.split("x");
    setWidth(w);
    setHeight(h);
  };

  const swap = () => {
    setWidth(height);
    setHeight(width);
  };

  const toggle = (id: string) =>
    setSelected(selected.includes(id) ? selected.filter((ix) => ix !== id) : [...selected, id]);

  const startRender = () => {
    if (!selected.length) return;

    setProgress(0);
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setProgress((prev) => {
        const next = (prev ?? 0) + 4;
        if (next >= 100) clearInterval(timer.current);
        return Math.min(next, 100);
      });
    }, 200);
  };

  const cancel = () => {
    clearInterval(timer.current);
    setProgress(undefined);
    onClose();
  };

  const isRendering = progress !== undefined;
  // Which clip the progress bar is currently on.
  const currentClip = Math.min(Math.floor(((progress ?? 0) / 100) * selected.length) + 1, selected.length);
  const aspectLabel = aspectRatioOptions.find((ix) => ix.id === aspectRatio)?.label ?? aspectRatio;

  return (
    <Modal
      show={show}
      icon={MdOutlineFileUpload}
      title="Export"
      onClose={cancel}
      buttons={
        isRendering
          ? [
              { label: progress === 100 ? "Done" : "Rendering…", icon: MdPlayArrow, type: "Secondary", stretch: true, onClick: progress === 100 ? cancel : () => null },
              { label: "Cancel", type: "Tertiary", onClick: cancel },
            ]
          : [
              { label: "Start Render", icon: MdPlayArrow, type: "Primary", stretch: true, onClick: startRender },
              { label: "Cancel", type: "Tertiary", onClick: cancel },
            ]
      }
    >
      {isRendering ? (

        <div className="box py-8 gap-3">
          <p className="font-bold">Exporting {sceneLabel(scenes.find((ix) => ix.id === selected[currentClip - 1]) ?? scenes[0], locations)}</p>

          <div className="w-full h-1 rounded-full bg-zinc-700 overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>

          <p className="text-sm opacity-60">
            Clip {currentClip} of {selected.length} · <span className="font-bold">{progress}%</span>
          </p>
        </div>

      ) : (

        <div className="flex flex-row items-start gap-3">

          <section className="flex flex-col h-100 overflow-y-scroll grow gap-1">

            <div className="wrapper p-4 gap-2 flex flex-col">{clips.map(({ scene, shots }) => (
              <div key={scene.id} className={`border-b border-color  ${baseStyle.inlineRow} ${shots ? "" : "opacity-40"}`}>
                <div className="grow">
                  <Choice
                    id={`clip-${scene.id}`}
                    type="Checkbox"
                    size="S"
                    label={sceneLabel(scene, locations)}
                    subtitle={shots ? `${shots} shots` : "No shots to render"}
                    checked={selected.includes(scene.id)}
                    onClick={() => shots && toggle(scene.id)}
                  />
                </div>

                {!shots && <MdWarningAmber className="text-amber-400 shrink-0" />}
              </div>
            ))}</div>
          </section>

          <section className="flex flex-col grow w-1/3 gap-1">
            <Input
            id="exportResolution"
            type="select"
            label="Resolution"
            value={resolution}
            options={resolutionOptions}
            onChange={pickResolution}
          />


            <Input id="exportFormat" type="select" label="Format" value={format} options={videoFormatOptions} onChange={setFormat} />
            <Input id="exportFrameRate" type="select" label="Frame Rate" value={frameRate} options={frameRateOptions} onChange={setFrameRate} />

          <section className="flex flex-col gap-2 mt-3">
            <p className={baseStyle.inlineRow}>
              <span className="font-bold">Dimensions</span>
              <span className="opacity-60 text-sm">{aspectLabel} · {frameRate}fps</span>
            </p>

            <div className={`${baseStyle.inlineRow} items-center`}>
              <Input id="exportWidth" type="number" prefix="W" value={width} onChange={setWidth} />
              <Button type="Tertiary" size="Small" icon={MdSwapHoriz} onClick={swap} />
              <Input id="exportHeight" type="number" prefix="H" value={height} onChange={setHeight} />
            </div>
          </section>
          </section>

        </div>
      )}
    </Modal>
  );
}
