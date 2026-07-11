import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider, type SidebarProviderProps } from "@/core";
import { SidebarItem, SidebarItemToggle } from "@/Item";

function TestComponent({ children, ...rest }: Readonly<SidebarProviderProps>) {
  return <SidebarProvider {...rest}>{children}</SidebarProvider>;
}

describe("SidebarItem", () => {
  it("renders sidebar items and item toggle correctly", () => {
    const { getByText } = render(
      <TestComponent>
        <SidebarItem label="Active Item" href="#1" isActive />
        <SidebarItem label="Normal Item" href="#2" />
        <SidebarItem label="Disabled Item" href="#3" isDisabled />
        <SidebarItem label="External Item" href="#4" isExternal />
      </TestComponent>,
    );

    expect(getByText("Active Item")).toBeTruthy();
    expect(getByText("Normal Item")).toBeTruthy();
    expect(getByText("Disabled Item")).toBeTruthy();
    expect(getByText("External Item")).toBeTruthy();
  });

  it("renders and handles collapsible item correctly", () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestComponent>
        <SidebarItem
          label="Grouped Item"
          href="#grouped"
          right={<SidebarItemToggle data-testid="toggle" />}
        >
          <SidebarItem label="Subitem 1" href="#sub1" />
          <SidebarItem label="Subitem 2" href="#sub2" />
        </SidebarItem>
      </TestComponent>,
    );

    expect(getByText("Grouped Item")).toBeTruthy();

    // not rendered initially
    expect(queryByText("Subitem 1")).toBeNull();
    expect(queryByText("Subitem 2")).toBeNull();

    // should render on toggle click
    fireEvent.click(getByTestId("toggle"));
    expect(getByText("Subitem 1")).toBeTruthy();
    expect(getByText("Subitem 2")).toBeTruthy();
  });

  it("renders item in collapsed state correctly", () => {
    const { getByTestId, queryByTestId, queryByText } = render(
      <TestComponent collapse="icons" defaultOpen={false}>
        <SidebarItem
          label="Active Item"
          href="#1"
          icon={<svg data-testid="active-icon" />}
          isActive
        />
        <SidebarItem
          label="Normal Item"
          href="#2"
          icon={<svg data-testid="normal-icon" />}
        />
        <SidebarItem
          label="Disabled Item"
          href="#3"
          icon={<svg data-testid="disabled-icon" />}
          isDisabled
        />
        <SidebarItem
          label="External Item"
          href="#4"
          icon={<svg data-testid="external-icon" />}
          isExternal
        />
        <SidebarItem
          label="Grouped Item"
          href="#grouped"
          icon={<svg data-testid="grouped-icon" />}
          right={<SidebarItemToggle data-testid="toggle" />}
        >
          <SidebarItem
            label="Subitem 1"
            href="#sub1"
            icon={<svg data-testid="subitem1-icon" />}
          />
          <SidebarItem
            label="Subitem 2"
            href="#sub2"
            icon={<svg data-testid="subitem2-icon" />}
          />
        </SidebarItem>
      </TestComponent>,
    );

    // all icons should be rendered
    expect(getByTestId("active-icon")).toBeTruthy();
    expect(getByTestId("normal-icon")).toBeTruthy();
    expect(getByTestId("disabled-icon")).toBeTruthy();
    expect(getByTestId("external-icon")).toBeTruthy();
    expect(getByTestId("grouped-icon")).toBeTruthy();

    // subitems should not be rendered (both icons and labels)
    expect(queryByText("Subitem 1")).toBeNull();
    expect(queryByText("Subitem 2")).toBeNull();
    expect(queryByTestId("subitem1-icon")).toBeNull();
    expect(queryByTestId("subitem2-icon")).toBeNull();
  });

  it("renders label that is not string correctly", () => {
    const { getByTestId } = render(
      <TestComponent>
        <SidebarItem
          label={<div data-testid="custom-label">Custom Label</div>}
          href="#1"
        />
      </TestComponent>,
    );

    expect(getByTestId("custom-label")).toBeTruthy();
  });

  it("renders tooltip correctly when side is right", () => {
    const { getByTestId } = render(
      <TestComponent side="right" collapse="icons" defaultOpen={false}>
        <SidebarItem
          label="Item with Tooltip"
          href="#1"
          icon={<svg data-testid="icon" />}
        />
      </TestComponent>,
    );

    // sidebar renders on right, so tooltip should be on left
    expect(getByTestId("tooltip-left")).toBeTruthy();
  });

  it("warns on console if icon is missing when collapse is 'icons'", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(
      <TestComponent collapse="icons">
        <SidebarItem label="Item 1" href="#1" />
      </TestComponent>,
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "SidebarItem: 'icon' prop is required when sidebar collapse is 'icons'.",
    );

    consoleWarnSpy.mockRestore();
  });
});
