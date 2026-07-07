import { render } from "@testing-library/react";

import { IconButton } from "@/IconButton";

vi.mock("@wondesign/icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe("IconButton", () => {
  it("renders children mode correctly", () => {
    const { getByText } = render(
      <IconButton>
        <span>Icon</span>
      </IconButton>,
    );

    expect(getByText("Icon")).toBeTruthy();
  });

  it("renders icon mode correctly", () => {
    const { getByText } = render(<IconButton icon="check-fill" />);

    expect(getByText("check-fill")).toBeTruthy(); // mocked in line 5
  });
});
