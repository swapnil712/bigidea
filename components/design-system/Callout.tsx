import { baseStyle } from "@/constants/styles";
import { IconType } from "react-icons";

interface CalloutProps {
  text: string;
  icon: IconType;
  showSubtitle: boolean;
  subtitle: string;
}


export const Callout = ({ text, icon: Icon, showSubtitle, subtitle }: CalloutProps) => {
  return (
    <div className={ baseStyle.inlineRow }>
      <Icon />
      <div className={ baseStyle.inlineCol }>
        <span>{text}</span>
        {showSubtitle && <span>{subtitle}</span>}
      </div>
    </div>
  );
};