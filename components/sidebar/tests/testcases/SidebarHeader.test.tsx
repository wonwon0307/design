import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/core";
import { SidebarHeader, SidebarHeaderIcon } from "@/Header";
import { SidebarToggle } from "@/Toggle";

describe("SidebarHeader", () => {
  it("renders header correctly", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarHeader>Header Content</SidebarHeader>
      </SidebarProvider>,
    );

    expect(getByText("Header Content")).toBeTruthy();
  });

  it("renders custom icon correctly", () => {
    const { getByText, queryByText } = render(
      <SidebarProvider collapse="icons" defaultOpen>
        <SidebarHeader icon={<span>Icon</span>}>Header Content</SidebarHeader>
        <SidebarToggle>Toggle Sidebar</SidebarToggle>
      </SidebarProvider>,
    );

    // initially expanded
    expect(getByText("Header Content")).toBeTruthy();
    expect(queryByText("Icon")).toBeNull();

    // flips on toggle
    fireEvent.click(getByText("Toggle Sidebar"));
    expect(queryByText("Header Content")).toBeNull();
    expect(getByText("Icon")).toBeTruthy();
  });

  it("renders package default icon correctly", () => {
    const { getByTestId, getByText, queryByTestId, queryByText } = render(
      <SidebarProvider collapse="icons" defaultOpen>
        <SidebarHeader
          icon={
            <SidebarHeaderIcon>
              <svg data-testid="test-icon" />
            </SidebarHeaderIcon>
          }
        >
          Header Content
        </SidebarHeader>
        <SidebarToggle>Toggle Sidebar</SidebarToggle>
      </SidebarProvider>,
    );

    // initially expanded
    expect(getByText("Header Content")).toBeTruthy();
    expect(queryByTestId("test-icon")).toBeNull();

    // flips on toggle
    fireEvent.click(getByText("Toggle Sidebar"));
    expect(queryByText("Header Content")).toBeNull();
    expect(getByTestId("test-icon")).toBeTruthy();
  });
});
