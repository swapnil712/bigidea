import { IconType } from "react-icons";
import { MdOutlineAddBox, MdOutlineDescription, MdOutlineDryCleaning, MdOutlineFolder, MdOutlineGroups2, MdOutlineImage, MdOutlineMusicNote, MdOutlineRoom, MdOutlineViewAgenda, MdOutlineViewCarousel, MdOutlineViewTimeline, MdOutlineVolumeUp } from "react-icons/md";

interface NavItem {
  id: string;
  label: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  { id: "setup", label: "Setup", icon: MdOutlineFolder },
  { id: "premise", label: "Premise", icon: MdOutlineDescription },
  { id: "characters", label: "Characters", icon: MdOutlineGroups2 },
  { id: "scenes", label: "Scenes", icon: MdOutlineViewAgenda },
  { id: "storyboard", label: "Storyboard", icon: MdOutlineViewCarousel },
  { id: "wardrobe", label: "Wardrobe", icon: MdOutlineDryCleaning },
  { id: "assets", label: "Assets", icon: MdOutlineAddBox },
  { id: "locations", label: "Locations", icon: MdOutlineRoom },
  { id: "images", label: "Images", icon: MdOutlineImage },
  { id: "music", label: "Music", icon: MdOutlineMusicNote },
  { id: "sounds-foley", label: "Sounds & Foley", icon: MdOutlineVolumeUp },
  { id: "timeline", label: "Timeline", icon: MdOutlineViewTimeline },
];