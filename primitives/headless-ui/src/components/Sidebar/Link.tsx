import { useContext } from "react";

import { Anchor, type AnchorProps } from "@/components/Anchor";
import { SidebarBodyContext, useSidebar } from "./_internals/contexts";

export interface SidebarLinkProps extends AnchorProps {
  isActive?: boolean;
}

export function SidebarLink({
  children,
  href,
  isActive = false,
  isDisabled = false,
  isExternal = false,
  ...rest
}: Readonly<SidebarLinkProps>) {
  const isInsideNav = useContext(SidebarBodyContext);

  if (!isInsideNav) {
    throw new Error("Sidebar.Link must be used inside Sidebar.Body.");
  }

  const { state, isMobile } = useSidebar();

  return (
    <Anchor
      {...rest}
      href={href}
      isDisabled={isDisabled}
      isExternal={isExternal}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      data-disabled={isDisabled || undefined}
      data-state={state}
      data-device={isMobile ? "mobile" : "desktop"}
    >
      {children}
    </Anchor>
  );
}
