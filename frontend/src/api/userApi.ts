import type { Errors, Message } from "@/interfaces/alertsInterfaces";
import type { User, Unauthenticated } from "@/interfaces/userInterfaces";

const domain: string = process.env.NEXT_PUBLIC_API_DOMAIN || "";

export async function show(): Promise<Unauthenticated | User> {
  return await fetch(`${domain}/api/users`, {
    method: "GET",
    credentials: "include",
  }).then((e) => e.json());
}

export async function update(
  name: string,
  email: string,
): Promise<Unauthenticated | Message | Errors> {
  return await fetch(`${domain}/api/users`, {
    method: "PATCH",
    body: JSON.stringify({ name, email }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then((e) => e.json());
}

export async function updateAvatar(
  avatar: File,
): Promise<Unauthenticated | Message | Errors> {
  const userFormData = new FormData();
  userFormData.append("avatar", avatar);
  return await fetch(`${domain}/api/users/avatar`, {
    method: "PATCH",
    body: userFormData,
    credentials: "include",
  }).then((e) => e.json());
}

export async function updatePassword(
  current_password: string,
  password: string,
  password_confirmation: string,
): Promise<Unauthenticated | Message | Errors> {
  return await fetch(`${domain}/api/users/password`, {
    method: "PATCH",
    body: JSON.stringify({ current_password, password, password_confirmation }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then((e) => e.json());
}

export async function remove(): Promise<Unauthenticated | Message | Errors> {
  return await fetch(`${domain}/api/users`, {
    method: "DELETE",
    credentials: "include",
  }).then((e) => e.json());
}
