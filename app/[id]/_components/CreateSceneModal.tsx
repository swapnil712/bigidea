"use client"

import { useEffect, useState } from "react";
import { MdOutlineViewAgenda } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { baseStyle } from "@/constants/styles";
import { intExtOptions, timeOfDayOptions } from "@/constants/plot";
import { toOptions } from "@/functions/toOptions";
import { IntExt, LocationProps, SceneProps, TimeOfDay } from "@/types/project";

interface CreateSceneModalProps {
  show: boolean;
  onClose: () => void;
  locations: LocationProps[];
  // Pre-set from the sidebar group the "+" was pressed in.
  defaultScriptDay?: number;
  onCreate: (scene: SceneProps) => void;
}

export default function CreateSceneModal({
  show,
  onClose,
  locations,
  defaultScriptDay,
  onCreate,
}: CreateSceneModalProps) {

  const [intExt, setIntExt] = useState<IntExt>("ext");
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [time, setTime] = useState<TimeOfDay>("day");
  const [scriptDay, setScriptDay] = useState("1");
  const [synopsis, setSynopsis] = useState("");

  useEffect(() => {
    if (!show) return;
    setIntExt("ext");
    setLocation(locations[0]?.id);
    setTime("day");
    setScriptDay(String(defaultScriptDay ?? 1));
    setSynopsis("");
  }, [show]);

  const create = () => {
    if (!location) return;

    onCreate({
      id: `scene-${Date.now()}`,
      intExt,
      location,
      time,
      scriptDay: Number(scriptDay) || 1,
      sceneSource: "manual",
      synopsis: synopsis.trim(),
      emotionalBeat: "",
      productionNotes: "",
      characters: [],
      props: [],
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineViewAgenda}
      title="Add a Scene"
      onClose={onClose}
      buttons={[
        {
          label: "Create Scene",
          icon: MdOutlineViewAgenda,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <div className={baseStyle.inlineRow}>
          <Input
            id="newSceneIntExt"
            type="select"
            label="INT/EXT"
            value={intExt}
            options={intExtOptions}
            onChange={setIntExt}
          />
          <Input
            id="newSceneTime"
            type="select"
            label="Time of Day"
            value={time}
            options={timeOfDayOptions}
            onChange={setTime}
          />
        </div>

        <Input
          id="newSceneLocation"
          type="select"
          label="Location"
          value={location}
          options={toOptions(locations)}
          onChange={setLocation}
        />

        <Input
          id="newSceneScriptDay"
          type="number"
          label="Script Day"
          value={scriptDay}
          onChange={setScriptDay}
        />

        <Input
          id="newSceneSynopsis"
          type="textarea"
          label="Scene Synopsis"
          hint="(optional)"
          value={synopsis}
          onChange={setSynopsis}
        />

      </div>
    </Modal>
  );
}
