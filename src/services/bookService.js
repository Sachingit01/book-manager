// services/bookService.js
import axios from "axios";

const BASE_URL = "https://684bd07ded2578be881c8e2c.mockapi.io/api/get/books";

export const bookService = {
  getBooks: async () => {
    const { data } = await axios.get(BASE_URL);
    return data;
  },
  addBook: async (book) => {
    const { data } = await axios.post(BASE_URL, book);
    return data;
  },
  updateBook: async (id, book) => {
    const { data } = await axios.put(`${BASE_URL}/${id}`, book);
    return data;
  },
  deleteBook: async (id) => {
    const { data } = await axios.delete(`${BASE_URL}/${id}`);
    return data;
  },
};
