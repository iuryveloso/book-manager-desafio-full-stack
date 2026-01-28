import type { Errors, Message } from "@/interfaces/alertsInterfaces";
import type { Book, Books, Unauthenticated } from "@/interfaces/bookInterfaces";

const domain: string = process.env.NEXT_PUBLIC_API_DOMAIN || "";

export async function get(
  itemsPerPage: number,
  page: number,
  search?: string,
): Promise<Unauthenticated | Books | Errors> {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  return await fetch(
    `${domain}/api/books?itemsPerPage=${itemsPerPage}&page=${page}${searchParam}`,
    {
      method: "GET",
      credentials: "include",
    },
  ).then((e) => e.json());
}

export async function show(
  id: string,
): Promise<Unauthenticated | Book | Errors> {
  return await fetch(`${domain}/api/books/${id}`, {
    method: "GET",
    credentials: "include",
  }).then((e) => e.json());
}

export async function create(
  title: string,
  author: string,
  year?: number,
  description?: string,
): Promise<Unauthenticated | Message | Errors> {
  return await fetch(`${domain}/api/books`, {
    method: "POST",
    body: JSON.stringify({ title, author, year, description }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then((e) => e.json());
}

export async function update(
  id: string,
  title: string,
  author: string,
  year?: number,
  description?: string,
): Promise<Unauthenticated | Message | Errors> {
  return await fetch(`${domain}/api/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, author, year, description }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then((e) => e.json());
}

export async function remove(
  id: string,
): Promise<Unauthenticated | Message | Errors> {
  return await fetch(`${domain}/api/books/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then((e) => e.json());
}
