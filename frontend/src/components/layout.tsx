import Alert from "@/components/alert";
import NavProfile from "@/components/navProfile";
import type { AlertState } from "@/interfaces/alertsInterfaces";
import type { User } from "@/interfaces/userInterfaces";
import Image from "next/image";
import Link from "next/link";

interface Layout {
  children: React.ReactNode;
  title?: string;
  alertState: AlertState;
  user: User;
  onClickLogout: () => void;
}

export function Layout({
  children,
  title,
  alertState,
  user,
  onClickLogout,
}: Layout) {
  return (
    <div
      className={
        "flex h-screen flex-col overflow-y-auto bg-gray-100 text-gray-700"
      }
    >
      <header className={"mx-5 mt-5 flex flex-col items-center"}>
        <Alert alertState={alertState} />
        <div className={"container"}>
          <nav
            className={
              "mb-3 flex flex-col flex-wrap sm:flex-row sm:flex-wrap-reverse"
            }
          >
            <div className={"flex grow items-center"}>
              <Link href={"/"}>
                <div className={"flex items-center"}>
                  <Image
                    src={"/books_manager.svg"}
                    width={100}
                    height={100}
                    alt={"Main logo"}
                    className={"mr-1 h-12 w-12 cursor-pointer"}
                  />
                  <label
                    className={"ml-1 cursor-pointer text-2xl text-gray-700"}
                  >
                    BOOKS MANAGER
                  </label>
                </div>
              </Link>
              <div className={"ml-3 flex grow justify-end"}>
                <div className={"sm:hidden"}>
                  <NavProfile user={user} onClickLogout={onClickLogout} />
                </div>
              </div>
            </div>
            <div
              className={"flex grow items-center justify-center sm:justify-end"}
            >
              <div className={"ml-3 flex"}>
                <div className={"hidden sm:block"}>
                  <NavProfile user={user} onClickLogout={onClickLogout} />
                </div>
              </div>
            </div>
          </nav>
          {title ? (
            <h3 className={"text-center text-2xl text-gray-500"}>{title}</h3>
          ) : (
            false
          )}
        </div>
      </header>
      <div className={"mx-3 grow"}>{children}</div>
      <footer className={"mt-10 mb-5 text-center text-sm text-gray-500"}>
        2026 - Made by @{" "}
        <a
          className="text-blue-500 hover:underline"
          href="mailto:iurysveloso@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Iury Veloso
        </a>
      </footer>
    </div>
  );
}
