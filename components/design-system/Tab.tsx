import { baseStyle } from "@/constants/styles";

type TabType = "Flat" | "Curve" | "Mini";

interface TabMenuItem {
  id: string;
  label: string;
}

interface TabProps {
  type: TabType;
  active: string | undefined;
  menu: TabMenuItem[];
  onClick: (id: string) => void;
}

const typeStyles: Record<TabType, { active: string; inactive: string }> = {
  Flat: {
    active: "border-b border-indigo-400 py-3 text-indigo-400 font-bold",
    inactive: "border-b border-color py-3 hover:border-zinc-300",
  },
  Curve: {
    active: "",
    inactive: "",
  },
  Mini: {
    active: "",
    inactive: "",
  },
};

export const Tab = ({ type, active, menu, onClick }: TabProps) => {
  return (
    <div data-type={type} className={`${ baseStyle.inlineRow } gap-0! mb-5`}>
      {menu.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            data-active={isActive}
            onClick={() => onClick(item.id)}
            className={`${ isActive ? typeStyles[type].active : typeStyles[type].inactive } grow cursor-pointer`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};