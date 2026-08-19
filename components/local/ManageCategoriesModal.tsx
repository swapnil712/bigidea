"use client"

import { useEffect, useState } from "react";
import { MdAdd, MdCheck, MdDelete, MdOutlineLabel } from "react-icons/md";
import Modal from "./Modal";
import { Button } from "../design-system/Button";
import { Input } from "../design-system/Input";
import { OptionType } from "@/constants/choices";

interface ManageCategoriesModalProps {
  show: boolean;
  onClose: () => void;
  // "Asset Categories", "Character Roles" — whatever this taxonomy is called.
  title: string;
  // Singular name of one entry, for the button and the note.
  term?: string;
  // Plural name of the things filed under it, for the note.
  noun: string;
  categories: OptionType[];
  // Ids still in use, so an occupied category can't be removed out from under
  // the items sitting in it.
  usedIds?: string[];
  onSave: (categories: OptionType[]) => void;
}

// "Set Dressing" -> "set-dressing", so a new category reads like the existing ids.
const slug = (label: string) =>
  label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function ManageCategoriesModal({
  show,
  onClose,
  title,
  term = "category",
  noun,
  categories,
  usedIds = [],
  onSave,
}: ManageCategoriesModalProps) {

  const [draft, setDraft] = useState<OptionType[]>([]);

  useEffect(() => {
    if (show) setDraft(categories);
  }, [show]);

  const rename = (id: string, label: string) =>
    setDraft(draft.map((ix) => (ix.id === id ? { ...ix, label } : ix)));

  const remove = (id: string) => setDraft(draft.filter((ix) => ix.id !== id));

  const add = () => setDraft([...draft, { id: `cat-${Date.now()}`, label: "" }]);

  const save = () => {
    // Drop blanks, and give anything new an id derived from what was typed.
    onSave(
      draft
        .filter((ix) => ix.label.trim())
        .map((ix) => (ix.id.startsWith("cat-") ? { id: slug(ix.label) || ix.id, label: ix.label.trim() } : ix))
    );
    onClose();
  };

  return (
    <Modal
      show={show}
      size="S"
      icon={MdOutlineLabel}
      title={title}
      onClose={onClose}
      buttons={[
        { label: "Save Changes", icon: MdCheck, type: "Primary", stretch: true, onClick: save },
      ]}
    >
      <div className="flex flex-col gap-3">

        {draft.map((category) => {
          const inUse = usedIds.includes(category.id);

          return (
            <div key={category.id} className="flex flex-row items-end gap-2">
              <Input
                id={`category-${category.id}`}
                type="text"
                placeholder="Category name"
                value={category.label}
                onChange={(value) => rename(category.id, value)}
              />

              {inUse ? (
                <span className="text-xs opacity-40 p-3 whitespace-nowrap">in use</span>
              ) : (
                <Button type="Tertiary" icon={MdDelete} onClick={() => remove(category.id)} />
              )}
            </div>
          );
        })}

        <Button type="Inline" size="Small" icon={MdAdd} label={`Add a ${term}`} onClick={add} />

        <p className="text-sm opacity-60">
          Renaming a {term} updates it everywhere. A {term} holding {noun} can&apos;t be removed.
        </p>

      </div>
    </Modal>
  );
}
