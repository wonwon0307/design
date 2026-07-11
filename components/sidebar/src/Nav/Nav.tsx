import clsx from "clsx";

import { styles } from "./styles.css";

interface SidebarNavProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  children: React.ReactNode;
}

export function SidebarNav({
  children,
  "aria-label": ariaLabel = "Sidebar Navigation",
  className,
  ...rest
}: Readonly<SidebarNavProps>) {
  return (
    <nav
      {...rest}
      role="navigation"
      aria-label={ariaLabel}
      className={clsx(styles.nav, className)}
    >
      {children}
    </nav>
  );
}
