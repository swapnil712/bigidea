"use client";
import { createContext, useContext, useState } from "react";

interface PanelContextType {
  showSideBar: boolean;
  toggleSideBar: () => void;
}

const PanelContext = createContext<PanelContextType | null>(null);

export const PanelProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar, setShowSideBar] = useState( false );

  const toggleSideBar = () => setShowSideBar((prev) => !prev);

  return (
    <PanelContext.Provider value={{ showSideBar, toggleSideBar }}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("usePanel must be used within PanelProvider");
  return ctx;
};