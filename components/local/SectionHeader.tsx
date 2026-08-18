import { baseStyle } from "@/constants/styles";
import { ButtonProps, Button } from "../design-system/Button";
import { DocumentVersion } from "@/types/project";
import ActionMenu, { MenuAction } from "./ActionMenu";
import VersionMenu from "./VersionMenu";

interface SectionHeaderProps {
  leftButton?: ButtonProps;
  // Newest first. When present it replaces leftButton with the history menu.
  versions?: DocumentVersion[];
  onSelectVersion?: (id: string) => void;
  onDownloadVersion?: (id: string) => void;
  label: string;
  rightButtons?: ButtonProps[];
  // Overflow actions, rendered as a ⋮ after the right buttons.
  menu?: MenuAction[];
}

export const SectionHeader = ({
  leftButton,
  versions,
  onSelectVersion,
  onDownloadVersion,
  label,
  rightButtons,
  menu,
}: SectionHeaderProps) => {
  return (
    <div className={`${ baseStyle.inlineRow } p-3 bg-zinc-800! grow border-b rounded-tr-lg border-color`}>

      { versions?.length
        ? <VersionMenu versions={ versions } onSelect={ onSelectVersion } onDownload={ onDownloadVersion } />
        : leftButton && <Button {...leftButton} /> }

      <p className="grow text-lg font-bold">{label}</p>

      <div className={`${ baseStyle.inlineRow } flex-wrap-reverse`}>
        { rightButtons && rightButtons.map((btn, i) => (
          <Button key={i} size="Small" {...btn} />
        ))}

        { menu && menu.length > 0 && <ActionMenu actions={ menu } /> }
      </div>
    </div>
  );
};
