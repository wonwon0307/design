import clsx from "clsx";

import { Pressable, type PressableProps } from "@/Pressable";
import { styles } from "./styles.css";

export interface TabButtonProps extends PressableProps {
  isActive?: boolean;
}

export function TabButton({
  children,
  isActive,
  className,
  ...rest
}: Readonly<TabButtonProps>) {
  return (
    <div className={styles.tab({ isActive })}>
      <Pressable
        {...rest}
        className={clsx(styles.link({ isActive }), className)}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Pressable>
    </div>
  );
}
