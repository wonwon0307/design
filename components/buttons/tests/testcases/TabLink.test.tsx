import { render } from "@testing-library/react";

import { TabLink } from "@/Tab";

describe("TabLink", () => {
  it("renders children mode correctly", () => {
    const { getByText } = render(
      <TabLink href="#">
        <span>Tab</span>
      </TabLink>,
    );

    expect(getByText("Tab")).toBeTruthy();
  });

  it("handles active state correctly", () => {
    const { getByTestId, getByText } = render(
      <TabLink href="#" isActive data-testid="active-tab">
        <span>Active Tab</span>
      </TabLink>,
    );

    expect(getByText("Active Tab")).toBeTruthy();

    const tab = getByTestId("active-tab");
    expect(tab.getAttribute("aria-current")).toBe("page");
  });
});
