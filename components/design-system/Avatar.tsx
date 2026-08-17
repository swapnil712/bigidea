import { baseStyle } from "@/constants/styles";
import { IconType } from "react-icons";

type AvatarType = "Image" | "Initials" | "Icon";

interface AvatarProps {
  type: AvatarType;
  icon?: IconType;
  initial?: string;
  imageSrc?: string;
}

const typeStyles: Record<AvatarType, string> = {
  Image: "overflow-hidden",
  Initials: "bg-purple-500  font-bold",
  Icon: "bg-zinc-700",
};

export const Avatar = ({ type, icon: Icon, initial, imageSrc }: AvatarProps) => {
  return (
    <div data-type={type} className={`${ baseStyle.inlineRow } w-9 h-9 justify-center rounded-full ${typeStyles[type]}`}>
      {type === "Image" && imageSrc && <img src={imageSrc} alt="" />}
      {type === "Initials" && initial && <span>{initial}</span>}
      {type === "Icon" && Icon && <Icon />}
    </div>
  );
};