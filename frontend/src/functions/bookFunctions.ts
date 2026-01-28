import { remove, show, update, get, create } from "@/api/bookApi";
import type { ActionDispatch, Dispatch, SetStateAction } from "react";
import type {
  Book,
  Navigate,
  Unauthenticated,
} from "@/interfaces/bookInterfaces";
import type {
  AlertAction,
  AlertState,
  Errors,
} from "@/interfaces/alertsInterfaces";
import { redirect } from "next/navigation";

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).statusCode === 400 || (value as Errors).statusCode === 500;

const isUnauthenticated = (value: unknown): value is Unauthenticated =>
  (value as Unauthenticated).statusCode === 401;

export async function booksGet(
  itemsPerPage: number,
  page: number,
  setBooks: Dispatch<SetStateAction<Book[]>>,
  setNavigate: Dispatch<SetStateAction<Navigate>>,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
  search?: string,
) {
  await get(itemsPerPage, page, search).then((data) => {
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

    setNavigate((prev) => {
      return {
        ...prev,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      };
    });

    setBooks(data.books);
  });
}

export async function bookGetCover(
  book: Book,
  setBookCover: Dispatch<SetStateAction<string>>,
) {
  setBookCover("/books_manager_transparent.svg");
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&limit=1`;
  const bookInfo = await fetch(url).then((res) => res.json());
  if (bookInfo.docs && bookInfo.docs.length > 0 && bookInfo.docs[0].cover_i) {
    setBookCover(
      `https://covers.openlibrary.org/b/id/${bookInfo.docs[0].cover_i}-L.jpg`,
    );
  }
}

export async function bookShow(
  id: string,
  setBook: Dispatch<SetStateAction<Book>>,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  await show(id).then((data) => {
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

    setBook(data);
  });
}

export async function bookCreate(
  book: Book,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  const { title, author, year, description } = book;
  await create(title, author, year, description).then((data) => {
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

    setTimeout(() => {
      redirect("/");
    }, 2000);
  });
}
export async function bookUpdate(
  book: Book,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  const { id, title, author, year, description } = book;
  await update(id, title, author, year, description).then((data) => {
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

    setTimeout(() => {
      redirect("/");
    }, 2000);
  });
}

export async function bookRemove(
  id: string,
  alertState: AlertState,
  alertDispatch: ActionDispatch<[action: AlertAction]>,
) {
  await remove(id).then((data) => {
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
    redirect("/");
  });
}
