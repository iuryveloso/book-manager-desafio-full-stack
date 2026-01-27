import type { Errors, Message } from "@/interfaces/alertsInterfaces";

const domain: string = process.env.NEXT_PUBLIC_API_DOMAIN || "";

export async function login(
  email: string,
  password: string,
): Promise<Message | Errors> {
  return await fetch(`${domain}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then((e) => e.json());
}

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
): Promise<Message | Errors> {
  return await fetch(`${domain}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password, password_confirmation }),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  }).then((e) => e.json());
}

export async function logout(): Promise<Errors | Message> {
  return await fetch(`${domain}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  }).then((e) => e.json());
}
