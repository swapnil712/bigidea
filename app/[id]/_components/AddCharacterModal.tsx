"use client"

import { useEffect, useState } from "react";
import { MdOutlineCheckroom, MdOutlineInventory2, MdPersonAddAlt } from "react-icons/md";
import Modal from "@/components/local/Modal";
import MultiPicker, { PickerGroup } from "@/components/local/MultiPicker";
import { Input } from "@/components/design-system/Input";
import { toOptions } from "@/functions/toOptions";
import { wardrobeCategoryOptions } from "@/constants/plot";
import {
  CharacterLookInSceneProps,
  CharacterProps,
  CharacterWardrobeItem,
  PropProps,
} from "@/types/project";
import CreatePropModal from "./CreatePropModal";
import CreateWardrobeModal from "./CreateWardrobeModal";

interface AddCharacterModalProps {
  show: boolean;
  onClose: () => void;
  characters: CharacterProps[];
  wardrobe: CharacterWardrobeItem[];
  props: PropProps[];
  onAdd: (entry: CharacterLookInSceneProps) => void;
  onCreateWardrobe: (item: CharacterWardrobeItem) => void;
  onCreateProp: (prop: PropProps) => void;
}

// "Sarah \"Booker\" Petree" -> "Sarah", so the picker can say "Sarah's Wardrobe".
const firstName = (name?: string) => name?.trim().split(" ")[0] ?? "This character";

export default function AddCharacterModal({
  show,
  onClose,
  characters,
  wardrobe,
  props,
  onAdd,
  onCreateWardrobe,
  onCreateProp,
}: AddCharacterModalProps) {

  const [characterId, setCharacterId] = useState<string | undefined>(undefined);
  const [wardrobeIds, setWardrobeIds] = useState<string[]>([]);
  const [propIds, setPropIds] = useState<string[]>([]);
  // Hold the name typed in the search box while a create form is open.
  const [createWardrobeName, setCreateWardrobeName] = useState<string | undefined>(undefined);
  const [createPropName, setCreatePropName] = useState<string | undefined>(undefined);

  const select = (id?: string) => {
    setCharacterId(id);
    const character = characters.find((ix) => ix.id === id);
    setWardrobeIds(character?.wardrobe ?? []);
    setPropIds(character?.props ?? []);
  };

  // Opening the modal starts on the first available character with that
  // character's own wardrobe and props already ticked.
  useEffect(() => {
    if (show) select(characters[0]?.id);
  }, [show]);

  const character = characters.find((ix) => ix.id === characterId);
  const owner = firstName(character?.name);

  const groups = <T extends { id: string; name: string; originCharacter?: string }>(
    items: T[],
    noun: string,
    addNewLabel: string
  ): PickerGroup[] => [
    {
      id: "own",
      label: `${owner}'s ${noun}`,
      options: toOptions(items.filter((ix) => ix.originCharacter === characterId)),
      addNewLabel,
    },
    {
      id: "other",
      label: `Everyone Else's ${noun}`,
      options: toOptions(items.filter((ix) => ix.originCharacter !== characterId)),
    },
  ];

  const add = () => {
    if (!characterId) return;
    onAdd({
      id: characterId,
      look: "Default look",
      wardrobe: wardrobeIds,
      props: propIds,
      tags: [],
    });
    onClose();
  };

  return (
    <>
      <Modal
        show={show}
        size="S"
        icon={MdPersonAddAlt}
        title="Add Character to Scene"
        onClose={onClose}
        buttons={[
          {
            label: "Add Character",
            icon: MdPersonAddAlt,
            type: "Primary",
            stretch: true,
            onClick: add,
          },
        ]}
      >
        <div className="flex flex-col gap-4">

          {characters.length === 0 ? (
            <p className="opacity-60 text-sm">Every character is already in this scene.</p>
          ) : (
            <Input
              id="sceneCharacter"
              type="select"
              label="Select Character from List"
              value={characterId}
              options={toOptions(characters)}
              onChange={select}
            />
          )}

          <MultiPicker
            id="sceneWardrobe"
            label="Wardrobe"
            hint="(add multiple)"
            tone="Violet"
            capsuleIcon={MdOutlineCheckroom}
            searchPlaceholder="Search wardrobe"
            emptyLabel="No wardrobe selected"
            groups={groups(wardrobe, "Wardrobe", "Add New Wardrobe")}
            selected={wardrobeIds}
            onChange={setWardrobeIds}
            onAddNew={(_, name) => setCreateWardrobeName(name)}
          />

          <MultiPicker
            id="sceneCharacterProps"
            label="Props"
            hint="(add multiple)"
            tone="Amber"
            capsuleIcon={MdOutlineInventory2}
            searchPlaceholder="Search props"
            emptyLabel="No props selected"
            groups={groups(props, "Props", "Add New Prop")}
            selected={propIds}
            onChange={setPropIds}
            onAddNew={(_, name) => setCreatePropName(name)}
          />

        </div>
      </Modal>

      <CreateWardrobeModal
        show={createWardrobeName !== undefined}
        onClose={() => setCreateWardrobeName(undefined)}
        initialName={createWardrobeName}
        characters={characters}
        categories={wardrobeCategoryOptions}
        defaultCharacter={characterId}
        onCreate={(item) => {
          onCreateWardrobe(item);
          setWardrobeIds((prev) => [...prev, item.id]);
        }}
      />

      <CreatePropModal
        show={createPropName !== undefined}
        onClose={() => setCreatePropName(undefined)}
        initialName={createPropName}
        characters={characters}
        defaultCharacter={characterId}
        onCreate={(prop) => {
          onCreateProp(prop);
          setPropIds((prev) => [...prev, prop.id]);
        }}
      />
    </>
  );
}
