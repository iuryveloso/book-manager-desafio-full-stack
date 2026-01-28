import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { useParams } from "next/navigation";
import Edit from "@/app/(content)/edit/[id]/page";

function mockFetch(data: object) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    }),
  );
}

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const mockData = {
  id: "test-id",
  title: "Test Title",
  author: "Test Author",
};

describe("Edit Page", () => {
  it("renders", async () => {
    window.fetch = mockFetch(mockData);
    jest.mocked(useParams).mockReturnValue({ id: "test-id" });
    await act(async () => render(<Edit />));
  });
});
