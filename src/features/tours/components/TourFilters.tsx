import { FilterIcon, FilterRemoveIcon } from 'hugeicons-react';
import React, { FC, useEffect, useRef } from 'react';

interface TourFilterProps {
  resetFilters: () => void;
  filters: {
    difficulty: string;
    priceRange: null | number[];
  };
  toggleFilters: () => void;
  handleFilterChange: (
    // eslint-disable-next-line no-unused-vars
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => void;
  isFilterOpen: boolean;
  applyFilters: () => void;
}

const TourFilters: FC<TourFilterProps> = ({
  filters,
  handleFilterChange,
  resetFilters,
  toggleFilters,
  isFilterOpen,
  applyFilters,
}) => {
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        toggleFilters(); // Close the filter dropdown when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleFilters]);

  const difficultyOptions = [
    { label: 'All Difficulty Levels', value: '' },
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Difficult', value: 'difficult' },
  ];

  const priceRangeOptions = [
    { label: 'All Price Ranges', value: '' },
    { label: '$100 - $200', value: '100,200' },
    { label: '$200 - $400', value: '200,400' },
    { label: '$400 - $600', value: '400,600' },
    { label: '$600 - $800', value: '600,800' },
    { label: '$800 - $1000', value: '800,1000' },
  ];

  return (
    <>
      <div className="mb-4 flex justify-end gap-3">
        {(filters.difficulty || filters.priceRange) && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 rounded-lg bg-secondary p-2 text-white 
shadow-md hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-secondary 
focus:ring-opacity-50"
          >
            <FilterRemoveIcon className="h-6 w-6" />
          </button>
        )}
        <button
          onClick={toggleFilters}
          className="inline-flex items-center gap-2 rounded-lg bg-primary p-2 text-white shadow-md
hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          <FilterIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Dropdown for Filters */}
      {isFilterOpen && (
        <div
          ref={filterRef}
          className="absolute right-4  z-10 w-72 rounded-lg bg-white shadow-md
dark:bg-neutral-layout"
        >
          <div className="p-4">
            {/* Difficulty Filter */}
            <div className="mb-4">
              <label
                htmlFor="difficulty"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Difficulty
              </label>
              <select
                name="difficulty"
                id="difficulty"
                value={filters.difficulty}
                onChange={handleFilterChange}
                className="w-full rounded-lg border-gray-300 p-2 text-gray-800 shadow-sm
focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-zinc-900 dark:text-gray-200"
              >
                {difficultyOptions.map((difficulty) => (
                  <option value={difficulty.value}>{difficulty.label}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Price Range
              </label>
              <select
                name="price"
                id="price"
                value={filters.priceRange?.join(',') || ''}
                onChange={handleFilterChange}
                className="w-full rounded-lg border-gray-300 p-2 text-gray-800 shadow-sm
focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-zinc-900 dark:text-gray-200"
              >
                {priceRangeOptions.map((price) => (
                  <option value={price.value}>{price.label}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={resetFilters}
                className="rounded-lg bg-secondary px-4 py-2 text-white shadow 
hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="rounded-lg bg-primary px-4 py-2 text-white shadow
hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TourFilters;
