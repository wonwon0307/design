vi.stubGlobal(
  "ResizeObserver",
  class ResizeObserver {
    observe() {
      // No-op for testing environment
    }
    unobserve() {
      // No-op for testing environment
    }
    disconnect() {
      // No-op for testing environment
    }
  },
);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false, // desktop width
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
