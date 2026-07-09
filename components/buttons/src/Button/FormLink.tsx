import clsx from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor";
import { styles } from "./styles.css";

export interface FormLinkProps extends AnchorProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  size?: "small" | "large" | "fill";
  outlined?: boolean;
}

export function FormLink({
  children,
  variant = "primary",
  size = "large",
  outlined = false,
  className,
  ...rest
}: Readonly<FormLinkProps>) {
  return (
    <Anchor
      {...rest}
      className={clsx(
        styles.formButton({
          variant,
          size,
          outlined,
        }),
        className,
      )}
    >
      {children}
    </Anchor>
  );
}
