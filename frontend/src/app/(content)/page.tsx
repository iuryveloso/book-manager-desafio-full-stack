"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/appContext";
import { authLogout } from "@/functions/authFunctions";
import { Layout } from "@/components/layout";
import useAlerts from "@/hooks/useAlerts";
import { Book, Navigate } from "@/interfaces/bookInterfaces";
import { bookRemove, booksGet } from "@/functions/bookFunctions";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "@/components/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function Dashboard() {
  const { user } = useContext(AppContext);
  const { alertState, alertDispatch } = useAlerts();

  const [navigate, setNavigate] = useState<Navigate>({
    itemsPerPage: 5,
    page: 1,
    totalItems: 0,
    totalPages: 0,
  });

  const [bookCover, setBookCover] = useState("");

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    booksGet(
      navigate.itemsPerPage,
      navigate.page,
      setBooks,
      setNavigate,
      alertState,
      alertDispatch,
    );
  }, [alertDispatch, alertState, navigate.itemsPerPage, navigate.page]);

  async function getBookCover(book: Book) {
    setBookCover("/books_manager_transparent.svg");
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&limit=1`;
    const bookInfo = await fetch(url).then((res) => res.json());
    if (bookInfo.docs && bookInfo.docs.length > 0 && bookInfo.docs[0].cover_i) {
      setBookCover(
        `https://covers.openlibrary.org/b/id/${bookInfo.docs[0].cover_i}-L.jpg`,
      );
    }
  }

  function onClickLogout() {
    authLogout(alertState, alertDispatch);
  }

  return (
    <Layout
      title={`${user ? user.name : "User"} books`}
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
            <div className={"flex flex-col h-full"}>
              <div
                className={"p-4 flex flex-col md:flex-row items-center gap-4"}
              >
                <Link href={"/new"}>
                  <Button className={"bg-green-600 cursor-pointer"}>
                    Add New Book
                  </Button>
                </Link>
                <div className={"flex grow justify-end"}>
                  <Input
                    placeholder={"Search books..."}
                    value={navigate.search || ""}
                    onChange={(e) =>
                      setNavigate((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                  <Button
                    className={"bg-blue-600 ml-2 cursor-pointer"}
                    onClick={() => {
                      booksGet(
                        navigate.itemsPerPage,
                        1,
                        setBooks,
                        setNavigate,
                        alertState,
                        alertDispatch,
                        navigate.search,
                      );
                      setNavigate((prev) => ({
                        ...prev,
                        page: 1,
                      }));
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
              <div className={"grow"}>
                {books.map((book) => {
                  return (
                    <Item key={book.id}>
                      <ItemContent>
                        <ItemTitle>{book.title}</ItemTitle>
                        <ItemDescription>{book.author}</ItemDescription>
                      </ItemContent>
                      <ItemActions
                        className={
                          "flex flex-col md:flex-row gap-1 md:gap-2 items-end"
                        }
                      >
                        <div className={"flex gap-1 md:gap-2"}>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => getBookCover(book)}
                                className={"bg-cyan-500 cursor-pointer"}
                              >
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{book.title}</DialogTitle>
                                <DialogDescription>
                                  {book.author}{" "}
                                  {book.year ? "(" + book.year + ")" : ""}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                                <Image
                                  loader={({ src }) => src}
                                  unoptimized={true}
                                  src={
                                    bookCover ||
                                    "/books_manager_transparent.svg"
                                  }
                                  width={250}
                                  height={250}
                                  alt={"Profile"}
                                  priority={true}
                                  className={`h-74 w-40 border border-gray-300`}
                                />
                                <p className="ml-4 leading-normal">
                                  {book.description}
                                </p>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button className={"cursor-pointer"}>
                                    Close
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Link href={`/edit/${book.id}`}>
                            <Button className={"bg-amber-500 cursor-pointer"}>
                              Edit
                            </Button>
                          </Link>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className={"bg-red-600  cursor-pointer"}>
                              Remove
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Remove Book</DialogTitle>
                            </DialogHeader>
                            <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                              <p className="mb-4 leading-normal">
                                Are you sure you want to remove &quot;
                                {book.title}&quot; by {book.author}?
                              </p>
                            </div>
                            <DialogFooter>
                              <Button
                                variant={"outline"}
                                className={"cursor-pointer"}
                                onClick={() => {
                                  bookRemove(
                                    book.id,
                                    alertState,
                                    alertDispatch,
                                  );
                                }}
                              >
                                Yes
                              </Button>
                              <DialogClose asChild>
                                <Button className={"cursor-pointer"}>No</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </ItemActions>
                    </Item>
                  );
                })}
              </div>
              <Pagination className={"flex flex-col items-center gap-2 p-4"}>
                <div className={"flex items-center italic text-md"}>
                  <Select
                    value={`${navigate.itemsPerPage}`}
                    onValueChange={(value) => {
                      const itemsPerPage = parseInt(value, 10);
                      booksGet(
                        itemsPerPage,
                        1,
                        setBooks,
                        setNavigate,
                        alertState,
                        alertDispatch,
                      );
                      setNavigate((prev) => ({
                        ...prev,
                        itemsPerPage,
                        page: 1,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"5"}>5</SelectItem>
                      <SelectItem value={"10"}>10</SelectItem>
                      <SelectItem value={"20"}>20</SelectItem>
                    </SelectContent>
                  </Select>
                  <p
                    className={"ml-1"}
                  >{`books out of ${navigate.totalItems}`}</p>
                </div>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      data-testid={"pagination_previous_test"}
                      onClick={() => {
                        if (navigate.page > 1) {
                          booksGet(
                            navigate.itemsPerPage,
                            navigate.page - 1,
                            setBooks,
                            setNavigate,
                            alertState,
                            alertDispatch,
                          );
                          setNavigate((prev) => ({
                            ...prev,
                            page: prev.page - 1,
                          }));
                        }
                      }}
                      className={"cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from(
                    { length: navigate.totalPages },
                    (_, index) => index,
                  ).map((index) => {
                    return (
                      <PaginationItem key={index} className={"cursor-pointer"}>
                        <PaginationLink
                          data-testid={`pagination_${index + 1}_test`}
                          onClick={() => {
                            if (navigate.page !== index + 1) {
                              booksGet(
                                navigate.itemsPerPage,
                                index + 1,
                                setBooks,
                                setNavigate,
                                alertState,
                                alertDispatch,
                              );
                              setNavigate((prev) => ({
                                ...prev,
                                page: index + 1,
                              }));
                            }
                          }}
                          isActive={navigate.page === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      data-testid={"pagination_next_test"}
                      onClick={() => {
                        if (navigate.page < navigate.totalPages) {
                          booksGet(
                            navigate.itemsPerPage,
                            navigate.page + 1,
                            setBooks,
                            setNavigate,
                            alertState,
                            alertDispatch,
                          );
                          setNavigate((prev) => ({
                            ...prev,
                            page: prev.page + 1,
                          }));
                        }
                      }}
                      className={"cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
