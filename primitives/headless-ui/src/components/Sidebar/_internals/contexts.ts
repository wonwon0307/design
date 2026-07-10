import { createContext, useContext } from "react";

type SidebarContextValue = {
  // states
  state: "closed" | "collapsed" | "expanded";
  isDisabled: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  // implementation details
  side: "left" | "right";
  ariaKeyshortcuts: string | undefined;
  contentId: string;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}

export const SidebarBodyContext = createContext<boolean>(false);
