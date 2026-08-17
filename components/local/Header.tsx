"use client"
import { baseStyle } from "@/constants/styles";
import { Button, ButtonProps } from "../design-system/Button";
import { Avatar } from "../design-system/Avatar";
import { MdAdd, MdArrowBack, MdIosShare, MdOpenInFull, MdOutlineHome, MdOutlineSettings, MdSettings } from "react-icons/md";
import { ProjectProps } from "@/types/project";


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
            href="/"
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
  // Base view only — lets the page send focus down to the prompter.
  onNewProject?: () => void;
}

export default function Header ( { type, project, onNewProject } : HeaderProps) {

  return type === "Base" ? <HeaderContent
    variant="Base"
    leftButtons={[{ icon: MdOutlineHome, type:"Tertiary", onClick: ()=>null }]}
    projectName="BigIdea"
    rightButtons={[
      { icon: MdAdd, type: "Primary", label: "New Project", onClick: onNewProject },
      { icon: MdOutlineSettings, type: "Tertiary", onClick: () => null }
    ]}
    avatarInitial="LF"
  /> :
  
  <HeaderContent 
    variant="Inside"
    leftButtons={[{ icon: MdArrowBack, type:"Tertiary", onClick: ()=>null }]}
    projectName={ project?.title || "Untitled Project" }
    rightButtons={[
      { icon: MdSettings, type: "Tertiary", onClick: () => null },
      { icon: MdIosShare, type: "Secondary", label: "Render", onClick: () => null },
      { icon: MdOpenInFull, type: "Tertiary", onClick: () => null }
    ]}
  />
}