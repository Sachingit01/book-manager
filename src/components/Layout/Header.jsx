import React from "react";
import { BookOpen, Plus } from "lucide-react";

export const Header = ({ onAddBook }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shadow-md">
              <BookOpen className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">BookManager</h1>
              <p className="text-sm text-gray-600">Dashboard</p>
            </div>
          </div>

          <button
            onClick={onAddBook}
            className="inline-flex items-center px-5 py-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Book
          </button>
        </div>
      </div>
    </header>
  );
};
