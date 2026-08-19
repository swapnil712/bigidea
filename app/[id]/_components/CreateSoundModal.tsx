"use client"

import { useEffect, useState } from "react";
import { MdOutlineVolumeUp } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { OptionType } from "@/constants/choices";
import { SoundProps } from "@/types/project";

interface CreateSoundModalProps {
  show: boolean;
  onClose: () => void;
  categories: OptionType[];
  // Pre-set from the sidebar group the "+" was pressed in.
  defaultCategory?: string;
  onCreate: (sound: SoundProps) => void;
}

export default function CreateSoundModal({
  show,
  onClose,
  categories,
  defaultCategory,
  onCreate,
}: CreateSoundModalProps) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!show) return;
    setName("");
    setCategory(defaultCategory ?? categories[0]?.id ?? "");
    setDescription("");
  }, [show]);

  const create = () => {
    if (!name.trim()) return;

    onCreate({
      id: `snd-${Date.now()}`,
      name: name.trim(),
      category,
      description: description.trim(),
      productionNotes: "",
      scenes: [],
      referenceSounds: [],
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineVolumeUp}
      title="Add a Sound"
      onClose={onClose}
      buttons={[
        {
          label: "Create Sound",
          icon: MdOutlineVolumeUp,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <Input
          id="newSoundName"
          type="text"
          label="Name of the Sound"
          placeholder="Reef Ambience — Dawn"
          value={name}
          onChange={setName}
        />

        <Input
          id="newSoundCategory"
          type="select"
          label="Category"
          value={category}
          options={categories}
          onChange={setCategory}
        />

        <Input
          id="newSoundDescription"
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
