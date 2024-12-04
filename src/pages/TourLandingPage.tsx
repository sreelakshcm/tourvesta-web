import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import Loader from '@components/UI/Loader';
import TourCard from '@features/tours/components/TourCard';
import { useGetAllToursQuery } from '@features/tours/tourApi';
import { setTours } from '@features/tours/tourSlice';
import {
  getSearchQuery,
  setIsSearch,
  setSearchQuery,
} from '@features/UI/navbarSlice';
import { setError } from '@features/UI/themeToggleSlice';
import { FilterIcon, FilterRemoveIcon } from 'hugeicons-react';
import NoResults from './NoResults';

const TourLandingPage: React.FC = () => {
  const tours = useAppSelector((state) => state.tours.tours);
  const searchQuery = useAppSelector(getSearchQuery);
  const { isError, isLoading, data, error } = useGetAllToursQuery('', {
    refetchOnReconnect: true,
  });
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<{
    difficulty: string;
    priceRange: null | number[];
  }>({
    difficulty: '',
    priceRange: null,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredTours, setFilteredTours] = useState(tours);

  const toggleFilters = (): void => setIsFilterOpen(!isFilterOpen);

  useEffect(() => {
    if (data) dispatch(setTours(data));
  }, [dispatch, data]);

  useEffect(() => {
    if (isError) {
      dispatch(
        setError({
          errorMessage: 'Failed to fetch Tours',
          isError,
        }),
      );
    }
  }, [dispatch, error, isError]);

  // Apply search and filters only when apply button is clicked
  const applyFilters = (): void => {
    let filtered = [...tours];

    // Filter by difficulty
    if (filters.difficulty) {
      filtered = filtered.filter(
        (tour) => tour.difficulty === filters.difficulty,
      );
    }

    // Filter by price range
    if (filters.priceRange !== null) {
      filtered = filtered.filter(
        (tour) =>
          filters.priceRange !== null &&
          tour.price >= filters.priceRange[0] &&
          tour.price <= filters.priceRange[1],
      );
    }

    // Apply search query after filtering
    if (searchQuery) {
      filtered = filtered.filter(
        (tour) =>
          tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTours(filtered);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    if (searchQuery) {
      setFilteredTours(
        tours.filter(
          (tour) =>
            tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.summary.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredTours([...tours]);
    }
    setFilters({ difficulty: '', priceRange: null });
  }, [searchQuery, tours]);

  // Reset search query when the component mounts or on any changes
  useEffect(() => {
    dispatch(setSearchQuery(''));
  }, [dispatch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ): void => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      if (name === 'difficulty') {
        return { ...prevFilters, difficulty: value };
      }
      if (name === 'price') {
        const priceRange = value ? value.split(',').map(Number) : null;
        return { ...prevFilters, priceRange };
      }
      return prevFilters;
    });
  };

  const resetFilters = (): void => {
    setFilteredTours([...tours]);
    setFilters({ difficulty: '', priceRange: null });
    setIsFilterOpen(false);
  };

  useEffect(() => {
    dispatch(setIsSearch('tours'));
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <>
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold text-primary">
          Explore Our Exciting Tours
        </h1>
        <p className="mt-4 text-xl dark:text-mutedDark">
          Discover the most stunning destinations across the world
        </p>
      </header>

      {/* Filter Icon */}
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
                <option value="">All Difficulty Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="difficult">Difficult</option>
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
                <option value="">All Price Ranges</option>
                <option value="100,200">$100 - $200</option>
                <option value="200,400">$200 - $400</option>
                <option value="400,600">$400 - $600</option>
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
      {searchQuery && filteredTours.length === 0 ? (
        <NoResults />
      ) : (
        <TourCard tours={filteredTours} />
      )}
    </>
  );
};

export default TourLandingPage;
