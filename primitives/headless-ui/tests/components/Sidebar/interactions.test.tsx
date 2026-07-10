import { fireEvent, render } from "@testing-library/react";

import { Sidebar } from "@/components/Sidebar";
import { TestSidebar } from "./_setup";

describe("Sidebar - interactions", () => {
  it("should toggle the sidebar using keyboard shortkeys", () => {
    const { getByTestId } = render(
      <TestSidebar keyboardShortkey="O">
        <Sidebar.Link href="#">Link</Sidebar.Link>
      </TestSidebar>,
    );

    const body = getByTestId("sidebar-body");

    expect(body.dataset.state).toBe("closed");

    fireEvent.keyDown(document, { key: "O", code: "KeyO" });
    expect(body.dataset.state).toBe("expanded");

    fireEvent.keyDown(document, { key: "O", code: "KeyO" });
    expect(body.dataset.state).toBe("closed");
  });

  it("should toggle the sidebar between collapsed and expanded using clicks", () => {
    const { getByTestId } = render(
      <TestSidebar collapse="icons">
        <Sidebar.Link href="#">Link</Sidebar.Link>
      </TestSidebar>,
    );

    const body = getByTestId("sidebar-body");
    const toggleButton = getByTestId("sidebar-toggle");

    expect(body.dataset.state).toBe("collapsed");

    fireEvent.click(toggleButton);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggleButton);
    expect(body.dataset.state).toBe("collapsed");
  });

  it("should toggle the sidebar in mobile mode", () => {
    const { getByTestId } = render(
      <TestSidebar isMobile>
        <Sidebar.Link href="#">Link</Sidebar.Link>
      </TestSidebar>,
    );

    const body = getByTestId("sidebar-body");
    const toggleButton = getByTestId("sidebar-toggle");

    expect(body.dataset.state).toBe("closed");

    fireEvent.click(toggleButton);
    expect(body.dataset.state).toBe("expanded");

    fireEvent.click(toggleButton);
    expect(body.dataset.state).toBe("closed");
  });

  it("should handle user defined toggle behavior correctly", () => {
    const clickMock = vi.fn();

    const { getByTestId } = render(
      <TestSidebar onClick={clickMock}>
        <Sidebar.Link href="#">Link</Sidebar.Link>
      </TestSidebar>,
    );

    const body = getByTestId("sidebar-body");
    const toggleButton = getByTestId("sidebar-toggle");

    expect(body.dataset.state).toBe("closed");

    fireEvent.click(toggleButton);
    // state changes as well as user defined onClick is called
    expect(body.dataset.state).toBe("expanded");
    expect(clickMock).toHaveBeenCalledTimes(1);
  });
});
