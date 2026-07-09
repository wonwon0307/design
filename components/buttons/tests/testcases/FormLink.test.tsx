import { render } from "@testing-library/react";

import { FormLink } from "@/Button";

describe("FormLink", () => {
  it("renders correctly", () => {
    const { getByText } = render(<FormLink>Submit</FormLink>);

    expect(getByText("Submit")).toBeTruthy();
  });
});
