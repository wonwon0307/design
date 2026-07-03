import { wonwonDark } from "@/presets/wonwon-dark";
import { wonwonLight } from "@/presets/wonwon-light";
import { convertToLightDark } from "@/utils/light-dark";

describe("light-dark", () => {
  it("convertToLightDark should return light-dark colors", () => {
    const result = convertToLightDark(wonwonLight, wonwonDark);

    for (const key in wonwonLight) {
      const lightValue = wonwonLight[key as keyof typeof wonwonLight];
      const darkValue = wonwonDark[key as keyof typeof wonwonDark];
      const expectedValue = `light-dark(${lightValue}, ${darkValue})`;

      expect(result[key as keyof typeof result]).toBe(expectedValue);
    }
  });
});
