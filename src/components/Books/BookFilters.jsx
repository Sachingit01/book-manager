import React from 'react';
import { Search, Filter } from 'lucide-react';

export const BookFilters = ({ filters, onFiltersChange, genres }) => {
  const handleSearchChange = (search) => {
    onFiltersChange({ ...filters, search });
  };

  const handleGenreChange = (genre) => {
    onFiltersChange({ ...filters, genre });
  };

  const handleStatusChange = (status) => {
    onFiltersChange({ ...filters, status });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search by title or author
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="search"
              type="text"
              placeholder="Search books..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Genre Filter */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            id="genre"
            value={filters.genre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>
        </div>
      </div>
    </div>
  );
};
