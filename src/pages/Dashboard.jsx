import React, { useMemo, useState, useCallback } from "react";
import useSWR from "swr";
import { bookService } from "../services/bookService";
import { Header } from "../components/Layout/Header";
import { BookFilters } from "../components/Books/BookFilters";
import { BookList } from "../components/Books/BookList";
import { BookForm } from "../components/Books/BookForm";
import { DeleteConfirmModal } from "../components/Books/DeleteConfirmModal";
import { Pagination } from "../components/Books/Pagination";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ search: "", genre: "", status: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBookId, setDeletingBookId] = useState(null);
  const [deletingBookTitle, setDeletingBookTitle] = useState("");
  const itemsPerPage = 9;

  const {
    data: allBooks = [],
    isLoading,
    mutate,
  } = useSWR("books", bookService.getBooks);

  const applyFilters = useCallback(
    (books) => {
      return books
        .filter((book) =>
          filters.search
            ? [
                book.title.toLowerCase(),
                book.author.toLowerCase(),
              ].some((field) => field.includes(filters.search.toLowerCase()))
            : true
        )
        .filter((book) => (filters.genre ? book.genre === filters.genre : true))
        .filter((book) =>
          filters.status ? book.status === filters.status : true
        );
    },
    [filters]
  );

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const paginatedBooks = useMemo(() => {
    const filtered = applyFilters(allBooks);
    return filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [allBooks, applyFilters, currentPage]);

  const totalBooks = applyFilters(allBooks).length;
  const totalPages = Math.ceil(totalBooks / itemsPerPage);

  const genres = useMemo(
    () => [...new Set(allBooks.map((b) => b.genre))],
    [allBooks]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddBook={() => setShowForm(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Book Management Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your library collection with ease. Add, edit, search, and
          organize your books.
        </p>

        <BookFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          genres={genres}
        />

        {!isLoading && totalBooks > 0 && (
          <p className="text-sm text-gray-600 mb-4">
            Showing {paginatedBooks.length} of {totalBooks} books
            {filters.search && ` matching "${filters.search}"`}
            {filters.genre && ` in ${filters.genre}`}
            {filters.status && ` with status "${filters.status}"`}
          </p>
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

        {totalPages > 1 && !isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {showForm && (
          <BookForm
            book={editingBook}
            onSubmit={async (data) => {
              try {
                if (editingBook) {
                  await bookService.updateBook(editingBook.id, data);
                  toast.success("Book updated successfully!");
                } else {
                  await bookService.addBook(data);
                  toast.success("Book added successfully!");
                }
                await mutate(); // Refresh list
                setShowForm(false);
                setEditingBook(null);
              } catch (err) {
                toast.error("Failed to save book");
                console.error("Error saving book:", err);
              }
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
            onConfirm={async () => {
              try {
                await bookService.deleteBook(deletingBookId);
                toast.success("Book deleted!");
                await mutate(); // Refresh list
                setDeletingBookId(null);
                setDeletingBookTitle("");
                if (totalBooks === 1 && currentPage > 1)
                  setCurrentPage(currentPage - 1);
              } catch (err) {
                toast.error("Failed to delete book");
                console.error("Error deleting book:", err);
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
