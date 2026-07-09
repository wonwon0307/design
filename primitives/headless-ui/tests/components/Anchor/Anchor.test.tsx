import { fireEvent, render } from "@testing-library/react";

import { Anchor } from "@/components/Anchor";

describe("Anchor", () => {
  beforeAll(() => {
    // Not Implemented: navigation to another Document 경고 무시
    globalThis.window.addEventListener("click", (e) => e.preventDefault());
  });

  it("renders an anchor element with the correct href", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const { getByText } = render(
      <Anchor href="/test" onClick={onClick} onKeyDown={onKeyDown}>
        Test Anchor
      </Anchor>,
    );

    const anchor = getByText("Test Anchor");
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute("href")).toBe("/test");

    // 클릭 이벤트가 발생해야 한다.
    fireEvent.click(anchor);
    expect(onClick).toHaveBeenCalled();

    // 키다운 이벤트가 발생해야 한다.
    fireEvent.keyDown(anchor, { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it("handles disabled state correctly", () => {
    const onClick = vi.fn();
    const onKeyDown = vi.fn();
    const { getByText } = render(
      <Anchor href="/test" isDisabled onClick={onClick} onKeyDown={onKeyDown}>
        Disabled Anchor
      </Anchor>,
    );

    const anchor = getByText("Disabled Anchor");
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute("aria-disabled")).toBe("true");

    // 클릭 이벤트가 발생하지 않아야 한다.
    fireEvent.click(anchor);
    expect(onClick).not.toHaveBeenCalled();

    // Enter/Space 키다운 이벤트가 발생하지 않아야 한다.
    fireEvent.keyDown(anchor, { key: "Enter" });
    fireEvent.keyDown(anchor, { key: " " });
    expect(onKeyDown).not.toHaveBeenCalled();

    // 다른 키는 전달되어야 한다.
    fireEvent.keyDown(anchor, { key: "Tab" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  describe("external behavior", () => {
    it("opens in a new tab when isExternal is true", () => {
      const { getByText } = render(
        <Anchor href="https://example.com" isExternal>
          External Anchor
        </Anchor>,
      );

      const anchor = getByText("External Anchor");
      expect(anchor).toBeTruthy();
      expect(anchor.getAttribute("target")).toBe("_blank");
      expect(anchor.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("opens in a new tab for external anchors even when isExternal prop is not set", () => {
      const { getByText } = render(
        <Anchor href="https://example.com">External Anchor</Anchor>,
      );

      const anchor = getByText("External Anchor");
      expect(anchor).toBeTruthy();
      expect(anchor.getAttribute("target")).toBe("_blank");
      expect(anchor.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("does not open in a new tab when isExternal is false even for external anchors", () => {
      const { getByText } = render(
        <Anchor href="https://example.com" isExternal={false}>
          External Anchor
        </Anchor>,
      );

      const anchor = getByText("External Anchor");
      expect(anchor).toBeTruthy();
      expect(anchor.getAttribute("target")).toBeNull();
      expect(anchor.getAttribute("rel")).toBeNull();
    });
  });

  it("handles as prop correctly", () => {
    const { getByText } = render(
      <Anchor
        href="/test"
        as="button"
        className="anchor-class"
        style={{ color: "blue" }}
      >
        Button Anchor
      </Anchor>,
    );

    const button = getByText("Button Anchor");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("href")).toBe("/test");
  });

  it("handles as prop with newtab and disabled correctly", () => {
    const { getByText } = render(
      <Anchor href="/test" as="button" isExternal isDisabled>
        Button Anchor
      </Anchor>,
    );

    const button = getByText("Button Anchor");
    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("href")).toBe(null); // disabled 상태에서는 href가 제거되어야 한다.
    expect(button.getAttribute("target")).toBe("_blank");
    expect(button.getAttribute("rel")).toBe("noopener noreferrer");
    expect(button.getAttribute("aria-disabled")).toBe("true");
  });
});
