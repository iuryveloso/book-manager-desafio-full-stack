import { login, logout, register } from "@/api/authApi";
import type { ActionDispatch, Dispatch, SetStateAction } from "react";
import type { User, UserState } from "@/interfaces/userInterfaces";
import { userShow } from "@/functions/userFunctions";
import type {
  AlertAction,
  AlertState,
  Errors,
} from "@/interfaces/alertsInterfaces";
import { redirect } from "next/navigation";

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).statusCode === 400 || (value as Errors).statusCode === 500;

export async function authLogin(
  userState: UserState,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
  setUser: Dispatch<SetStateAction<User>>,
) {
  const { email } = userState.user;
  const { password } = userState.credentials;
  await login(email, password).then((data) => {
    if (isErrors(data)) {
      alertDispatch({
        type: "setErrors",
        errors: data,
        message: alertState.message,
      });
      return;
    }
    userShow(setUser);
    alertDispatch({
      type: "setMessage",
      errors: alertState.errors,
      message: data,
    });
    setTimeout(() => {
      redirect("/");
    }, 1000);
  });
}

export async function authRegister(
  userState: UserState,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
  setUser: Dispatch<SetStateAction<User>>,
) {
  const { name, email } = userState.user;
  const { password, password_confirmation } = userState.credentials;
  await register(name, email, password, password_confirmation).then((data) => {
    if (isErrors(data)) {
      alertDispatch({
        type: "setErrors",
        errors: data,
        message: alertState.message,
      });
      return;
    }
    userShow(setUser);
    alertDispatch({
      type: "setMessage",
      errors: alertState.errors,
      message: data,
    });
    setTimeout(() => {
      redirect("/");
    }, 1000);
  });
}

export async function authLogout(
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  await logout().then((data) => {
    if (isErrors(data)) {
      alertDispatch({
        type: "setErrors",
        errors: data,
        message: alertState.message,
      });
      return;
    }
    alertDispatch({
      type: "setMessage",
      errors: alertState.errors,
      message: data,
    });
    setTimeout(() => {
      redirect("/auth");
    }, 1000);
  });
}
