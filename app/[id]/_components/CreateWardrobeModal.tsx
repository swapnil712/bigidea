"use client"

import { useEffect, useState } from "react";
import { MdOutlineCheckroom } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { toOptions } from "@/functions/toOptions";
import { OptionType } from "@/constants/choices";
import { CharacterProps, CharacterWardrobeItem } from "@/types/project";

interface CreateWardrobeModalProps {
  show: boolean;
  onClose: () => void;
  // Whatever was typed in the picker's search box, used to seed the name.
  initialName?: string;
  characters: CharacterProps[];
  defaultCharacter?: string;
  categories: OptionType[];
  defaultCategory?: string;
  onCreate: (item: CharacterWardrobeItem) => void;
}

export default function CreateWardrobeModal({
  show,
  onClose,
  initialName,
  characters,
  defaultCharacter,
  categories,
  defaultCategory,
  onCreate,
}: CreateWardrobeModalProps) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [originCharacter, setOriginCharacter] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!show) return;
    setName(initialName ?? "");
    setCategory(defaultCategory ?? categories[0]?.id ?? "");
    setOriginCharacter(defaultCharacter ?? characters[0]?.id);
    setDescription("");
  }, [show]);

  const create = () => {
    if (!name.trim() || !originCharacter) return;

    onCreate({
      id: `wrd-${Date.now()}`,
      name: name.trim(),
      category,
      originCharacter,
      description: description.trim(),
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineCheckroom}
      title="Add a Wardrobe Item"
      onClose={onClose}
      buttons={[
        {
          label: "Create Wardrobe Item",
          icon: MdOutlineCheckroom,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <Input
          id="newWardrobeName"
          type="text"
          label="Name of the Item"
          placeholder="Reef Wetsuit"
          value={name}
          onChange={setName}
        />

        <Input
          id="newWardrobeCategory"
          type="select"
          label="Category"
          value={category}
          options={categories}
          onChange={setCategory}
        />

        <Input
          id="newWardrobeCharacter"
          type="select"
          label="Belongs to"
          value={originCharacter}
          options={toOptions(characters)}
          onChange={setOriginCharacter}
        />

        <Input
          id="newWardrobeDescription"
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
