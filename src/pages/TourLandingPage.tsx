import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks';

import Loader from '@components/UI/Loader';
import NoResults from '@components/common/Illustrations/NoResults';

import TourCard from '@features/tours/components/TourCard';
import TourMoodSection from '@features/tours/components/TourMoodSection';
import TourResultsHeader from '@features/tours/components/TourResultsHeader';
import TourDiscoveryBanner from '@features/tours/components/TourDiscoveryBanner';
import TourExploreCTA from '@features/tours/components/TourExploreCTA';

import { useGetAllToursQuery } from '@features/tours/tourApi';
import { setTours } from '@features/tours/tourSlice';

import {
  getSearchQuery,
  setIsSearch,
  setSearchQuery,
} from '@features/UI/navbarSlice';

import { setAlertError, setError } from '@features/UI/themeToggleSlice';

import { ApiErrorResponse } from 'types/api';
import TourHero from '@features/tours/components/TourHero ';

const TourLandingPage: React.FC = () => {
  const tours = useAppSelector((state) => state.tours.tours);
  const searchQuery = useAppSelector(getSearchQuery);

  const {
    isError, isLoading, isFetching, data, error, 
  } = useGetAllToursQuery(
    '',
    {
      refetchOnReconnect: true,
    },
  );

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

  /* ============================================================
     FILTER TOGGLE
  ============================================================ */

  const toggleFilters = (): void => {
    setIsFilterOpen((previous) => !previous);
  };

  /* ============================================================
     LOAD TOURS
  ============================================================ */

  useEffect(() => {
    dispatch(setTours(data || []));
  }, [dispatch, data]);

  /* ============================================================
     API ERROR
  ============================================================ */

  useEffect(() => {
    const fetchError = error as ApiErrorResponse;

    if (fetchError?.status !== 403 && isError) {
      dispatch(
        setError({
          errorMessage: fetchError?.data?.message || null,
          isError,
          status: +fetchError?.status || 200,
        }),
      );

      dispatch(
        setAlertError({
          errorMessage: fetchError?.data?.message || null,
          isError,
        }),
      );
    }
  }, [dispatch, error, isError]);

  /* ============================================================
     APPLY FILTERS
  ============================================================ */

  const applyFilters = (): void => {
    let filtered = tours.length ? [...tours] : [...(data || [])];

    if (filters.difficulty) {
      filtered = filtered.filter(
        (tour) => tour.difficulty === filters.difficulty,
      );
    }

    if (filters.priceRange !== null) {
      filtered = filtered.filter(
        (tour) =>
          filters.priceRange !== null &&
          tour.price >= filters.priceRange[0] &&
          tour.price <= filters.priceRange[1],
      );
    }

    setFilteredTours(filtered);
    setIsFilterOpen(false);
  };

  /* ============================================================
     SEARCH
  ============================================================ */

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

    setFilters({
      difficulty: '',
      priceRange: null,
    });
  }, [searchQuery, tours]);

  /* ============================================================
     FILTER CHANGE
  ============================================================ */

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ): void => {
    const { name, value } = e.target;

    setFilters((previous) => {
      if (name === 'difficulty') {
        return {
          ...previous,
          difficulty: value,
        };
      }

      if (name === 'price') {
        return {
          ...previous,
          priceRange: value ? value.split(',').map(Number) : null,
        };
      }

      return previous;
    });
  };

  /* ============================================================
     RESET FILTERS
  ============================================================ */

  const resetFilters = (): void => {
    setFilteredTours([...tours]);

    setFilters({
      difficulty: '',
      priceRange: null,
    });

    setIsFilterOpen(false);
  };

  /* ============================================================
     SEARCH MODE
  ============================================================ */

  useEffect(() => {
    dispatch(setIsSearch('tours'));
  }, [dispatch]);

  /* ============================================================
     DERIVED STATE
  ============================================================ */

  const hasTours = tours.length > 0;
  const hasSearch = Boolean(searchQuery);
  const resultCount = filteredTours.length;

  /* ============================================================
     LOADING
  ============================================================ */

  if (isLoading || isFetching) {
    return <Loader />;
  }

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <main className="min-h-screen bg-backgroundLight text-fontLight transition-colors duration-300 dark:bg-backgroundDark dark:text-fontDark">
      <TourHero tourCount={tours.length} />

      <TourMoodSection />

      <section
        id="tours"
        className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24"
      >
        {hasTours && (
          <TourResultsHeader
            resultCount={resultCount}
            filters={filters}
            isFilterOpen={isFilterOpen}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            toggleFilters={toggleFilters}
            handleFilterChange={handleFilterChange}
          />
        )}

        {/* Search result information */}
        {hasSearch && (
          <div className="mb-7 flex items-center justify-between rounded-2xl border border-primary/15 bg-primary-extraLight px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="6" strokeWidth="2" />

                  <path strokeLinecap="round" strokeWidth="2" d="M16 16l4 4" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Search results
                </p>

                <p className="mt-0.5 text-sm font-semibold">
                  {resultCount} result
                  {resultCount === 1 ? '' : 's'} found for "{searchQuery}"
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => dispatch(setSearchQuery(''))}
              className="rounded-lg px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-white/60 dark:hover:bg-white/10"
            >
              Clear
            </button>
          </div>
        )}

        {/* Results */}
        {hasSearch && filteredTours.length === 0 ? (
          <div className="rounded-[2rem] border border-gray-200 bg-white py-16 dark:border-white/10 dark:bg-white/[0.03]">
            <NoResults />
          </div>
        ) : (
          <TourCard tours={filteredTours} />
        )}
      </section>

      {!hasSearch && <TourDiscoveryBanner />}

      {!hasSearch && <TourExploreCTA />}
    </main>
  );
};

export default TourLandingPage;
