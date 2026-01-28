"use client";
import { useContext } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { authLogin, authRegister } from "@/functions/authFunctions";
import EyeSlashIcon from "@/icons/eyeSlash";
import EyeIcon from "@/icons/eye";
import Alert from "@/components/alert";
import { AppContext } from "@/context/appContext";
import UseAlerts from "@/hooks/useAlerts";
import useUser from "@/hooks/useUser";

export default function Auth() {
  const contextData = useContext(AppContext);

  const { userState, userDispatch } = useUser();

  const { alertState, alertDispatch } = UseAlerts();

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

  function loginSubmit() {
    authLogin(userState, alertState, alertDispatch, contextData.setUser);
  }

  function registerSubmit() {
    authRegister(userState, alertState, alertDispatch, contextData.setUser);
  }

  return (
    <div className={"h-screen overflow-y-auto bg-gray-100 text-gray-700"}>
      <div className={"m-5 flex h-screen flex-col items-center"}>
        <Alert alertState={alertState} />
        <div className={"flex w-full grow flex-col justify-center"}>
          <div className={"flex flex-col items-center"}>
            <div className={"container flex justify-center"}>
              <div className={"w-11/12 px-5 py-2 text-center lg:w-4/5"}>
                <h1 className={"mt-3 pb-3 text-3xl"}>BOOKS MANAGER</h1>
              </div>
            </div>
            {!userState.showRegisterForm ? (
              <div className={"container flex flex-wrap justify-center"}>
                <div
                  className={
                    "w-11/12 rounded-xl border border-gray-300 bg-white px-5 py-3 lg:w-4/5"
                  }
                >
                  <div className={"mb-5"}>
                    <label htmlFor={"emailInput"}>Email</label>
                    <Input
                      value={userState.user.email}
                      id={"emailInput"}
                      onChange={(e) =>
                        userDispatch({
                          type: "setUser",
                          ...userState,
                          user: {
                            ...userState.user,
                            email: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className={"mb-5"}>
                    <label htmlFor={"passwordInput"}>Password</label>
                    <Input
                      type={
                        userState.showPasswords.password ? "text" : "password"
                      }
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
                      Icon={
                        userState.showPasswords.password
                          ? EyeSlashIcon
                          : EyeIcon
                      }
                      onCLickIcon={onCLickPasswordIcon}
                    />
                  </div>
                  <div>
                    <Button className={"bg-sky-500"} onClick={loginSubmit}>
                      Login
                    </Button>
                  </div>
                  <div className={"mt-1 flex"}>
                    <label className={"mr-2"}>Not registered yet?</label>
                    <button
                      className={"cursor-pointer font-semibold text-blue-400"}
                      onClick={() => {
                        userDispatch({
                          type: "setShowRegisterForm",
                          ...userState,
                          showRegisterForm: !userState.showRegisterForm,
                        });
                        userDispatch({
                          type: "resetUser",
                          ...userState,
                        });
                        userDispatch({
                          type: "resetPasswords",
                          ...userState,
                        });
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={"container flex flex-wrap justify-center"}>
                <div
                  className={
                    "w-11/12 rounded-xl border border-gray-300 bg-white px-5 py-3 lg:w-4/5"
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
                          user: {
                            ...userState.user,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className={"mb-5"}>
                    <label htmlFor={"emailInput"}>Email</label>
                    <Input
                      value={userState.user.email}
                      id={"emailInput"}
                      onChange={(e) =>
                        userDispatch({
                          type: "setUser",
                          ...userState,
                          user: {
                            ...userState.user,
                            email: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className={"mb-5"}>
                    <label htmlFor={"passwordInput"}>Password</label>
                    <Input
                      type={
                        userState.showPasswords.password ? "text" : "password"
                      }
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
                      Icon={
                        userState.showPasswords.password
                          ? EyeSlashIcon
                          : EyeIcon
                      }
                      onCLickIcon={onCLickPasswordIcon}
                    />
                    <div className={"flex"}>
                      <label className={"text-end text-xs"}>
                        Please make sure the password is at least 6 characters
                        long
                      </label>
                    </div>
                  </div>
                  <div className={"mb-5"}>
                    <label htmlFor={"password_confirmationInput"}>
                      Confirm Password
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
                  <div>
                    <Button className={"bg-green-500"} onClick={registerSubmit}>
                      Register
                    </Button>
                  </div>
                  <div className={"mt-1 flex"}>
                    <label className={"mr-2"}>Already registered?</label>
                    <button
                      className={"cursor-pointer font-semibold text-blue-400"}
                      onClick={() => {
                        userDispatch({
                          type: "setShowRegisterForm",
                          ...userState,
                          showRegisterForm: !userState.showRegisterForm,
                        });
                        userDispatch({
                          type: "resetUser",
                          ...userState,
                        });
                        userDispatch({
                          type: "resetPasswords",
                          ...userState,
                        });
                      }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
