"use client"

import { useEffect, useState } from "react";
import { MdOutlineInventory2 } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { toOptions } from "@/functions/toOptions";
import { CharacterProps, PropProps } from "@/types/project";

interface CreatePropModalProps {
  show: boolean;
  onClose: () => void;
  // Whatever was typed in the picker's search box, used to seed the name.
  initialName?: string;
  characters: CharacterProps[];
  defaultCharacter?: string;
  onCreate: (prop: PropProps) => void;
}

export default function CreatePropModal({
  show,
  onClose,
  initialName,
  characters,
  defaultCharacter,
  onCreate,
}: CreatePropModalProps) {

  const [name, setName] = useState("");
  const [look, setLook] = useState("Default look");
  const [originCharacter, setOriginCharacter] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!show) return;
    setName(initialName ?? "");
    setLook("Default look");
    setOriginCharacter(defaultCharacter);
  }, [show]);

  const create = () => {
    if (!name.trim()) return;

    onCreate({
      id: `prp-${Date.now()}`,
      name: name.trim(),
      look: look.trim() || "Default look",
      originCharacter,
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineInventory2}
      title="Add a Prop"
      onClose={onClose}
      buttons={[
        {
          label: "Create Prop",
          icon: MdOutlineInventory2,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <Input
          id="newPropName"
          type="text"
          label="Name of the Prop"
          placeholder="Drone SD Card"
          value={name}
          onChange={setName}
        />

        <Input
          id="newPropLook"
          type="text"
          label="Look"
          value={look}
          onChange={setLook}
        />

        <Input
          id="newPropCharacter"
          type="select"
          label="Belongs to"
          hint="(optional)"
          value={originCharacter}
          options={[{ id: "", label: "Nobody in particular" }, ...toOptions(characters)]}
          onChange={(value) => setOriginCharacter(value || undefined)}
        />

      </div>
    </Modal>
  );
}
