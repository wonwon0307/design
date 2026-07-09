import clsx from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor";
import { styles } from "./styles.css";

export interface LinkProps extends Omit<AnchorProps, "children"> {
  children: React.ReactNode;
}

export function Link({ children, className, ...props }: Readonly<LinkProps>) {
  return (
    <Anchor className={clsx(styles.link, className)} {...props}>
      {children}
    </Anchor>
  );
}
