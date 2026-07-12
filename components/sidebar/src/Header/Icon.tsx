import { SidebarToggle } from "@/Toggle";
import { styles } from "./styles.css";

export interface SidebarHeaderIconProps {
  children: React.ReactNode;
  toggle?: React.ReactNode;
}

export function SidebarHeaderIcon({
  children,
  toggle = <SidebarToggle />,
}: Readonly<SidebarHeaderIconProps>) {
  return (
    <div className={styles.swapContainer}>
      <span className={styles.collapsedIcon}>{children}</span>
      <span className={styles.toggle}>{toggle}</span>
    </div>
  );
}
