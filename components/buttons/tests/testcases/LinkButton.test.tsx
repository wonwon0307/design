import { render } from "@testing-library/react";

import { LinkButton } from "@/Link";

describe("LinkButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(<LinkButton>New Page Button</LinkButton>);

    expect(getByText("New Page Button")).toBeTruthy();
  });
});
