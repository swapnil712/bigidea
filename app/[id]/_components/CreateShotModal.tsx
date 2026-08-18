"use client"

import { useEffect, useState } from "react";
import { MdOutlineVideocam } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { baseStyle } from "@/constants/styles";
import { cameraMovementOptions, focalLengthOptions, shotOptions } from "@/constants/plot";
import { CameraMovement, Shot, ShotType } from "@/types/project";

interface CreateShotModalProps {
  show: boolean;
  onClose: () => void;
  // The storyboard calls the same thing a frame, so the wording follows the
  // page it was opened from.
  noun?: string;
  onCreate: (shot: Shot) => void;
}

export default function CreateShotModal({
  show,
  onClose,
  noun = "Shot",
  onCreate,
}: CreateShotModalProps) {

  const [label, setLabel] = useState("");
  const [shotType, setShotType] = useState<ShotType>("wide");
  const [movement, setMovement] = useState<CameraMovement>("static");
  const [focalLength, setFocalLength] = useState(focalLengthOptions[2].id);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!show) return;
    setLabel("");
    setShotType("wide");
    setMovement("static");
    setFocalLength(focalLengthOptions[2].id);
    setDescription("");
  }, [show]);

  const create = () => {
    if (!label.trim()) return;

    onCreate({
      id: `shot-${Date.now()}`,
      label: label.trim().toUpperCase(),
      shotType,
      movement,
      focalLength: Number(focalLength),
      description: description.trim(),
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineVideocam}
      title={`Add a ${noun}`}
      onClose={onClose}
      buttons={[
        {
          label: `Create ${noun}`,
          icon: MdOutlineVideocam,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <Input
          id="newShotLabel"
          type="text"
          label={`Name of the ${noun}`}
          placeholder="LOW ANGLE WIDE"
          value={label}
          onChange={setLabel}
        />

        <Input
          id="newShotType"
          type="select"
          label="Shot / Angle"
          value={shotType}
          options={shotOptions}
          onChange={(value) => setShotType(value as ShotType)}
        />

        <div className={baseStyle.inlineRow}>
          <Input
            id="newShotMovement"
            type="select"
            label="Camera Movement"
            value={movement}
            options={cameraMovementOptions}
            onChange={(value) => setMovement(value as CameraMovement)}
          />
          <Input
            id="newShotFocalLength"
            type="select"
            label="Focal Length"
            value={focalLength}
            options={focalLengthOptions}
            onChange={setFocalLength}
          />
        </div>

        <Input
          id="newShotDescription"
          type="textarea"
          label="Description"
          hint="(optional)"
          value={description}
          onChange={setDescription}
        />

      </div>
    </Modal>
  );
}
