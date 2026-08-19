"use client"

import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { baseStyle } from "@/constants/styles";
import { OptionType } from "@/constants/choices";
import { AssetProps } from "@/types/project";

interface CreateAssetModalProps {
  show: boolean;
  onClose: () => void;
  categories: OptionType[];
  // Pre-set from the sidebar group the "+" was pressed in.
  defaultCategory?: string;
  onCreate: (asset: AssetProps) => void;
}

export default function CreateAssetModal({
  show,
  onClose,
  categories,
  defaultCategory,
  onCreate,
}: CreateAssetModalProps) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!show) return;
    setName("");
    setCategory(defaultCategory ?? categories[0]?.id ?? "");
    setQuantity("1");
    setDescription("");
  }, [show]);

  const create = () => {
    if (!name.trim()) return;

    onCreate({
      id: `ast-${Date.now()}`,
      name: name.trim(),
      category,
      quantity: Number(quantity) || 1,
      description: description.trim(),
      productionNotes: "",
      scenes: [],
      referenceImages: [],
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineAddBox}
      title="Add an Asset"
      onClose={onClose}
      buttons={[
        {
          label: "Create Asset",
          icon: MdOutlineAddBox,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <Input
          id="newAssetName"
          type="text"
          label="Name of the Asset"
          placeholder="Research Marker Buoy"
          value={name}
          onChange={setName}
        />

        <div className={baseStyle.inlineRow}>
          <Input
            id="newAssetCategory"
            type="select"
            label="Category"
            value={category}
            options={categories}
            onChange={setCategory}
          />
          <Input
            id="newAssetQuantity"
            type="number"
            label="Quantity"
            value={quantity}
            onChange={setQuantity}
          />
        </div>

        <Input
          id="newAssetDescription"
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
