import { baseStyle } from "@/constants/styles";
import { ButtonProps, Button } from "../design-system/Button";

interface SectionHeaderProps {
  leftButton?: ButtonProps;
  label: string;
  rightButtons?: ButtonProps[];
}

export const SectionHeader = ({ leftButton, label, rightButtons }: SectionHeaderProps) => {
  return (
    <div className={`${ baseStyle.inlineRow } p-3 bg-zinc-800! grow border-b rounded-tr-lg border-color`}>
      { leftButton && <Button {...leftButton} /> }
      
      <p className="grow text-lg font-bold">{label}</p>

      <div className={`${ baseStyle.inlineRow } flex-wrap-reverse`}>
        { rightButtons && rightButtons.map((btn, i) => (
          <Button key={i} size="Small" {...btn} />
        ))}
      </div>
    </div>
  );
};