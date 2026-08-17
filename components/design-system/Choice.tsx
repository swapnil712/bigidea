import { baseStyle } from "@/constants/styles";
import { IconType } from "react-icons";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

type ChoiceType = "Checkbox" | "Radio";
type ChoiceSize = "S" | "L";

interface ChoiceProps {
  id: string;
  type: ChoiceType;
  size?: ChoiceSize;
  label: string;
  rightIcon?: IconType;
  subtitle?: string;
  checked?: boolean;
  onClick?: () => void;
}

const ICONS = {
  Radio: { checked: MdRadioButtonChecked, unchecked: MdRadioButtonUnchecked },
  Checkbox: { checked: MdCheckBox, unchecked: MdCheckBoxOutlineBlank },
} as const;

const sizeStyles: Record<ChoiceSize, { row: string; icon: number }> = {
  S: { row: "text-sm my-1 gap-2", icon: 18 },
  L: { row: "my-3 gap-3", icon: 24 },
};

export const Choice = ({
  id,
  type,
  size,
  label,
  rightIcon: RightIcon,
  subtitle,
  checked = false,
  onClick,
}: ChoiceProps) => {
  const isSize = size || "L";
  const ChoiceIcon = ICONS[type][checked ? "checked" : "unchecked"];

  return (
    <button
      role={type === "Radio" ? "radio" : "checkbox"}
      aria-checked={checked}
      data-type={type}
      onClick={onClick}
      className={`${baseStyle.inlineRow} text-left items-start w-full ${sizeStyles[isSize].row} cursor-pointer`}
    >
      <ChoiceIcon size={sizeStyles[isSize].icon} className={checked ? "text-indigo-500" : ""} />

      <label htmlFor={id} className="flex flex-col grow cursor-pointer">
        <span className={ checked ? "font-bold" : "" }>{label}</span>
        {subtitle && <span className="opacity-60">{subtitle}</span>}
      </label>

      {RightIcon && <RightIcon />}
    </button>
  );
};
