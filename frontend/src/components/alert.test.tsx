import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Alert from "./alert";
import type { AlertState } from "@/interfaces/alertsInterfaces";

interface Alert {
  alertState: AlertState;
}

const mock: Alert = {
  alertState: {
    errors: {
      message: ["mock error message"],
      error: "mock error",
      statusCode: 500,
    },
    message: { response_message: "mock message" },
  },
};

describe("Card", () => {
  render(<Alert alertState={mock.alertState} />);

  it("renders a right content", () => {
    const errors = screen.getByText(mock.alertState.errors.message[0]);
    expect(errors).toBeInTheDocument();

    const message = screen.getByText(mock.alertState.message.response_message);
    expect(message).toBeInTheDocument();
  });
});
