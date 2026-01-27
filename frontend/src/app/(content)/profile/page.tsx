"use client";
import { useContext, useRef } from "react";
import type { ChangeEvent } from "react";
import {
  userUpdate,
  userUpdateAvatar,
  userUpdatePassword,
} from "@/functions/userFunctions";
import Input from "@/components/input";
import Button from "@/components/button";
import { AppContext } from "@/context/appContext";
import { authLogout } from "@/functions/authFunctions";
import EyeSlashIcon from "@/icons/eyeSlash";
import EyeIcon from "@/icons/eye";
import { Layout } from "@/components/layout";
import UseAlerts from "@/hooks/useAlerts";
import useUser from "@/hooks/useUser";
import Image from "next/image";

export default function Profile() {
  const { user, setUser } = useContext(AppContext);

  const imagesDomain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/uploads`;

  const { userState, userDispatch } = useUser(user);

  const { alertState, alertDispatch } = UseAlerts();

  const inputRef = useRef<HTMLInputElement>(null);

  function onCLickCurrentPasswordIcon() {
    userDispatch({
      type: "setShowPasswords",
      ...userState,
      showPasswords: {
        ...userState.showPasswords,
        current_password: !userState.showPasswords.current_password,
      },
    });
  }

  function onCLickPasswordIcon() {
    userDispatch({
      type: "setShowPasswords",
      ...userState,
      showPasswords: {
        ...userState.showPasswords,
        password: !userState.showPasswords.password,
      },
    });
  }

  function onCLickPasswordConfirmationIcon() {
    userDispatch({
      type: "setShowPasswords",
      ...userState,
      showPasswords: {
        ...userState.showPasswords,
        password_confirmation: !userState.showPasswords.password_confirmation,
      },
    });
  }

  function updateUserClick() {
    userUpdate(userState, setUser, alertState, alertDispatch);
  }

  function updatePasswordClick() {
    userUpdatePassword(userState, alertState, alertDispatch);
    userDispatch({
      type: "resetPasswords",
      ...userState,
    });
  }

  function fileupload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    userUpdateAvatar(files[0], setUser, alertState, alertDispatch);
  }

  function updateAvatarClick() {
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  }

  function onClickLogout() {
    authLogout(alertState, alertDispatch);
  }

  return (
    <Layout
      title={"Profile"}
      user={user}
      onClickLogout={onClickLogout}
      alertState={alertState}
    >
      <div className={"mt-3 flex flex-col items-center"}>
        <div className={"container flex flex-wrap justify-center"}>
          <div
            className={`mb-2 flex w-11/12 pr-0 sm:w-3/9 sm:pr-2 md:w-2/7 lg:w-1/5`}
          >
            <div
              className={`h-full w-full rounded-xl border border-gray-300 bg-white px-5 pt-5 pb-2`}
            >
              <div className={"mb-3 flex justify-center"}>
                <Image
                  loader={({ src }) => src}
                  unoptimized={true}
                  src={
                    user.avatar ? `${imagesDomain}/${user.avatar}` : "/user.svg"
                  }
                  width={250}
                  height={250}
                  alt={"Profile"}
                  priority={true}
                  className={`h-36 w-36 rounded-full border border-gray-300`}
                />
              </div>
              <div className={"flex justify-center"}>
                <Button className={"bg-amber-500"} onClick={updateAvatarClick}>
                  Change Avatar
                </Button>
                <input
                  type={"file"}
                  accept={"image/png, image/jpeg"}
                  hidden
                  ref={inputRef}
                  onChange={(e) => fileupload(e)}
                />
              </div>
            </div>
          </div>
          <div
            className={
              "mb-2 w-11/12 rounded-xl border border-gray-300 bg-white px-5 py-3 sm:w-6/9 md:w-5/7 lg:w-4/5"
            }
          >
            <div className={"mb-5"}>
              <label htmlFor={"nameInput"}>Name</label>
              <Input
                value={userState.user.name}
                id={"nameInput"}
                onChange={(e) =>
                  userDispatch({
                    type: "setUser",
                    ...userState,
                    user: { ...userState.user, name: e.target.value },
                  })
                }
              />
            </div>
            <div className={"mb-6"}>
              <label htmlFor={"emailInput"}>Email</label>
              <Input
                value={userState.user.email}
                id={"emailInput"}
                onChange={(e) =>
                  userDispatch({
                    type: "setUser",
                    ...userState,
                    user: { ...userState.user, email: e.target.value },
                  })
                }
              />
            </div>
            <div className={"flex justify-end"}>
              <Button className={"bg-green-500"} onClick={updateUserClick}>
                Change Personal Data
              </Button>
            </div>
          </div>
          <div
            className={
              "w-11/12 rounded-xl border border-gray-300 bg-white px-5 py-3 sm:w-full"
            }
          >
            <div className={"mb-5"}>
              <label htmlFor={"current_passwordInput"}>Current Password</label>
              <Input
                type={
                  userState.showPasswords.current_password ? "text" : "password"
                }
                value={userState.credentials.current_password}
                id={"current_passwordInput"}
                onChange={(e) =>
                  userDispatch({
                    type: "setCredentials",
                    ...userState,
                    credentials: {
                      ...userState.credentials,
                      current_password: e.target.value,
                    },
                  })
                }
                Icon={
                  userState.showPasswords.current_password
                    ? EyeSlashIcon
                    : EyeIcon
                }
                onCLickIcon={onCLickCurrentPasswordIcon}
              />
            </div>
            <div className={"mb-5"}>
              <label htmlFor={"passwordInput"}>New Password</label>
              <Input
                type={userState.showPasswords.password ? "text" : "password"}
                value={userState.credentials.password}
                id={"passwordInput"}
                onChange={(e) =>
                  userDispatch({
                    type: "setCredentials",
                    ...userState,
                    credentials: {
                      ...userState.credentials,
                      password: e.target.value,
                    },
                  })
                }
                Icon={userState.showPasswords.password ? EyeSlashIcon : EyeIcon}
                onCLickIcon={onCLickPasswordIcon}
              />
              <div className={"flex"}>
                <label className={"text-end text-xs"}>
                  Please make sure the password is at least 6 characters long
                </label>
              </div>
            </div>
            <div className={"mb-5"}>
              <label htmlFor={"password_confirmationInput"}>
                Confirm New Password
              </label>
              <Input
                type={
                  userState.showPasswords.password_confirmation
                    ? "text"
                    : "password"
                }
                value={userState.credentials.password_confirmation}
                id={"password_confirmationInput"}
                onChange={(e) =>
                  userDispatch({
                    type: "setCredentials",
                    ...userState,
                    credentials: {
                      ...userState.credentials,
                      password_confirmation: e.target.value,
                    },
                  })
                }
                Icon={
                  userState.showPasswords.password_confirmation
                    ? EyeSlashIcon
                    : EyeIcon
                }
                onCLickIcon={onCLickPasswordConfirmationIcon}
              />
            </div>
            <div className={"flex justify-end"}>
              <Button className={"bg-indigo-400"} onClick={updatePasswordClick}>
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
