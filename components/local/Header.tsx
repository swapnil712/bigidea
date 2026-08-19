"use client"
import { baseStyle } from "@/constants/styles";
import { Button, ButtonProps } from "../design-system/Button";
import { Avatar } from "../design-system/Avatar";
import { MdAdd, MdArrowBack, MdIosShare, MdOpenInFull, MdOutlineHome, MdOutlineSettings, MdShare } from "react-icons/md";
import { Collaborator, ProjectProps } from "@/types/project";
import { useState } from "react";
import { dummyCollaborators } from "@/constants/dummy/dummyCollaborators";
import ShareModal from "./ShareModal";
import ExportModal from "./ExportModal";
import { usePanel } from "@/app/[id]/panel-context";


type NavVariant = "Base" | "Inside";

interface NavProps {
  variant: NavVariant;
  projectName: string;
  leftButtons?: ButtonProps[];
  rightButtons?: ButtonProps[];
  avatarInitial?: string;
}


export const HeaderContent = ({
  variant,
  projectName,
  leftButtons = [],
  rightButtons = [],
  avatarInitial,
}: NavProps) => {
  return (
    <div data-variant={variant} className={`${ baseStyle.inlineRow } p-3 flex`}>

      <div className={ baseStyle.inlineRow }>
        {leftButtons.map((btn, index) => (
          <Button 
            key={index}
            type={btn.type}
            label={btn.label}
            icon={btn.icon}
            href={ btn.href }
            onClick={ btn.onClick }
          />
        ))}
      </div>

      <h1 className="font-bold text-lg grow">{projectName}</h1>


      <div className={ baseStyle.inlineRow }>
          {rightButtons.map((btn, index) => (
          <Button
            key={index}
            type={btn.type}
            label={btn.label}
            icon={btn.icon}
            onClick={btn.onClick}
          />
        ))}

        {avatarInitial && <Avatar type="Initials" initial={avatarInitial} />}
        
      </div>
    </div>
  );
};





interface HeaderProps {
  type: NavVariant;
  project?: ProjectProps;
  onNewProject?: () => void;
}

export default function Header ( { type, project, onNewProject } : HeaderProps) {

  const [showShare, setShowShare] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [collaborators, setCollaborators] = useState<Collaborator[]>( dummyCollaborators )

  // Nothing to render until the project has scenes.
  const isEmpty = !project?.scenes?.length

  const toggleFullScreen = () => {
    if ( document.fullscreenElement ) document.exitFullscreen()
    else document.documentElement.requestFullscreen()
  }

  if ( type === "Base" ) return <HeaderContent
    variant="Base"
    leftButtons={[{ icon: MdOutlineHome, type: "Tertiary", onClick: ()=>null }]}
    projectName="BigIdea"
    rightButtons={[
      { icon: MdAdd, type: "Primary", label: "New Project", onClick: onNewProject },
      { icon: MdOutlineSettings, type: "Tertiary", onClick: () => null }
    ]}
    avatarInitial="LF"
  />

  return <>
    <HeaderContent
      variant="Inside"
      leftButtons={[
        { icon: MdArrowBack, type:"Tertiary", href: "/" },
      ]}
      projectName={ project?.title || "Untitled Project" }
      rightButtons={[
        { icon: MdShare, type: "Tertiary", label: "Share", onClick: () => setShowShare( true ) },
        { icon: MdIosShare, type: "Primary", label: "Export", disabled: isEmpty, onClick: () => setShowExport( true ) },
        { icon: MdOpenInFull, type: "Tertiary", onClick: toggleFullScreen }
      ]}
    />

    <ShareModal
      show={ showShare }
      onClose={ () => setShowShare( false ) }
      shareUrl={ `https://v.peakview.com/project/${ project?.id ?? "" }` }
      collaborators={ collaborators }
      onChange={ setCollaborators }
    />

    <ExportModal
      show={ showExport }
      onClose={ () => setShowExport( false ) }
      scenes={ project?.scenes ?? [] }
      locations={ project?.locations }
      aspectRatio={ project?.aspectRatio ?? "9-16" }
    />

  </>
}
