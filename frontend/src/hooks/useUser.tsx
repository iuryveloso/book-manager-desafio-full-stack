import type { User, UserAction, UserState } from "@/interfaces/userInterfaces";
import { useEffect, useReducer } from "react";

export default function useUserReducer(user?: User) {
  const userInitialState: UserState = {
    user: {
      name: "",
      email: "",
    },
    credentials: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    showPasswords: {
      current_password: false,
      password: false,
      password_confirmation: false,
    },
    showRegisterForm: false,
  };

  function UserReducer(state: UserState, action: UserAction): UserState {
    const { type, user, credentials, showPasswords, showRegisterForm } = action;
    switch (type) {
      case "setUser":
        return { ...state, user };
      case "setCredentials":
        return { ...state, credentials };
      case "setShowPasswords":
        return { ...state, showPasswords };
      case "setShowRegisterForm":
        return { ...state, showRegisterForm };
      case "resetUser":
        return { ...state, user: userInitialState.user };
      case "resetPasswords":
        return { ...state, showPasswords: userInitialState.showPasswords };
      default:
        throw new Error();
    }
  }

  const [userState, userDispatch] = useReducer(UserReducer, userInitialState);

  useEffect(() => {
    if (user)
      userDispatch({
        type: "setUser",
        ...userState,
        user,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { userState, userDispatch };
}
