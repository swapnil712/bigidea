import { IconType } from "react-icons";
import { MdBorderVertical, MdLineAxis, MdOutlineAddBox, MdOutlineDescription, MdOutlineDryCleaning, MdOutlineFolder, MdOutlineGroups2, MdOutlineImage, MdOutlineMusicNote, MdOutlineRoom, MdOutlineViewAgenda, MdOutlineViewCarousel, MdOutlineViewTimeline, MdOutlineVolumeUp } from "react-icons/md";

interface NavItem {
  id: string;
  label: string;
  icon?: IconType;
}

export const navItems: NavItem[] = [
  { id: "setup", label: "Setup", icon: MdOutlineFolder },
  { id: "hsep0", label: "hsep" },
  { id: "premise", label: "Premise", icon: MdOutlineDescription },
  { id: "characters", label: "Characters", icon: MdOutlineGroups2 },
  { id: "scenes", label: "Scenes", icon: MdOutlineViewAgenda },
  { id: "hsep1", label: "hsep" },
  { id: "storyboard", label: "Storyboard", icon: MdOutlineViewCarousel },
  { id: "images", label: "Previz Images", icon: MdOutlineImage },
  { id: "music", label: "Music", icon: MdOutlineMusicNote },
  { id: "hsep2", label: "hsep" },
  { id: "wardrobe", label: "Wardrobe", icon: MdOutlineDryCleaning },
  { id: "assets", label: "Assets", icon: MdOutlineAddBox },
  { id: "locations", label: "Locations", icon: MdOutlineRoom },
  { id: "sounds-foley", label: "Sounds & Foley", icon: MdOutlineVolumeUp }
];