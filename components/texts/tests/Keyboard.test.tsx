import { render } from "@testing-library/react";

import { Keyboard, KeyboardGroup } from "@/Keyboard";

describe("Keyboard", () => {
  it("renders the key label as a kbd element", () => {
    const { getByText } = render(<Keyboard>⌘</Keyboard>);
    expect(getByText("⌘")).toBeTruthy();
    expect(getByText("⌘").tagName).toBe("KBD");
  });

  it("applies size prop", () => {
    const { getByText } = render(<Keyboard size="large">Enter</Keyboard>);
    expect(getByText("Enter").tagName).toBe("KBD");
  });
});

describe("KeyboardGroup", () => {
  it("handles normal keys correctly", () => {
    // alphabet, numeric and function keys
    const { getByText } = render(
      <div>
        <KeyboardGroup keys="K" />
        <KeyboardGroup keys="1" />
        <KeyboardGroup keys="Enter" />
        <KeyboardGroup keys="Escape" />
      </div>,
    );

    const element = getByText("K");
    expect(element.tagName).toBe("KBD");
    expect(element.ariaLabel).toBe("K");

    const element2 = getByText("1");
    expect(element2.tagName).toBe("KBD");
    expect(element2.ariaLabel).toBe("1");

    const element3 = getByText("Enter");
    expect(element3.tagName).toBe("KBD");
    expect(element3.ariaLabel).toBe("Enter");

    const element4 = getByText("Escape");
    expect(element4.tagName).toBe("KBD");
    expect(element4.ariaLabel).toBe("Escape");
  });

  it("handles ctrl+key combination correctly", () => {
    const { getByTestId } = render(
      <div>
        <KeyboardGroup keys="Ctrl+K" platform="windows" data-testid="win" />
        <KeyboardGroup keys="Ctrl+K" platform="mac" data-testid="mac" />
      </div>,
    );

    const winElement = getByTestId("win");
    expect(winElement.tagName).toBe("KBD");
    expect(winElement.ariaLabel).toBe("Control K");

    const macElement = getByTestId("mac");
    expect(macElement.tagName).toBe("KBD");
    expect(macElement.ariaLabel).toBe("Control K");
    expect(macElement.textContent).toBe("^K");
  });

  it("handles shift+key combination correctly", () => {
    const { getByTestId } = render(
      <div>
        <KeyboardGroup keys="Shift+K" platform="windows" data-testid="win" />
        <KeyboardGroup keys="Shift+K" platform="mac" data-testid="mac" />
      </div>,
    );

    const winElement = getByTestId("win");
    expect(winElement.tagName).toBe("KBD");
    expect(winElement.ariaLabel).toBe("Shift K");

    const macElement = getByTestId("mac");
    expect(macElement.tagName).toBe("KBD");
    expect(macElement.ariaLabel).toBe("Shift K");
    expect(macElement.textContent).toBe("⇧K");
  });

  it("handles alt+key combination correctly", () => {
    const { getByTestId } = render(
      <div>
        <KeyboardGroup keys="Alt+K" platform="windows" data-testid="win" />
        <KeyboardGroup keys="Alt+K" platform="mac" data-testid="mac" />
      </div>,
    );

    const winElement = getByTestId("win");
    expect(winElement.tagName).toBe("KBD");
    expect(winElement.ariaLabel).toBe("Alt K");

    const macElement = getByTestId("mac");
    expect(macElement.tagName).toBe("KBD");
    expect(macElement.ariaLabel).toBe("Option K");
    expect(macElement.textContent).toBe("⌥K");
  });

  it("handles meta+key combination correctly", () => {
    const { getByTestId } = render(
      <div>
        <KeyboardGroup keys="Meta+K" platform="windows" data-testid="win" />
        <KeyboardGroup keys="Meta+K" platform="mac" data-testid="mac" />
      </div>,
    );

    const winElement = getByTestId("win");
    expect(winElement.tagName).toBe("KBD");
    expect(winElement.ariaLabel).toBe("Windows K");

    const macElement = getByTestId("mac");
    expect(macElement.tagName).toBe("KBD");
    expect(macElement.ariaLabel).toBe("Command K");
    expect(macElement.textContent).toBe("⌘K");
  });

  it("handles custom aria-label correctly", () => {
    const { getByTestId } = render(
      <KeyboardGroup
        keys="Ctrl+K"
        aria-label="Custom Label"
        data-testid="keyboard-group"
      />,
    );

    const groupElement = getByTestId("keyboard-group");
    expect(groupElement.ariaLabel).toBe("Custom Label");
  });
});
