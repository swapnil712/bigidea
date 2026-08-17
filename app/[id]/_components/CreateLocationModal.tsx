"use client"

import { useEffect, useState } from "react";
import { MdOutlineRoom } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { LocationProps } from "@/types/project";

interface CreateLocationModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (location: LocationProps) => void;
}

export default function CreateLocationModal({
  show,
  onClose,
  onCreate,
}: CreateLocationModalProps) {

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!show) return;
    setName("");
    setRegion("");
    setDescription("");
  }, [show]);

  const create = () => {
    if (!name.trim()) return;

    onCreate({
      id: `loc-${Date.now()}`,
      name: name.trim(),
      region: region.trim(),
      description: description.trim(),
      productionNotes: "",
      referenceImages: [],
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineRoom}
      title="Add a Location"
      onClose={onClose}
      buttons={[
        {
          label: "Create Location",
          icon: MdOutlineRoom,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <Input
          id="newLocationName"
          type="text"
          label="Name of the Location"
          placeholder="Mangrove Channels"
          value={name}
          onChange={setName}
        />

        <Input
          id="newLocationRegion"
          type="text"
          label="Region"
          hint="(optional)"
          placeholder="Inland waterway behind the cayes"
          value={region}
          onChange={setRegion}
        />

        <Input
          id="newLocationDescription"
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
