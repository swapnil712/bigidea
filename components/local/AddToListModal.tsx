"use client"

import { useEffect, useState } from "react";
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
  onAdd: (ids: string[]) => void;
  // Creates a fresh item from whatever was typed and returns its id, so the
  // picker can tick it straight away.
  onCreate?: (name: string, groupId: string) => string | undefined;
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
  onAdd,
  onCreate,
}: AddToListModalProps) {

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (show) setSelected([]);
  }, [show]);

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
        onChange={setSelected}
        onAddNew={
          onCreate &&
          ((groupId, name) => {
            const created = onCreate(name, groupId);
            if (created) setSelected((prev) => [...prev, created]);
          })
        }
      />
    </Modal>
  );
}
