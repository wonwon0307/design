import {
  buildAriaKeyshortcuts,
  formatShortkey,
  getPlatform,
  parseShortkey,
} from "@/utils";
import type { Shortkey } from "@/types";

describe("getPlatform", () => {
  it("returns 'windows' when window is not defined", () => {
    vi.stubGlobal("window", undefined);
    vi.resetModules();

    expect(getPlatform()).toBe("windows");

    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("returns 'windows' when navigator is not defined", () => {
    vi.stubGlobal("navigator", undefined);
    vi.resetModules();

    expect(getPlatform()).toBe("windows");

    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("returns 'mac' for macOS platform", () => {
    Object.defineProperty(globalThis.navigator, "userAgent", {
      value: "Mozilla/5.0 (Macintosh; Intel Mac OS X)",
      configurable: true,
    });

    expect(getPlatform()).toBe("mac");
  });

  it("returns 'windows' for Windows platform", () => {
    Object.defineProperty(globalThis.navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      configurable: true,
    });
    expect(getPlatform()).toBe("windows");
  });
});

describe("parseShortkey", () => {
  it("parses a simple shortkey correctly", () => {
    const shortkey: Shortkey = "A";
    const result = parseShortkey(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "A",
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });
  });

  it("parses a shortkey with modifiers correctly", () => {
    const shortkey: Shortkey = "Ctrl+Shift+A";
    const result = parseShortkey(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "A",
      ctrlKey: true,
      altKey: false,
      shiftKey: true,
      metaKey: false,
    });
  });

  it("parses a shortkey with 'Mod' modifier correctly for mac", () => {
    const shortkey: Shortkey = "Mod+K";
    const result = parseShortkey(shortkey, "mac");

    expect(result).toEqual({
      targetKey: "K",
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: true,
    });
  });

  it("parses a shortkey with 'Mod' modifier correctly for windows", () => {
    const shortkey: Shortkey = "Mod+K";
    const result = parseShortkey(shortkey, "windows");

    expect(result).toEqual({
      targetKey: "K",
      ctrlKey: true,
      altKey: false,
      shiftKey: false,
      metaKey: false,
    });
  });
});

describe("buildAriaKeyshortcuts", () => {
  it("builds aria keyshortcuts string correctly", () => {
    const shortkey: Shortkey = "Ctrl+Shift+A";
    const result = buildAriaKeyshortcuts(shortkey);

    expect(result).toBe("Control+Shift+A");
  });
});

describe("formatShortkey", () => {
  it("formats a shortkey for mac platform correctly 1", () => {
    const shortkey: Shortkey = "Ctrl+Shift+A";
    const result = formatShortkey(shortkey, "mac");

    expect(result).toBe("Control Shift A");
  });

  it("formats a shortkey for mac platform correctly 2", () => {
    const shortkey: Shortkey = "Meta+Alt+A";
    const result = formatShortkey(shortkey, "mac");

    expect(result).toBe("Option Command A");
  });

  it("formats a shortkey for windows platform correctly", () => {
    const shortkey: Shortkey = "Meta+Alt+A";
    const result = formatShortkey(shortkey, "windows");

    expect(result).toBe("Alt Windows A");
  });
});
