import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Auth from "@/app/(auth)/auth/page";

describe("Auth Page", () => {
  it("renders", async () => {
    await act(async () => render(<Auth />));
  });
});
