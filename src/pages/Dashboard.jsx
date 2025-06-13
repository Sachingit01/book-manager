import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Header } from "../components/Layout/Header";
import { BookFilters } from "../components/Books/BookFilters";
import { BookList } from "../components/Books/BookList";
import { BookForm } from "../components/Books/BookForm";
import { DeleteConfirmModal } from "../components/Books/DeleteConfirmModal";
import { Pagination } from "../components/Books/Pagination";
import axios from "axios";

const Dashboard = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: "", genre: "", status: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState(null);
  const [deletingBookTitle, setDeletingBookTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 9;

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios.get("/books.json");
    // Simulate loading delay
    setTimeout(() => {
      setAllBooks(data);
      setIsLoading(false);
    }, 500); //seconds delay
  }, []);

  const applyFilters = useCallback(
    (books) => {
      let filteredBooks = [...books];
      if (filters.search) {
        filteredBooks = filteredBooks.filter((book) =>
          book.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      if (filters.genre) {
        filteredBooks = filteredBooks.filter(
          (book) => book.genre === filters.genre
        );
      }
      if (filters.status) {
        filteredBooks = filteredBooks.filter(
          (book) => book.status === filters.status
        );
      }
      return filteredBooks;
    },
    [filters]
  );

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const paginatedBooks = useMemo(() => {
    const filteredBooks = applyFilters(allBooks);
    return filteredBooks.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [allBooks, applyFilters, currentPage]);

  const totalBooks = useMemo(
    () => applyFilters(allBooks).length,
    [allBooks, applyFilters]
  );
  const totalPages = useMemo(
    () => Math.ceil(totalBooks / itemsPerPage),
    [totalBooks]
  );

  const genres = useMemo(
    () => [...new Set(allBooks.map((b) => b.genre))],
    [allBooks]
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddBook={() => setShowForm(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Book Management Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your library collection with ease. Add, edit, search, and
            organize your books.
          </p>
        </div>

        <BookFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          genres={genres}
        />

        {!isLoading && totalBooks > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {paginatedBooks.length} of {totalBooks} books
              {filters.search && ` matching "${filters.search}"`}
              {filters.genre && ` in ${filters.genre}`}
              {filters.status && ` with status "${filters.status}"`}
            </p>
          </div>
        )}

        <BookList
          books={paginatedBooks}
          loading={isLoading}
          onEdit={(book) => {
            setEditingBook(book);
            setShowForm(true);
          }}
          onDelete={(id) => {
            const book = allBooks.find((b) => b.id === id);
            if (book) {
              setDeletingBookId(id);
              setDeletingBookTitle(book.title);
            }
          }}
        />

        {!isLoading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {showForm && (
          <BookForm
            book={editingBook}
            onSubmit={(data) => {
              if (editingBook) {
                const updatedBooks = allBooks.map((b) =>
                  b.id === editingBook.id ? { ...data, id: editingBook.id } : b
                );
                setAllBooks(updatedBooks);
              } else {
                const newBook = {
                  ...data,
                  id: Date.now().toString(),
                };
                setAllBooks([...allBooks, newBook]);
              }
              setShowForm(false);
              setEditingBook(null);
            }}
            onClose={() => {
              setShowForm(false);
              setEditingBook(null);
            }}
            isLoading={false}
          />
        )}

        {deletingBookId && (
          <DeleteConfirmModal
            bookTitle={deletingBookTitle}
            onConfirm={() => {
              const updatedBooks = allBooks.filter(
                (b) => b.id !== deletingBookId
              );
              setAllBooks(updatedBooks);
              setDeletingBookId(null);
              setDeletingBookTitle("");
              if (totalBooks === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            onCancel={() => {
              setDeletingBookId(null);
              setDeletingBookTitle("");
            }}
            isLoading={false}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
