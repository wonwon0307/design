import { render } from "@testing-library/react";

import { Link } from "@/Link";

describe("Link", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Link>New Page</Link>);

    expect(getByText("New Page")).toBeTruthy();
  });
});
