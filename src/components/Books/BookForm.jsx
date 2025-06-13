import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

export const BookForm = ({ book, onSubmit, onClose, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: book || {},
  });

  const currentYear = new Date().getFullYear();

  const InputField = ({ id, label, type = "text", required, ...rest }) => (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 block mb-1"
      >
        {label} {required && "*"}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, {
          required: required && `${label} is required`,
          ...(type === "number" && id === "publishedYear"
            ? {
                min: { value: 1000, message: "Year must be after 1000" },
                max: {
                  value: currentYear,
                  message: `Year cannot exceed ${currentYear}`,
                },
                valueAsNumber: true,
              }
            : {}),
        })}
        {...rest}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[id] && (
        <p className="text-sm text-red-500 mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );

  const SelectField = ({ id, label, options, required }) => (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 block mb-1"
      >
        {label} {required && "*"}
      </label>
      <select
        id={id}
        {...register(id, { required: required && `${label} is required` })}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[id] && (
        <p className="text-sm text-red-500 mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-auto ">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-200 md:mt-0 mt-60">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 ">
          <h2 className="text-2xl font-semibold text-gray-900">
            {book ? "Edit Book" : "Add New Book"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField id="title" label="Title" required />
            <InputField id="author" label="Author" required />
            <SelectField
              id="genre"
              label="Genre"
              required
              options={[
                "Fiction",
                "Non-Fiction",
                "Science Fiction",
                "Fantasy",
                "Romance",
                "Mystery",
                "Thriller",
                "Biography",
                "History",
                "Self-Help",
              ]}
            />
            <InputField
              id="publishedYear"
              label="Published Year"
              type="number"
              required
            />
            <SelectField
              id="status"
              label="Status"
              required
              options={["Available", "Issued"]}
            />
            <InputField id="isbn" label="ISBN" />
          </div>

          {/* Description (full width) */}
          <div className="mt-6">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              {...register("description")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the book"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : book ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
