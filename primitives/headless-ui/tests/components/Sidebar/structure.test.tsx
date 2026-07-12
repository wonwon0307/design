import { renderToString } from "react-dom/server";
import { render } from "@testing-library/react";

import { Sidebar } from "@/components/Sidebar";

describe("Sidebar - structure", () => {
  it("should handle the sidebar in SSR environment correctly", () => {
    const html = renderToString(
      <Sidebar side="left" collapse="icons">
        <Sidebar.Toggle>Toggle</Sidebar.Toggle>
        <Sidebar.Body>
          <Sidebar.Link href="#">Link</Sidebar.Link>
          <Sidebar.Link href="#active" isActive>
            ActiveLink
          </Sidebar.Link>
        </Sidebar.Body>
      </Sidebar>,
    );

    // isMobile should be false
    expect(html).toContain('data-state="collapsed"');
  });

  it("Sidebar.Toggle must be used within the Sidebar wrapper", () => {
    expect(() => render(<Sidebar.Toggle>Toggle</Sidebar.Toggle>)).toThrow(
      "useSidebar must be used within a SidebarProvider",
    );
  });
});
