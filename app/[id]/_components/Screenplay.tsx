"use client"

import { useEffect, useRef, useState } from "react";
import { MdOutlineContentCut } from "react-icons/md";
import { Button } from "@/components/design-system/Button";
import { ScreenplayElement, ScreenplayElementType } from "@/types/project";

const screenplayStyles: Record<ScreenplayElementType, string> = {
  slugline: "mt-4",
  action: "mt-2",
  character: "text-center mt-5",
  parenthetical: "text-center",
  dialogue: "w-100 mx-auto mb-10",
  transition: "text-right",
};

interface ScreenplayProps {
  script: ScreenplayElement[];
  // Given the highlighted text when "New Scene" is pressed.
  onNewScene?: (selection: string) => void;
}

interface SelectionAnchor {
  text: string;
  top: number;
  left: number;
}

export default function Screenplay({ script, onNewScene }: ScreenplayProps) {

  const page = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<SelectionAnchor | undefined>(undefined);

  useEffect(() => {
    if (!onNewScene) return;

    // Read the selection after the pointer is released, and place the button
    // over the top edge of whatever was highlighted.
    const onSelect = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (!selection || selection.isCollapsed || !text) return setAnchor(undefined);
      if (!page.current?.contains(selection.anchorNode)) return setAnchor(undefined);

      const bounds = selection.getRangeAt(0).getBoundingClientRect();
      const pageBounds = page.current.getBoundingClientRect();

      setAnchor({
        text,
        top: bounds.top - pageBounds.top,
        left: bounds.left - pageBounds.left + bounds.width / 2,
      });
    };

    // Clearing the selection anywhere should take the button with it.
    const onClear = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) setAnchor(undefined);
    };

    document.addEventListener("mouseup", onSelect);
    document.addEventListener("keyup", onSelect);
    document.addEventListener("selectionchange", onClear);

    return () => {
      document.removeEventListener("mouseup", onSelect);
      document.removeEventListener("keyup", onSelect);
      document.removeEventListener("selectionchange", onClear);
    };
  }, [onNewScene]);

  return (
    <div ref={page} className="relative mx-auto w-4/5 bg-zinc-900 p-20 shadow-lg border border-color">

      {script.map((item, index) => (
        <div key={index}>
          <div className={`screenplay text-lg font-bold ${screenplayStyles[item.type]}`}>{item.text}</div>
        </div>
      ))}

      {anchor && onNewScene && (
        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-full -mt-2"
          style={{ top: anchor.top, left: anchor.left }}
          // Keep the highlight alive — mousedown would otherwise clear the
          // selection before the click lands.
          onMouseDown={(e) => e.preventDefault()}
        >
          <Button
            type="Secondary"
            size="Small"
            icon={MdOutlineContentCut}
            label="New Scene"
            onClick={() => onNewScene(anchor.text)}
          />
        </div>
      )}

    </div>
  );
}
