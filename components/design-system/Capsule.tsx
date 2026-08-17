import { baseStyle } from "@/constants/styles";
import { IconType } from "react-icons";
import { MdClose } from "react-icons/md";

type CapsuleType = "Blob" | "Tag" | "Removable";
type CapsuleTone = "Neutral" | "Violet" | "Amber";

interface CapsuleProps {
  type: CapsuleType;
  tone?: CapsuleTone;
  label: string;
  leftIcon?: IconType;
  onRemove?: () => void;
}

const toneStyles: Record<CapsuleTone, { blob: string; outline: string }> = {
  Neutral: { blob: "bg-zinc-700", outline: "border-zinc-600 text-zinc-200" },
  Violet: { blob: "bg-violet-500/20 text-violet-300", outline: "border-violet-500/60 text-violet-300" },
  Amber: { blob: "bg-amber-500/20 text-amber-300", outline: "border-amber-500/60 text-amber-300" },
};

const typeStyles: Record<CapsuleType, string> = {
  Blob: "px-2 py-0.5",
  Tag: "border px-2 py-0.5",
  Removable: "border px-2 py-0.5",
};

export const Capsule = ({ type, tone, label, leftIcon: Icon, onRemove }: CapsuleProps) => {
  const isTone = tone || "Neutral";
  const toneClass = type === "Blob" ? toneStyles[isTone].blob : toneStyles[isTone].outline;

  return (
    <span
      data-type={type}
      className={`${baseStyle.inlineRow} gap-1 text-xs whitespace-nowrap rounded-full ${typeStyles[type]} ${toneClass}`}
    >
      {Icon && <Icon size={14} />}
      {label}
      {type === "Removable" && onRemove && (
        <button type="button" aria-label={`Remove ${label}`} onClick={onRemove} className="cursor-pointer opacity-60 hover:opacity-100">
          <MdClose size={14} />
        </button>
      )}
    </span>
  );
};
