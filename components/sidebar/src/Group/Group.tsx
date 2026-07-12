import { Collapsible } from "@wondesign/headless-ui/Collapsible";
import { AppIcon } from "@wondesign/icons";
import clsx from "clsx";

import { useSidebar } from "@/core";
import { styles } from "./styles.css";

export interface SidebarGroupProps {
  children: React.ReactNode;
  label: React.ReactNode;
  right?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SidebarGroup({
  children,
  label,
  right,
  defaultOpen = true,
  isOpen,
  onOpenChange,
  "aria-label": ariaLabel,
  className,
  style,
}: SidebarGroupProps) {
  const { state } = useSidebar();

  if (state === "collapsed") {
    return (
      <div className={clsx(styles.group, className)} style={style}>
        {children}
      </div>
    );
  }

  const toggleLabel =
    ariaLabel ?? (typeof label === "string" ? label : "Toggle group");

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      unmountOnHide
    >
      <div className={clsx(styles.group, className)} style={style}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {typeof label === "string" ? <span>{label}</span> : label}
            <AppIcon icon="chevron-right" className={styles.icon} />
          </div>
          <div className={styles.headerRight}>{right}</div>
          <Collapsible.Toggle
            aria-label={toggleLabel}
            className={styles.toggle}
          />
        </div>
        <Collapsible.Content className={styles.subitems}>
          {children}
        </Collapsible.Content>
      </div>
    </Collapsible>
  );
}
