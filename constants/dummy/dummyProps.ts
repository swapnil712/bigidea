import { PropProps } from "@/types/project";

// The prop catalogue a scene can pull from. `originCharacter` is what groups a
// prop under "<Name>'s Props" versus "Everyone Else's Props" in the pickers.
export const dummyProps: PropProps[] = [
  { id: "prp-1", name: "Autonomous Camera Drone", look: "Default look", originCharacter: "char-1" },
  { id: "prp-2", name: "Drone SD Card", look: "Default look", originCharacter: "char-1" },
  { id: "prp-3", name: "Cracked Phone", look: "Default look", originCharacter: "char-1" },
  { id: "prp-4", name: "Sam's Paddleboard", look: "Default look", originCharacter: "char-1" },
  { id: "prp-5", name: "Solar Battery Bank", look: "Default look", originCharacter: "char-1" },
  { id: "prp-6", name: "Dani's Field Notebooks", look: "Default look", originCharacter: "char-2" },
  { id: "prp-7", name: "Reef Sample Vials", look: "Default look", originCharacter: "char-2" },
  { id: "prp-8", name: "Contractor's Sidearm", look: "Holstered", originCharacter: "char-3" },
  { id: "prp-9", name: "Unmarked Radio", look: "Default look", originCharacter: "char-3" },
  { id: "prp-10", name: "Company Tablet", look: "Default look", originCharacter: "char-4" },
  { id: "prp-11", name: "Satellite Phone", look: "Default look", originCharacter: "char-4" },
  { id: "prp-12", name: "Research Marker Buoy", look: "Default look" },
  { id: "prp-13", name: "Fishing Village Skiff", look: "Default look" },
];
