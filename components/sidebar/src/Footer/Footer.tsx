import clsx from "clsx";

import { useSidebar } from "@/core";
import { styles } from "./styles.css";

export interface SidebarFooterProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarFooter({
  children,
  icon,
  className,
  style,
}: Readonly<SidebarFooterProps>) {
  const { state } = useSidebar();

  return (
    <div className={clsx(styles.footer({ state }), className)} style={style}>
      {state === "collapsed" ? icon : children}
    </div>
  );
}
