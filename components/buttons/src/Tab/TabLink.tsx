import clsx from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor";
import { styles } from "./styles.css";

export interface TabLinkProps extends AnchorProps {
  isActive?: boolean;
}

export function TabLink({
  children,
  isActive,
  className,
  ...rest
}: Readonly<TabLinkProps>) {
  return (
    <div className={styles.tab({ isActive })}>
      <Anchor
        {...rest}
        className={clsx(styles.link({ isActive }), className)}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Anchor>
    </div>
  );
}
