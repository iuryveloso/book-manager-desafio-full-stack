export interface Book {
  id: string;
  title: string;
  author: string;
  year?: number;
  description?: string;
}

export interface Books {
  totalItems: number;
  totalPages: number;
  books: Book[];
}

export interface Navigate {
  itemsPerPage: number;
  page: number;
  totalItems: number;
  totalPages: number;
  search?: string;
}

export interface Unauthenticated {
  message: string;
  error: string;
  statusCode: number;
}
