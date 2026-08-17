"use client"
import { baseStyle } from "@/constants/styles";
import { IconType } from "react-icons";

type ButtonType = "Primary" | "Secondary" | "Tertiary" | "Inline";
type ButtonSize = "Small" | "Regular";

export interface ButtonProps {
  type: ButtonType;
  size?: ButtonSize;
  label?: string;
  icon?: IconType;
  href?: string,
  stretch?: boolean,
  onClick?: () => void;
}

const typeStyles: Record<ButtonType, string> = {
  Primary: "bg-indigo-800 hover:bg-indigo-700",
  Secondary: "bg-zinc-600 hover:bg-zinc-500",
  Tertiary: "bg-zinc-800 hover:bg-zinc-700",
  Inline: "text-left text-indigo-400 hover:bg-indigo-400/20"
};

const sizeStyles: Record<ButtonSize, string> = {
  Small: "p-2 gap-1 text-sm rounded",
  Regular: "p-3 rounded-lg gap-2",
};

export const Button = ({
  type,
  size,
  label,
  href,
  stretch,
  onClick,
  icon: Icon,
}: ButtonProps) => {

  const getSize = size ? size : "Regular"
  const typeClass = typeStyles[type];

  const buttonContent = <> { Icon && <Icon size={ getSize === "Small" ? 18 : 20 } />}
  { label && <span>{label}</span>}</>

  const buttonStyle = { className: `flex justify-center flex-row items-center cursor-pointer ${ stretch ? "grow w-full" : "" } ${ typeClass } ${sizeStyles[getSize]}` }

  return ( href ? <a href={ href } { ...buttonStyle }>{ buttonContent }</a> : <button onClick={ onClick } { ...buttonStyle } type="button">{ buttonContent }</button> );
};