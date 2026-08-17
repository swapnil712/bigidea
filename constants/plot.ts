import { OptionType } from "./choices";

export type PremiseFieldType = "text" | "textarea";

export interface PremiseFieldSchema extends OptionType {
  type: PremiseFieldType;
}

export const premiseFields: PremiseFieldSchema[] = [
  { id: "premiseStatement", label: "Premise Statement", type: "textarea" },
  { id: "logline", label: "Logline", type: "textarea" },
  { id: "genre", label: "Genre", type: "text" },
  { id: "targetAudience", label: "Target Audience", type: "text" },
  { id: "tone", label: "Tone", type: "textarea" },
  { id: "setting", label: "Setting", type: "textarea" },
  { id: "language", label: "Language", type: "text" },
  { id: "coreConflict", label: "Core Conflict", type: "textarea" },
  { id: "synopsis", label: "Synopsis", type: "textarea" },
  { id: "themes", label: "Themes", type: "textarea" },
  { id: "worldRules", label: "World Rules", type: "textarea" },
];

export const intExtOptions: OptionType[] = [
  { id: "int", label: "INT" },
  { id: "ext", label: "EXT" },
  { id: "int-ext", label: "INT/EXT" },
];

export const timeOfDayOptions: OptionType[] = [
  { id: "day", label: "Day" },
  { id: "night", label: "Night" },
  { id: "dawn", label: "Dawn" },
  { id: "dusk", label: "Dusk" },
];

export const sceneSourceOptions: OptionType[] = [
  { id: "manual", label: "Manual" },
  { id: "ai", label: "AI-Generated" }
];

export const ageRangeOptions: OptionType[] = [
  { id: "child", label: "0 - 12" },
  { id: "teen", label: "13 - 19" },
  { id: "20-29", label: "20 - 29" },
  { id: "30-40", label: "30 - 40" },
  { id: "40-50", label: "40 - 50" },
  { id: "50-65", label: "50 - 65" },
  { id: "65-plus", label: "65+" },
];

export const characterRoleOptions: OptionType[] = [
  { id: "protagonist", label: "Protagonist" },
  { id: "supporting", label: "Supporting" },
  { id: "npc", label: "Non-Playing/Extra" },
];

export const genderOptions: OptionType[] = [
  { id: "female", label: "Female" },
  { id: "male", label: "Male" },
  { id: "non-binary", label: "Non-binary" },
  { id: "unspecified", label: "Unspecified" },
];


export const wardrobeCategoryOptions: OptionType[] = [
  { id: "everyday", label: "Everyday" },
  { id: "formal", label: "Formal" },
  { id: "casual", label: "Casual" },
  { id: "action", label: "Action/Stunt" },
  { id: "uniform", label: "Uniform" },
  { id: "sleepwear", label: "Sleepwear" },
  { id: "special", label: "Special" },
];

export const assetCategoryOptions: OptionType[] = [
  { id: "prop", label: "Hand Prop" },
  { id: "vehicle", label: "Vehicle" },
  { id: "weapon", label: "Weapon" },
  { id: "set-dressing", label: "Set Dressing" },
  { id: "tech", label: "Tech/Device" },
  { id: "animal", label: "Animal/Creature" },
];

export const shotOptions: OptionType[] = [
  { id: "mid", label: "Medium Closeup" },
  { id: "close", label: "Closeup" },
  { id: "wide", label: "Wide" }
];