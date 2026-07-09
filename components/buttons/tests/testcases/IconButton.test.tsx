import { render } from "@testing-library/react";

import { IconButton } from "@/Icon";

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
