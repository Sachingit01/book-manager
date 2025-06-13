import React from "react";
import { Edit, Trash2, Calendar, User, Tag } from "lucide-react";
import { StatusBadge } from "../Common/StatusBadge";

export const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center">
            <User className="w-4 h-4 mr-1" />
            {book.author}
          </p>
        </div>
        <StatusBadge status={book.status} />
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            Genre:
          </span>
          <span className="text-gray-900 font-medium">{book.genre}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Year:
          </span>
          <span className="text-gray-900 font-medium">
            {book.publishedYear}
          </span>
        </div>
      </div>

      {book.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {book.description}
        </p>
      )}

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(book)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};
