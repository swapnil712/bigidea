import { IconType } from "react-icons";
import { MdClose } from "react-icons/md";
import { Capsule } from "./Capsule";
import { baseStyle } from "@/constants/styles";

type HeadingsType = "Module" | "Segment";

interface HeadingsProps {
  type: HeadingsType;
  leftIcon?: IconType;
  label: string;
  capsuleLabel?: string;
  onClose: () => void;
}

const typeStyles: Record<HeadingsType, string> = {
  Module: "border-b border-color p-3",
  Segment: "",
};

export const Headings = ({
  type,
  leftIcon: Icon,
  label,
  capsuleLabel,
  onClose,
}: HeadingsProps) => {



  return (
    <div data-type={type} className={`${ baseStyle.inlineRow } ${typeStyles[type]}`}>
      {Icon && <Icon size={ 20 } />}
      <h2 className="font-bold">{label}</h2>
      { capsuleLabel &&  <Capsule type="Blob" label={capsuleLabel} /> }
      <div className="flex-1" />
      <button
        type="button"
        aria-label="Close"
        onClick={ onClose }
        className="cursor-pointer rounded p-1 opacity-60 hover:opacity-100 hover:bg-zinc-700"
      >
        <MdClose size={ 20 } />
      </button>
    </div>
  );



};