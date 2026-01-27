"use client";
import type { User } from "@/interfaces/userInterfaces";
import { useState } from "react";
import Button from "./button";
import Image from "next/image";
import Link from "next/link";

interface NavProfile {
  user: User;
  onClickLogout: () => void;
}

export default function NavProfile({ user, onClickLogout }: NavProfile) {
  const imagesDomain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/uploads`;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`flex flex-col items-center`}>
      <div className={"flex items-center"}>
        <Image
          loader={({ src }) => src}
          unoptimized={true}
          src={user.avatar ? `${imagesDomain}/${user.avatar}` : "/user.svg"}
          width={100}
          height={100}
          alt={"Main logo"}
          priority={true}
          onClick={() => setShowMenu(!showMenu)}
          className={
            "h-10 w-10 cursor-pointer rounded-full border border-gray-300 bg-white"
          }
        />
      </div>
      {showMenu ? (
        <>
          <div
            className={"fixed inset-0 z-10 h-screen w-screen"}
            onClick={() => setShowMenu(!showMenu)}
          />
          <div
            className={`z-20 fixed mt-12 mr-50 border border-gray-300 w-60 rounded-xl bg-white shadow-md`}
          >
            <div className={"flex h-full flex-col justify-center p-2"}>
              <div
                className={
                  "flex items-center border-b border-gray-300 pb-1 font-semibold"
                }
              >
                <Image
                  loader={({ src }) => src}
                  unoptimized={true}
                  src={
                    user.avatar ? `${imagesDomain}/${user.avatar}` : "/user.svg"
                  }
                  width={100}
                  height={100}
                  alt={"Main logo"}
                  priority={true}
                  className={
                    "h-10 w-10 mr-1 rounded-full border border-gray-300 bg-white"
                  }
                />
                <label className={"overflow-x-auto py-2"}>{user.name}</label>
              </div>
              <Link href={"/profile"}>
                <Button
                  variant={"ghost"}
                  borderless
                  className={" justify-start"}
                >
                  User profile
                </Button>
              </Link>
              <Button
                variant={"ghost"}
                onClick={() => {
                  setShowMenu(!showMenu);
                  onClickLogout();
                }}
                borderless
                className={" justify-start"}
              >
                Log out
              </Button>
            </div>
          </div>
        </>
      ) : (
        false
      )}
    </div>
  );
}
