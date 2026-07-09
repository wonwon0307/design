import { render } from "@testing-library/react";

import { Button } from "@/Button";

describe("Button", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Button>Submit</Button>);

    expect(getByText("Submit")).toBeTruthy();
  });

  it("renders with icon correctly", () => {
    const { getByText } = render(
      <Button>
        <span>L</span>Submit<span>R</span>
      </Button>,
    );

    expect(getByText("L")).toBeTruthy();
    expect(getByText("R")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });
});
