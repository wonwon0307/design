import { SidebarProvider } from "./Provider";
import { SidebarBody } from "./Body";
import { SidebarToggle } from "./Toggle";
import { SidebarLink } from "./Link";

export const Sidebar = Object.assign(SidebarProvider, {
  Body: SidebarBody,
  Toggle: SidebarToggle,
  Link: SidebarLink,
});

export { SidebarBody } from "./Body";
export { SidebarToggle } from "./Toggle";
export { SidebarLink } from "./Link";
export { SidebarProvider } from "./Provider";

// context
export { useSidebar } from "./_internals/contexts";

// types
export type { SidebarProps } from "./Provider";
export type { ButtonProps as SidebarToggleProps } from "@/components/Button";
export type { SidebarLinkProps } from "./Link";
export type { SidebarBodyProps } from "./Body";
