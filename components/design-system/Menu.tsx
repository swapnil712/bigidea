import { baseStyle } from "@/constants/styles";
import { IconType } from "react-icons";

type MenuSize = "L" | "S";

interface MenuProps {
  size?: MenuSize;
  href?: string;
  onClick?: () => void;
  active: boolean;
  label: string;
  hideLabel?: boolean;
  icon: IconType;
  rightIcon?: IconType;
  subtitle?: string;
}

const sizeStyles: Record<MenuSize, { text: string; icon: number }> = {
  L: { text: "", icon: 20 },
  S: { text: "text-sm", icon: 16 },
};

const activeStyles = {
  active: "bg-zinc-900 text-indigo-500 font-bold",
  inactive: "hover:bg-zinc-700 text-zinc-300",
};

export const Menu = ({
  size,
  active,
  label,
  icon: Icon,
  hideLabel,
  rightIcon: RightIcon,
  subtitle,
  onClick,
  href,
}: MenuProps) => {
  const isSize = size || "L";

  const menuContent = (
    <div
      data-size={isSize}
      data-active={active}
      title={ label }
      className={`p-3 rounded-lg block ${baseStyle.inlineRow} ${sizeStyles[isSize].text} ${
        active ? activeStyles.active : activeStyles.inactive
      }`}
    >
      {Icon && <Icon size={sizeStyles[isSize].icon} />}
      {!hideLabel && (
        <div className="flex flex-col">
          <span>{label}</span>
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
      {RightIcon && <RightIcon size={sizeStyles[isSize].icon} />}
    </div>
  );

  return href ? (
    <a href={href}>{menuContent}</a>
  ) : (
    <button type="button" onClick={onClick}>
      {menuContent}
    </button>
  );
};