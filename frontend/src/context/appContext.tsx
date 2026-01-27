"use client";
import { userShow } from "@/functions/userFunctions";
import type { User } from "@/interfaces/userInterfaces";
import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactElement, SetStateAction } from "react";

interface Context {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const AppContext = createContext<Context>({
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  setUser: () => [],
});

export default function AppProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    userShow(setUser);
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
