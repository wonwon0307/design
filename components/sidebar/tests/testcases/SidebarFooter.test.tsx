import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/core";
import { SidebarFooter } from "@/Footer";
import { SidebarToggle } from "@/Toggle";

describe("SidebarFooter", () => {
  it("renders footer correctly", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarFooter>Footer Content</SidebarFooter>
      </SidebarProvider>,
    );

    expect(getByText("Footer Content")).toBeTruthy();
  });

  it("handles collapsed state correctly", () => {
    const { getByText, queryByText } = render(
      <SidebarProvider collapse="icons">
        <SidebarFooter icon={<span data-testid="icon">Icon</span>}>
          Footer Content
        </SidebarFooter>
        <SidebarToggle>Toggle Sidebar</SidebarToggle>
      </SidebarProvider>,
    );

    // initially collapsed
    expect(getByText("Icon")).toBeTruthy();
    expect(queryByText("Footer Content")).toBeNull();

    // renders content instead of icon when expanded
    fireEvent.click(getByText("Toggle Sidebar"));
    expect(getByText("Footer Content")).toBeTruthy();
    expect(queryByText("Icon")).toBeNull();
  });
});
