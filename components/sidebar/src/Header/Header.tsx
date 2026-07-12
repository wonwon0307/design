import clsx from "clsx";

import { useSidebar } from "@/core";
import { styles } from "./styles.css";

export interface SidebarHeaderProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarHeader({
  children,
  icon,
  className,
  style,
}: Readonly<SidebarHeaderProps>) {
  const { state } = useSidebar();

  return (
    <div className={clsx(styles.header({ state }), className)} style={style}>
      {state === "collapsed" ? icon : children}
    </div>
  );
}
