"use client"
import { navItems } from "@/constants/nav";
import { Menu } from "../design-system/Menu";
import { usePathname } from "next/navigation";
import { ProjectProps } from "@/types/project";
import { usePanel } from "@/app/[id]/panel-context";

export const Nav = ({ project }: { project: ProjectProps }) => {

  const pathname = usePathname();
  const { showSideBar } = usePanel();
  const isCondensed = !showSideBar;
  const id = project.id

  return (
    <nav className={`flex ${ isCondensed ? "min-w-auto" : "min-w-1/8" } flex-col wrapper p-2 gap-1 sticky top-0`}>
      {navItems.map((item) => (
        <Menu
          key={item.id}
          href={`/${id}/${item.id}`}
          active={pathname === `/${id}/${item.id}`}
          hideLabel={isCondensed}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </nav>
  );
};