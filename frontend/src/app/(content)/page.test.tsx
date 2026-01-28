import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Dashboard from "@/app/(content)/page";
import { Books } from "@/interfaces/bookInterfaces";

function mockFetch(data: Books) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    }),
  );
}

const MockData: Books = {
  totalItems: 1,
  totalPages: 1,
  books: [
    {
      id: "test-id",
      title: "Test Title",
      author: "Test Author",
      year: 2024,
      description: "Test Description",
    },
  ],
};

describe("Dashboard Page", () => {
  it("renders", async () => {
    window.fetch = mockFetch(MockData);
    await act(async () => render(<Dashboard />));
  });
});
