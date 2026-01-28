import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import New from "@/app/(content)/new/page";

describe("New Page", () => {
  it("renders", async () => {
    await act(async () => render(<New />));
  });
});
