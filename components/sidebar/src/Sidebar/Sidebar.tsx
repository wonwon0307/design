import {
  SidebarBody as Wrapper,
  useSidebar,
  type SidebarBodyProps as Props,
} from "@wondesign/headless-ui/Sidebar";
import clsx from "clsx";

import { styles } from "./styles.css";

export interface SidebarProps extends Props {
  appearance?: "default" | "floating" | "inset";
}

export function Sidebar({
  appearance = "default",
  className,
  ...rest
}: Readonly<SidebarProps>) {
  const { state } = useSidebar();
  return (
    <Wrapper
      {...rest}
      className={clsx(styles.sidebar({ appearance, state }), className)}
      data-appearance={appearance}
    />
  );
}
