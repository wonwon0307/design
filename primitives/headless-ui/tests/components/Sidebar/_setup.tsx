import { Sidebar, type SidebarProps } from "@/components/Sidebar";

export function TestSidebar({
  children,
  onClick,
  scope = "app",
  ...rest
}: Readonly<SidebarProps & { onClick?: () => void; scope?: "app" | "page" }>) {
  return (
    <Sidebar {...rest}>
      <Sidebar.Toggle onClick={onClick} data-testid="sidebar-toggle">
        Toggle
      </Sidebar.Toggle>
      <Sidebar.Body scope={scope} data-testid="sidebar-body">
        {children}
      </Sidebar.Body>
    </Sidebar>
  );
}
