import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import NavProfile from "./navProfile";
import type { User } from "@/interfaces/userInterfaces";

interface Mock {
  user: User;
  onClickLogout: () => void;
}

const mock: Mock = {
  user: {
    name: "Mock Name",
    email: "mock.email@email.com",
  },
  onClickLogout: () => [],
};

describe("NavProfile", () => {
  it("renders a profile image", async () => {
    await act(async () =>
      render(
        <NavProfile user={mock.user} onClickLogout={mock.onClickLogout} />,
      ),
    );
    const image = screen.getByTestId("navProfile_test");
    expect(image).toBeInTheDocument();
  });

  it("renders hidden items", async () => {
    await act(async () =>
      render(
        <NavProfile user={mock.user} onClickLogout={mock.onClickLogout} />,
      ),
    );
    const clickableImage = screen.getByTestId("navProfile_test");
    fireEvent.click(clickableImage);

    const userName = screen.getByText(mock.user.name);
    expect(userName).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent("User profile");
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1]).toHaveTextContent("Log out");
  });
});
