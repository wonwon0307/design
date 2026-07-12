import { fireEvent, render } from "@testing-library/react";

import { TestSidebar } from "./_setup";

describe("Sidebar - aria", () => {
  it("should have the correct aria attributes when the sidebar is expanded", () => {
    const { getByTestId } = render(
      <TestSidebar>
        <div>Content</div>
      </TestSidebar>,
    );

    const body = getByTestId("sidebar-body");
    const toggleButton = getByTestId("sidebar-toggle");

    expect(body.getAttribute("aria-label")).toBe("Sidebar");

    // Initially, the sidebar is closed
    expect(body.getAttribute("aria-hidden")).toBe("true");
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");

    // Expand the sidebar
    fireEvent.click(toggleButton);

    expect(body.getAttribute("aria-hidden")).toBeNull();
    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
  });

  it("should provide no default aria-label when scope is page", () => {
    const { getByTestId } = render(
      <TestSidebar scope="page">
        <div>Content</div>
      </TestSidebar>,
    );

    const body = getByTestId("sidebar-body");
    expect(body.getAttribute("aria-label")).toBeNull();
  });
});
