import { baseStyle } from "@/constants/styles";

interface TooltipProps {
  label: string;
  showKbd: boolean;
  kbd: string;
}


export const Tooltip = ({ label, showKbd, kbd }: TooltipProps) => {
  return (
    <div className={ baseStyle.inlineRow }>
      <span>{label}</span>
      {showKbd && <kbd>{kbd}</kbd>}
    </div>
  );
};