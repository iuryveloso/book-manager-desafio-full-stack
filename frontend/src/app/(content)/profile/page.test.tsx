import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Profile from "@/app/(content)/profile/page";

describe("Profile Page", () => {
  it("renders", async () => {
    await act(async () => render(<Profile />));
  });
});
