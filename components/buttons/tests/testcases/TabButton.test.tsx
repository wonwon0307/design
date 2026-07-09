import { render } from "@testing-library/react";

import { TabButton } from "@/Tab";

describe("TabButton", () => {
  it("renders children mode correctly", () => {
    const { getByText } = render(
      <TabButton>
        <span>Tab</span>
      </TabButton>,
    );

    expect(getByText("Tab")).toBeTruthy();
  });

  it("handles active state correctly", () => {
    const { getByTestId, getByText } = render(
      <TabButton isActive data-testid="active-tab">
        <span>Active Tab</span>
      </TabButton>,
    );

    expect(getByText("Active Tab")).toBeTruthy();

    const tab = getByTestId("active-tab");
    expect(tab.getAttribute("aria-current")).toBe("page");
  });
});
