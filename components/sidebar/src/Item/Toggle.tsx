import {
  CollapsibleToggle,
  type CollapsibleToggleProps,
} from "@wondesign/headless-ui/Collapsible";
import { AppIcon } from "@wondesign/icons";
import clsx from "clsx";

import { styles } from "./styles.css";

export function SidebarItemToggle({
  className,
  ...rest
}: Readonly<CollapsibleToggleProps>) {
  return (
    <CollapsibleToggle {...rest} className={clsx(styles.toggle, className)}>
      <AppIcon icon="chevron-right" className={styles.toggleIcon} />
    </CollapsibleToggle>
  );
}
