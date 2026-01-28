import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Button from "./button";

interface Mock {
  className?: string;
  hoverColor?: string;
  onClick?: () => void;
  borderless?: boolean;
  underline?: boolean;
  children: string;
}

const mock: Mock = {
  className: "bg-gray-500",
  hoverColor: "hover:bg-gray-500",
  onClick: () => [],
  borderless: true,
  underline: true,
  children: "Test Button",
};

describe("Button", () => {
  it("renders a right content", async () => {
    await act(async () =>
      render(
        <Button
          className={mock.className}
          onClick={mock.onClick}
          borderless={mock.borderless}
          underline={mock.underline}
        >
          {mock.children}
        </Button>,
      ),
    );

    const content = screen.getByRole("button");

    expect(content).toBeInTheDocument();
    expect(content).toHaveClass(mock.className as string);
    expect(content).toHaveTextContent(mock.children);
  });
});
