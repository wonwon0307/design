import { SidebarBodyContext, useSidebar } from "./_internals/contexts";

export interface SidebarBodyProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children" | "id"
> {
  children: React.ReactNode;
  scope?: "app" | "page";
  appearance?: "default" | "floating" | "inset";
}

export function SidebarBody({
  children,
  scope = "app",
  appearance = "default",
  "aria-label": ariaLabel = scope === "app" ? "Sidebar" : undefined,
  ...rest
}: Readonly<SidebarBodyProps>) {
  const { state, contentId, side, isMobile } = useSidebar();

  const Component = scope === "app" ? "aside" : "div";
  const isHidden = state === "closed";

  return (
    <SidebarBodyContext value={true}>
      <Component
        {...rest}
        aria-label={ariaLabel}
        aria-hidden={isHidden ? true : undefined}
        id={contentId}
        inert={isHidden ? true : undefined}
        data-state={state}
        data-appearance={appearance}
        data-side={side}
        data-device={isMobile ? "mobile" : "desktop"}
      >
        {children}
      </Component>
    </SidebarBodyContext>
  );
}
