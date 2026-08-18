"use client"

import { IconType } from "react-icons";
import { MdMoreVert } from "react-icons/md";
import Dropdown from "./Dropdown";
import { baseStyle } from "@/constants/styles";

type ActionTone = "Default" | "Danger";

export interface MenuAction {
  id: string;
  label: string;
  icon?: IconType;
  tone?: ActionTone;
  // Starts a new group above this action.
  separated?: boolean;
  onClick?: () => void;
}

const toneStyles: Record<ActionTone, string> = {
  Default: "hover:bg-zinc-700",
  Danger: "text-red-400 hover:bg-red-400/20",
};

export default function ActionMenu({ actions }: { actions: MenuAction[] }) {

  return (
    <Dropdown trigger={{ icon: MdMoreVert, type: "Tertiary" }} align="Right" width="min-w-60">

      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <div key={action.id} className={action.separated ? "border-t border-color mt-2 pt-2" : ""}>
            <button
              type="button"
              onClick={action.onClick}
              className={`${baseStyle.inlineRow} w-full cursor-pointer text-left text-sm p-2 rounded-lg
                          ${toneStyles[action.tone || "Default"]}`}
            >
              {Icon && <Icon size={18} />}
              {action.label}
            </button>
          </div>
        );
      })}

    </Dropdown>
  );
}
