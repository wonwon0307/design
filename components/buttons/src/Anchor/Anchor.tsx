import {
  Anchor as Headless,
  type AnchorProps,
} from "@wondesign/headless-ui/Anchor";
import clsx from "clsx";

import { styles } from "./styles.css";

export function Anchor({
  children,
  className,
  ...rest
}: Readonly<AnchorProps>) {
  return (
    <Headless {...rest} className={clsx(styles.anchor, className)}>
      {children}
    </Headless>
  );
}
