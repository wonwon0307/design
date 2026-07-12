import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@wondesign/tokens";

const footer = recipe({
  base: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing.sm,
    padding: `${tokens.spacing.lg} ${tokens.spacing.sm}`,
    overflow: "hidden",
  },
  variants: {
    state: {
      collapsed: {
        justifyContent: "center",
      },
      expanded: {},
      closed: {},
    },
  },
});

export const styles = { footer };
