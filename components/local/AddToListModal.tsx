"use client"

import { IconType } from "react-icons";
import Modal from "@/components/local/Modal";
import MultiPicker, { PickerGroup } from "@/components/local/MultiPicker";

type PickerTone = "Neutral" | "Violet" | "Amber";

interface AddToListModalProps {
  show: boolean;
  onClose: () => void;
  id: string;
  title: string;
  icon: IconType;
  confirmLabel: string;
  label: string;
  tone?: PickerTone;
  capsuleIcon?: IconType;
  searchPlaceholder?: string;
  emptyLabel?: string;
  groups: PickerGroup[];
  // Selection is controlled so the caller can tick an item it has just created
  // in a follow-up "create" modal.
  selected: string[];
  onSelectedChange: (ids: string[]) => void;
  onAdd: (ids: string[]) => void;
  // Fired when the picker's "add new" is used — the caller opens its own create
  // form, seeded with whatever was typed in the search box.
  onRequestCreate?: (name: string) => void;
}

export default function AddToListModal({
  show,
  onClose,
  id,
  title,
  icon,
  confirmLabel,
  label,
  tone,
  capsuleIcon,
  searchPlaceholder,
  emptyLabel,
  groups,
  selected,
  onSelectedChange,
  onAdd,
  onRequestCreate,
}: AddToListModalProps) {

  const add = () => {
    if (!selected.length) return;
    onAdd(selected);
    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={icon}
      title={title}
      onClose={onClose}
      buttons={[
        {
          label: confirmLabel,
          icon,
          type: "Primary",
          stretch: true,
          onClick: add,
        },
      ]}
    >
      <MultiPicker
        id={id}
        label={label}
        hint="(add multiple)"
        tone={tone}
        capsuleIcon={capsuleIcon}
        searchPlaceholder={searchPlaceholder}
        emptyLabel={emptyLabel}
        groups={groups}
        selected={selected}
        onChange={onSelectedChange}
        onAddNew={onRequestCreate && ((_, name) => onRequestCreate(name))}
      />
    </Modal>
  );
}
