"use client"
import { navItems } from "@/constants/nav";
import { Menu } from "../design-system/Menu";
import { usePathname } from "next/navigation";
import { ProjectProps } from "@/types/project";

export const Nav = ({ isCondensed, project }: { isCondensed : boolean, project: ProjectProps }) => {

  const pathname = usePathname();
  const id = project.id

  return (
    <nav className={`flex min-w-1/8 flex-col wrapper p-2 gap-1 sticky top-0`}>
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