"use client"
import { navItems } from "@/constants/nav";
import { Menu } from "../design-system/Menu";
import { usePathname } from "next/navigation";
import { ProjectProps } from "@/types/project";
import { usePanel } from "@/app/[id]/panel-context";

export const Nav = ({ project }: { project: ProjectProps }) => {

  const pathname = usePathname();
  const { showSideBar, toggleSideBar } = usePanel();
  const id = project.id

  return (
    <div className="flex flex-row sticky top-0">

      <nav className={`flex flex-col wrapper p-2 gap-1 me-1 ${ showSideBar ? "min-w-50" : "" }`}>
        {navItems.map((item) => {

          if ( !item.icon ) return <div key={ item.id } className="border-b border-color "></div>

          return <Menu
            key={item.id}
            href={`/${id}/${item.id}`}
            active={pathname === `/${id}/${item.id}`}
            hideLabel={ !showSideBar }
            label={item.label}
            icon={item.icon}
          />
        })}
      </nav>

      <button type="button" onClick={ toggleSideBar } className="hover:opacity-100 opacity-50 cursor-pointer">
        <div className="bg-white w-1 h-5 rounded-xl"></div>
      </button>


    </div>
  );
};