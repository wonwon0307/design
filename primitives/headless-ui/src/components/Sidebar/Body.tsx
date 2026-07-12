import { useSidebar } from "./_internals/contexts";

export interface SidebarBodyProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "id"
> {
  children: React.ReactNode;
  scope?: "app" | "page";
}

export function SidebarBody({
  children,
  scope = "app",
  "aria-label": ariaLabel = scope === "app" ? "Sidebar" : undefined,
  ...rest
}: Readonly<SidebarBodyProps>) {
  const { state, contentId, side, isMobile } = useSidebar();

  const Component = scope === "app" ? "aside" : "div";
  const isHidden = state === "closed";

  return (
    <Component
      {...rest}
      aria-label={ariaLabel}
      aria-hidden={isHidden ? true : undefined}
      id={contentId}
      inert={isHidden ? true : undefined}
      data-state={state}
      data-side={side}
      data-device={isMobile ? "mobile" : "desktop"}
    >
      {children}
    </Component>
  );
}
