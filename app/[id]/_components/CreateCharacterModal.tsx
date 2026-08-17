"use client"

import { useEffect, useState } from "react";
import { MdPersonAddAlt } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { baseStyle } from "@/constants/styles";
import { ageRangeOptions, characterRoleOptions, genderOptions } from "@/constants/plot";
import { CharacterProps, CharacterRole } from "@/types/project";

interface CreateCharacterModalProps {
  show: boolean;
  onClose: () => void;
  // Pre-set from the sidebar group the "+" was pressed in.
  defaultRole?: CharacterRole;
  onCreate: (character: CharacterProps) => void;
}

export default function CreateCharacterModal({
  show,
  onClose,
  defaultRole,
  onCreate,
}: CreateCharacterModalProps) {

  const [name, setName] = useState("");
  const [role, setRole] = useState<CharacterRole>("supporting");
  const [ageRange, setAgeRange] = useState(ageRangeOptions[2].id);
  const [gender, setGender] = useState(genderOptions[0].id);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!show) return;
    setName("");
    setRole(defaultRole ?? "supporting");
    setAgeRange(ageRangeOptions[2].id);
    setGender(genderOptions[0].id);
    setDescription("");
  }, [show]);

  const create = () => {
    if (!name.trim()) return;

    onCreate({
      id: `char-${Date.now()}`,
      name: name.trim(),
      role,
      ageRange,
      gender,
      ethnicity: "",
      build: "",
      style: "",
      description: description.trim(),
      looks: [],
      wardrobe: [],
      props: [],
      referenceImages: [],
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdPersonAddAlt}
      title="Add a Character"
      onClose={onClose}
      buttons={[
        {
          label: "Create Character",
          icon: MdPersonAddAlt,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <Input
          id="newCharacterName"
          type="text"
          label="Name of the Character"
          placeholder="Dani"
          value={name}
          onChange={setName}
        />

        <Input
          id="newCharacterRole"
          type="select"
          label="Role"
          value={role}
          options={characterRoleOptions}
          onChange={(value) => setRole(value as CharacterRole)}
        />

        <div className={baseStyle.inlineRow}>
          <Input
            id="newCharacterAgeRange"
            type="select"
            label="Age Range"
            value={ageRange}
            options={ageRangeOptions}
            onChange={setAgeRange}
          />
          <Input
            id="newCharacterGender"
            type="select"
            label="Gender"
            value={gender}
            options={genderOptions}
            onChange={setGender}
          />
        </div>

        <Input
          id="newCharacterDescription"
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
