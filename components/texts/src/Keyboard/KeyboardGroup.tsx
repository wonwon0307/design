import clsx from "clsx";

import { Keyboard } from "./Keyboard";
import {
  formatShortkey,
  getPlatform,
  parseShortkey,
  type Shortkey,
} from "@wondesign/shortkeys";
import { styles } from "./styles.css";

export interface KeyboardGroupProps extends React.HTMLAttributes<HTMLElement> {
  keys: Shortkey;
  size?: "small" | "large";
  platform?: "mac" | "windows";
}

// KeyboardGroup renders platform-specific symbols (⌘, ⇧, ⌥ on Mac vs Ctrl, Shift, Alt elsewhere).
// isMac is always false on the server, so the server and client render different content.
// suppressHydrationWarning should be added to the rendered elements to suppress the mismatch warning.
export function KeyboardGroup({
  keys,
  size,
  platform = getPlatform(),
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<KeyboardGroupProps>) {
  const { targetKey, ctrlKey, shiftKey, altKey, metaKey } = parseShortkey(
    keys,
    platform,
  );

  const keysToRender: string[] = [];

  const isMac = platform === "mac";

  if (ctrlKey) keysToRender.push(isMac ? "^" : "Ctrl");
  if (shiftKey) keysToRender.push(isMac ? "⇧" : "Shift");
  if (altKey) keysToRender.push(isMac ? "⌥" : "Alt");
  if (metaKey) keysToRender.push(isMac ? "⌘" : "Win");

  keysToRender.push(targetKey);

  const resolvedLabel = ariaLabel ?? formatShortkey(keys, platform);

  if (keysToRender.length === 1) {
    return (
      <Keyboard
        {...rest}
        size={size}
        aria-label={resolvedLabel}
        className={className}
      >
        {keysToRender[0]}
      </Keyboard>
    );
  }

  return (
    <kbd
      {...rest}
      aria-label={resolvedLabel}
      className={clsx(styles.keyboardGroup, className)}
    >
      {keysToRender.map((key) => (
        <Keyboard key={key} size={size} aria-hidden="true">
          {key}
        </Keyboard>
      ))}
    </kbd>
  );
}
