import {
  remove,
  show,
  update,
  updateAvatar,
  updatePassword,
} from "@/api/userApi";
import type { ActionDispatch, Dispatch, SetStateAction } from "react";
import type { User, Unauthenticated } from "@/interfaces/userInterfaces";
import type {
  AlertAction,
  AlertState,
  Errors,
} from "@/interfaces/alertsInterfaces";
import type { UserState } from "@/interfaces/userInterfaces";
import { redirect } from "next/navigation";

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).statusCode === 400 || (value as Errors).statusCode === 500;

const isUnauthenticated = (value: unknown): value is Unauthenticated =>
  (value as Unauthenticated).statusCode === 401;

export async function userShow(setUser: Dispatch<SetStateAction<User>>) {
  await show().then((data) => {
    if (isUnauthenticated(data)) {
      console.log(data);
      redirect("/auth");
    }

    setUser(data);
  });
}

export async function userUpdate(
  userState: UserState,
  setUser: Dispatch<SetStateAction<User>>,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  const { name, email } = userState.user;
  await update(name, email).then((data) => {
    if (isUnauthenticated(data)) {
      redirect("/auth");
    }

    if (isErrors(data)) {
      alertDispatch({
        type: "setErrors",
        ...alertState,
        errors: data,
      });
      return;
    }

    userShow(setUser);
    alertDispatch({
      type: "setMessage",
      ...alertState,
      message: data,
    });
  });
}

export async function userUpdateAvatar(
  file: File,
  setUser: Dispatch<SetStateAction<User>>,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  await updateAvatar(file).then((data) => {
    if (isUnauthenticated(data)) {
      redirect("/auth");
    }

    if (isErrors(data)) {
      alertDispatch({
        type: "setErrors",
        ...alertState,
        errors: data,
      });
      return;
    }
    userShow(setUser);
    alertDispatch({
      type: "setMessage",
      ...alertState,
      message: data,
    });
  });
}

export async function userUpdatePassword(
  userState: UserState,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  const { current_password, password, password_confirmation } =
    userState.credentials;
  await updatePassword(current_password, password, password_confirmation).then(
    (data) => {
      if (isUnauthenticated(data)) {
        redirect("/auth");
      }

      if (isErrors(data)) {
        alertDispatch({
          type: "setErrors",
          ...alertState,
          errors: data,
        });
        return;
      }

      alertDispatch({
        type: "setMessage",
        ...alertState,
        message: data,
      });
    },
  );
}

export async function userRemove(
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  await remove().then((data) => {
    if (isUnauthenticated(data)) {
      redirect("/auth");
    }

    if (isErrors(data)) {
      alertDispatch({
        type: "setErrors",
        ...alertState,
        errors: data,
      });
      return;
    }

    alertDispatch({
      type: "setMessage",
      ...alertState,
      message: data,
    });
    redirect("/auth");
  });
}
