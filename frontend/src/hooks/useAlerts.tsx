import type { AlertAction, AlertState } from "@/interfaces/alertsInterfaces";
import { useEffect, useReducer } from "react";

export default function UseAlerts() {
  const alertInitialState: AlertState = {
    errors: { message: [], error: "", statusCode: 0 },
    message: { response_message: "" },
  };

  function AlertReducer(state: AlertState, action: AlertAction): AlertState {
    const { type, errors, message } = action;
    switch (type) {
      case "setErrors":
        return { ...state, errors };
      case "setMessage":
        return { ...state, message };
      case "reset":
        return { ...alertInitialState };
      default:
        throw new Error();
    }
  }
  const [alertState, alertDispatch] = useReducer(
    AlertReducer,
    alertInitialState,
  );

  const isErrorsSetted = alertState.errors.message.length > 0;
  const isMessageSetted = alertState.message.response_message.length > 0;

  useEffect(() => {
    if (isErrorsSetted) {
      setTimeout(() => {
        alertDispatch({
          type: "reset",
          ...alertState,
        });
      }, 3000);
    }
  }, [alertState, alertState.errors.message, isErrorsSetted]);

  useEffect(() => {
    if (isMessageSetted) {
      setTimeout(() => {
        alertDispatch({
          type: "reset",
          ...alertState,
        });
      }, 3000);
    }
  }, [alertState, alertState.message.response_message, isMessageSetted]);

  return { alertState, alertDispatch };
}
