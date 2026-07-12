import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/core";
import { SidebarGroup } from "@/Group";
import { SidebarToggle } from "@/Toggle";

describe("SidebarGroup", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarGroup label="Test Group">
          <div>Child Content</div>
        </SidebarGroup>
      </SidebarProvider>,
    );

    expect(getByText("Test Group")).toBeTruthy();
    expect(getByText("Child Content")).toBeTruthy();
  });

  it("handles collapsed state correctly", () => {
    const { getByText, queryByText } = render(
      <SidebarProvider collapse="icons" defaultOpen>
        <SidebarGroup label="Test Group">
          <div>Child Content</div>
        </SidebarGroup>
        <SidebarToggle>Toggle</SidebarToggle>
      </SidebarProvider>,
    );

    // Initially, the sidebar is expanded, so label and children are all visible
    expect(getByText("Test Group")).toBeTruthy();
    expect(getByText("Child Content")).toBeTruthy();

    fireEvent.click(getByText("Toggle"));

    // When collapsed, children should be visible, but label shoule not
    expect(queryByText("Test Group")).toBeNull();
    expect(getByText("Child Content")).toBeTruthy();
  });

  it("handles group toggle correctly", () => {
    const { getByLabelText, getByText, queryByText } = render(
      <SidebarProvider>
        <SidebarGroup label="Test Group" defaultOpen={false}>
          <div>Child Content</div>
        </SidebarGroup>
      </SidebarProvider>,
    );

    // Initially, the group is closed, so children should not be visible
    expect(queryByText("Child Content")).toBeNull();

    // Open the group
    fireEvent.click(getByLabelText("Test Group"));

    // Now, children should be visible
    expect(getByText("Child Content")).toBeTruthy();
  });

  it("handles developer set aria-label correctly", () => {
    const { getByLabelText } = render(
      <SidebarProvider>
        <SidebarGroup label="Test Group" aria-label="Custom Aria Label">
          <div>Child Content</div>
        </SidebarGroup>
      </SidebarProvider>,
    );

    // The toggle button should have the custom aria-label
    expect(getByLabelText("Custom Aria Label")).toBeTruthy();
  });

  it("falls back to default aria-label when label is not a string", () => {
    const { getByLabelText } = render(
      <SidebarProvider>
        <SidebarGroup label={<span>Test Group</span>}>
          <div>Child Content</div>
        </SidebarGroup>
      </SidebarProvider>,
    );

    // The toggle button should have the default aria-label
    expect(getByLabelText("Toggle group")).toBeTruthy();
  });
});
