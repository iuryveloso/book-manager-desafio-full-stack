"use client";
import { useContext } from "react";
import { AppContext } from "@/context/appContext";
import { authLogout } from "@/functions/authFunctions";
import { Layout } from "@/components/layout";
import useAlerts from "@/hooks/useAlerts";

export default function Dashboard() {
  const { user } = useContext(AppContext);
  const { alertState, alertDispatch } = useAlerts();

  function onClickLogout() {
    authLogout(alertState, alertDispatch);
  }

  return (
    <Layout user={user} onClickLogout={onClickLogout} alertState={alertState}>
      <div className={"mt-3 flex h-full flex-col items-center"}>
        <div className={"container flex h-full flex-col justify-center"}>
          <div
            className={
              "grow overflow-y-auto rounded-xl border border-gray-300 bg-white px-5 py-3"
            }
          >
            <h1 className={"text-4xl"}>Dashboard</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
