import type { Shortkey } from "./types";

export function getPlatform() {
  if (globalThis.window === undefined) {
    return "windows";
  }

  return /Mac|iPod|iPhone|iPad/.test(globalThis.navigator?.userAgent ?? "")
    ? "mac"
    : "windows";
}

const KEY_ALIASES: Record<string, string> = {
  Esc: "Escape",
  Return: "Enter",
  Space: " ",
  Up: "ArrowUp",
  Down: "ArrowDown",
  Left: "ArrowLeft",
  Right: "ArrowRight",
};

export function parseShortkey(
  shortkey: Shortkey,
  platform: "mac" | "windows" = getPlatform(),
) {
  const parts = shortkey.split("+");
  const rawKey = parts.pop() as string;
  const targetKey = KEY_ALIASES[rawKey] ?? rawKey;
  const isMac = platform === "mac";

  let ctrlKey = parts.includes("Ctrl") || parts.includes("Control");
  const altKey =
    parts.includes("Alt") || parts.includes("Opt") || parts.includes("Option");
  const shiftKey = parts.includes("Shift");

  let metaKey =
    parts.includes("Meta") ||
    parts.includes("Cmd") ||
    parts.includes("Command") ||
    parts.includes("Win") ||
    parts.includes("Windows");

  if (parts.includes("Mod")) {
    if (isMac) {
      metaKey = true;
    } else {
      ctrlKey = true;
    }
  }

  return { targetKey, ctrlKey, altKey, shiftKey, metaKey };
}

export function buildAriaKeyshortcuts(key: Shortkey): string {
  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parseShortkey(key);
  const parts: string[] = [];
  if (metaKey) parts.push("Meta");
  if (ctrlKey) parts.push("Control");
  if (altKey) parts.push("Alt");
  if (shiftKey) parts.push("Shift");
  parts.push(targetKey);
  return parts.join("+");
}

export function formatShortkey(
  key: Shortkey,
  platform: "mac" | "windows" = getPlatform(),
): string {
  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parseShortkey(
    key,
    platform,
  );
  const isMac = platform === "mac";
  const parts: string[] = [];
  if (ctrlKey) parts.push("Control");
  if (shiftKey) parts.push("Shift");
  if (altKey) parts.push(isMac ? "Option" : "Alt");
  if (metaKey) parts.push(isMac ? "Command" : "Windows");
  parts.push(targetKey);
  return parts.join(" ");
}
