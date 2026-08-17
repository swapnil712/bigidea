"use client"

import { useEffect, useState } from "react";
import { MdOutlineViewAgenda } from "react-icons/md";
import AddToListModal from "@/components/local/AddToListModal";
import { PickerGroup } from "@/components/local/MultiPicker";
import { LocationProps, SceneProps } from "@/types/project";
import { sceneLabel } from "@/functions/sceneLabel";

interface AddSceneModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  scenes: SceneProps[];
  locations?: LocationProps[];
  onAdd: (sceneIds: string[]) => void;
}

export default function AddSceneModal({
  show,
  onClose,
  title,
  scenes,
  locations,
  onAdd,
}: AddSceneModalProps) {

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (show) setSelected([]);
  }, [show]);

  // One group per script day, in day order.
  const groups: PickerGroup[] = Object.entries(
    scenes.reduce<Record<number, SceneProps[]>>((days, scene) => {
      days[scene.scriptDay] = days[scene.scriptDay] || [];
      days[scene.scriptDay].push(scene);
      return days;
    }, {})
  ).map(([scriptDay, daysScenes]) => ({
    id: `day-${scriptDay}`,
    label: `Script Day ${scriptDay}`,
    options: daysScenes.map((scene) => ({ id: scene.id, label: sceneLabel(scene, locations) })),
  }));

  return (
    <AddToListModal
      show={show}
      onClose={onClose}
      id="scenePicker"
      title={title}
      icon={MdOutlineViewAgenda}
      confirmLabel="Add Scenes"
      label="Scenes"
      searchPlaceholder="Search scenes"
      emptyLabel="No scenes selected"
      groups={groups}
      selected={selected}
      onSelectedChange={setSelected}
      onAdd={onAdd}
    />
  );
}
