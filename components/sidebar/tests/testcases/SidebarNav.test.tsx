import { render } from "@testing-library/react";

import { SidebarProvider } from "@/core";
import { SidebarNav } from "@/Nav";

describe("SidebarNav", () => {
  it("renders sidebar nav correctly", () => {
    const { getByTestId } = render(
      <SidebarProvider>
        <SidebarNav data-testid="sidebar-nav">Sidebar Nav</SidebarNav>
      </SidebarProvider>,
    );

    expect(getByTestId("sidebar-nav")).toBeTruthy();
  });
});
