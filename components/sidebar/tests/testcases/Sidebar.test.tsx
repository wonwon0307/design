import { render } from "@testing-library/react";

import { SidebarProvider } from "@/core";
import { Sidebar } from "@/Sidebar";

describe("Sidebar", () => {
  it("renders sidebar correctly", () => {
    const { getByTestId } = render(
      <SidebarProvider>
        <Sidebar data-testid="sidebar">Sidebar</Sidebar>
      </SidebarProvider>,
    );

    expect(getByTestId("sidebar")).toBeTruthy();
  });
});
