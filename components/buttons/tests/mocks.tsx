vi.mock("@wondesign/icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));
