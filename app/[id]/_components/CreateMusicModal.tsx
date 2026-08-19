"use client"

import { useEffect, useState } from "react";
import { MdOutlineMusicNote } from "react-icons/md";
import Modal from "@/components/local/Modal";
import { Input } from "@/components/design-system/Input";
import { OptionType } from "@/constants/choices";
import { MusicProps } from "@/types/project";

interface CreateMusicModalProps {
  show: boolean;
  onClose: () => void;
  categories: OptionType[];
  // Pre-set from the sidebar group the "+" was pressed in.
  defaultCategory?: string;
  onCreate: (track: MusicProps) => void;
}

export default function CreateMusicModal({
  show,
  onClose,
  categories,
  defaultCategory,
  onCreate,
}: CreateMusicModalProps) {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [mood, setMood] = useState("");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (!show) return;
    setName("");
    setCategory(defaultCategory ?? categories[0]?.id ?? "");
    setMood("");
    setPrompt("");
  }, [show]);

  const create = () => {
    if (!name.trim()) return;

    onCreate({
      id: `mus-${Date.now()}`,
      name: name.trim(),
      category,
      mood: mood.trim(),
      prompt: prompt.trim(),
      description: "",
      scenes: [],
    });

    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineMusicNote}
      title="Add a Track"
      onClose={onClose}
      buttons={[
        {
          label: "Create Track",
          icon: MdOutlineMusicNote,
          type: "Primary",
          stretch: true,
          onClick: create,
        },
      ]}
    >
      <div className="flex flex-col gap-4">

        <Input
          id="newMusicName"
          type="text"
          label="Name of the Track"
          placeholder="Mangrove Pursuit"
          value={name}
          onChange={setName}
        />

        <Input
          id="newMusicCategory"
          type="select"
          label="Category"
          value={category}
          options={categories}
          onChange={setCategory}
        />

        <Input
          id="newMusicMood"
          type="text"
          label="Mood"
          hint="(optional)"
          placeholder="Urgent, airless"
          value={mood}
          onChange={setMood}
        />

        <Input
          id="newMusicPrompt"
          type="textarea"
          label="Prompt"
          hint="(optional)"
          placeholder="Describe the instrumentation, tempo and feel…"
          value={prompt}
          onChange={setPrompt}
        />

      </div>
    </Modal>
  );
}
