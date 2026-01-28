"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/appContext";
import { authLogout } from "@/functions/authFunctions";
import { Layout } from "@/components/layout";
import useAlerts from "@/hooks/useAlerts";
import { Book } from "@/interfaces/bookInterfaces";
import Input from "@/components/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/button";
import Link from "next/link";
import { bookShow, bookUpdate } from "@/functions/bookFunctions";
import { useParams } from "next/navigation";
export default function Edit() {
  const { user } = useContext(AppContext);
  const { alertState, alertDispatch } = useAlerts();

  const params = useParams<{ id: string }>();

  const [book, setBook] = useState<Book>({
    id: "",
    title: "",
    author: "",
    year: new Date().getFullYear(),
    description: "",
  });

  useEffect(() => {
    bookShow(params.id, setBook, alertState, alertDispatch);
  }, [alertDispatch, alertState, params.id]);

  function onClickLogout() {
    authLogout(alertState, alertDispatch);
  }

  return (
    <Layout
      title={`Edit book info`}
      user={user}
      onClickLogout={onClickLogout}
      alertState={alertState}
    >
      <div className={"mt-3 flex h-full flex-col items-center"}>
        <div className={"container flex h-full flex-col justify-center"}>
          <div
            className={
              "grow overflow-y-auto rounded-xl border border-gray-300 bg-white px-5 py-3"
            }
          >
            <div className={"p-4"}>
              <label htmlFor="title" className={"text-lg"}>
                Title
              </label>
              <Input
                id={"title"}
                value={book.title}
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className={"p-4"}>
              <label htmlFor="author" className={"text-lg"}>
                Author
              </label>
              <Input
                id={"author"}
                value={book.author}
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, author: e.target.value }))
                }
              />
            </div>
            <div className={"p-4"}>
              <label htmlFor="year" className={"text-lg"}>
                Year
              </label>
              <Input
                type="number"
                id={"year"}
                value={`${book.year}`}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    year: +e.target.value,
                  }))
                }
              />
            </div>
            <div className={"p-4"}>
              <label htmlFor="description" className={"text-lg"}>
                Description
              </label>
              <Textarea
                id={"description"}
                value={book.description}
                onChange={(e) =>
                  setBook((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div className={"flex justify-end p-4 gap-2"}>
              <Link href={`/`}>
                <Button className={"bg-red-500 cursor-pointer"}>Back</Button>
              </Link>
              <Button
                onClick={() => bookUpdate(book, alertState, alertDispatch)}
                className={"bg-green-600 cursor-pointer"}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
