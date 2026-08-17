import { formatOptions, genreOptions, aspectRatioOptions, visualStyleOptions } from "@/constants/choices";
import { intExtOptions, timeOfDayOptions, sceneSourceOptions } from "@/constants/plot";


type FormatId = (typeof formatOptions)[number]["id"];
type GenreId = (typeof genreOptions)[number]["id"];
type AspectRatioId = (typeof aspectRatioOptions)[number]["id"];
type VisualStyleId = (typeof visualStyleOptions)[number]["id"];

export type ProjectStatus = "working" | "issue" | "archived"
export type ScreenplayElementType =
  | "slugline"
  | "action"
  | "character"
  | "parenthetical"
  | "dialogue"
  | "transition";


export type CharacterRole = "protagonist" | "supporting" | "npc";
export type ShotType = "mid" | "wide" | "close"
export type WardrobeCategories = "everyday" | "formal" | "casual" | "action" | "uniform" | "sleepwear" | "special"
export type AssetCategories = "prop" | "vehicle" | "weapon" | "set-dressing" | "tech" | "animal"


export interface ProjectProps {
  id: string,
  title: string;
  status: ProjectStatus;
  type: FormatId;
  genre: GenreId;
  targetLength: number;
  aspectRatio: AspectRatioId;
  visualStyle: VisualStyleId;
  notes: string;
  created: Date;
  lastUpdated: Date;
  premise?: Record<string, string>;
  script?: ScreenplayElement[];
  scenes?: SceneProps[],
  characters?: CharacterProps[],
  wardrobe?: CharacterWardrobeItem[],
  props?: PropProps[],
  assets?: AssetProps[],
  locations?: LocationProps[]
}

export interface CharacterProps {
  id: string;
  name: string;
  role: CharacterRole;
  ageRange: string;
  gender: string;
  ethnicity: string;
  build: string;
  style: string;
  description: string;
  looks: CharacterLookInSceneProps["id"][];
  wardrobe: CharacterWardrobeItem["id"][];
  props: PropProps["id"][];
  referenceImages: CharacterReferenceImage["id"][];
}

export interface CharacterWardrobeItem {
  id: string;
  name: string;
  originCharacter: string;
  category: WardrobeCategories;
  referenceImages?: string[];
  description: string;
}

export interface AssetProps {
  id: string;
  name: string;
  category: AssetCategories;
  description: string;
  originScene?: SceneProps["id"];
  quantity: number;
  productionNotes: string;
  referenceImages?: string[];
}

export interface LocationProps {
  id: string;
  name: string;
  region: string;
  description: string;
  productionNotes: string;
  referenceImages?: string[];
}

export interface CharacterReferenceImage {
  id: string;
  url: string;
}

export interface PropProps {
  id: string;
  name: string;
  look: string;
  originCharacter?: CharacterProps["id"];
}

export interface CharacterLookInSceneProps {
  id: string;
  look: string;
  wardrobe: CharacterWardrobeItem["id"][]
  props?: PropProps["id"][]
  tags: string[]
}

export interface Shot {
  id: string;
  label: string;
  shotType: ShotType;
  description: string;
}



export type IntExt = (typeof intExtOptions)[number]["id"];
export type TimeOfDay = (typeof timeOfDayOptions)[number]["id"];
export type SceneSource = (typeof sceneSourceOptions)[number]["id"];

export interface SceneProps {
  id: string;
  intExt: IntExt;
  location: string;
  time: TimeOfDay;
  scriptDay: number;
  sceneSource: SceneSource;
  synopsis: string;
  emotionalBeat: string;
  productionNotes: string;
  characters?: CharacterLookInSceneProps[];
  props?: PropProps[];
  shots?: Shot[]
}

export interface ScreenplayElement {
  type: ScreenplayElementType;
  text: string;
}