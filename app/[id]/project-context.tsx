"use client";
import { ProjectProps } from "@/types/project";
import { createContext, useContext } from "react";

const ProjectContext = createContext<ProjectProps | null>(null);

export const ProjectProvider = ({
  project,
  children,
}: {
  project: ProjectProps;
  children: React.ReactNode;
}) => <ProjectContext.Provider value={project}>{children}</ProjectContext.Provider>;

export const useProject = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
};