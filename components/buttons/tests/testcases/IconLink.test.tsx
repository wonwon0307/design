import { render } from "@testing-library/react";

import { IconLink } from "@/Icon";

describe("IconLink", () => {
  it("renders children mode correctly", () => {
    const { getByText } = render(
      <IconLink>
        <span>Icon</span>
      </IconLink>,
    );

    expect(getByText("Icon")).toBeTruthy();
  });

  it("renders icon mode correctly", () => {
    const { getByText } = render(<IconLink icon="check-fill" />);

    expect(getByText("check-fill")).toBeTruthy(); // mocked in line 5
  });
});
