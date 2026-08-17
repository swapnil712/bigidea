"use client"

import { useEffect, useState } from "react";
import { MdOutlineInventory2 } from "react-icons/md";
import Modal from "@/components/local/Modal";
import MultiPicker, { PickerGroup } from "@/components/local/MultiPicker";
import { toOptions } from "@/functions/toOptions";
import { CharacterProps, PropProps } from "@/types/project";

interface AddPropModalProps {
  show: boolean;
  onClose: () => void;
  characters: CharacterProps[];
  props: PropProps[];
  onAdd: (propIds: string[]) => void;
  onCreateProp: (name: string, characterId?: string) => PropProps;
}

const firstName = (name?: string) => name?.trim().split(" ")[0] ?? "Character";

export default function AddPropModal({
  show,
  onClose,
  characters,
  props,
  onAdd,
  onCreateProp,
}: AddPropModalProps) {

  const [propIds, setPropIds] = useState<string[]>([]);

  useEffect(() => {
    if (show) setPropIds([]);
  }, [show]);

  // One group per character who owns props, plus a catch-all for the rest.
  const groups: PickerGroup[] = [
    ...characters
      .map((character) => ({
        id: character.id,
        label: `${firstName(character.name)}'s Props`,
        options: toOptions(props.filter((ix) => ix.originCharacter === character.id)),
      }))
      .filter((group) => group.options.length > 0),
    {
      id: "unassigned",
      label: "Everyone Else's Props",
      options: toOptions(
        props.filter((ix) => !ix.originCharacter || !characters.some((c) => c.id === ix.originCharacter))
      ),
      addNewLabel: "Add New Prop",
    },
  ];

  const add = () => {
    if (!propIds.length) return;
    onAdd(propIds);
    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineInventory2}
      title="Add Props to Scene"
      onClose={onClose}
      buttons={[
        {
          label: "Add Props",
          icon: MdOutlineInventory2,
          type: "Primary",
          stretch: true,
          onClick: add,
        },
      ]}
    >
      <MultiPicker
        id="sceneProps"
        label="Props"
        hint="(add multiple)"
        tone="Amber"
        capsuleIcon={MdOutlineInventory2}
        searchPlaceholder="Search props"
        emptyLabel="No props selected"
        groups={groups}
        selected={propIds}
        onChange={setPropIds}
        onAddNew={(_, name) => {
          const created = onCreateProp(name || "New Prop");
          setPropIds([...propIds, created.id]);
        }}
      />
    </Modal>
  );
}
