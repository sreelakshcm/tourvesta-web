
import React from 'react';
import TourFilters from './TourFilters';

interface TourResultsHeaderProps {
  resultCount: number;
  filters: {
    difficulty: string;
    priceRange: null | number[];
  };
  isFilterOpen: boolean;
  applyFilters: () => void;
  resetFilters: () => void;
  toggleFilters: () => void;
  handleFilterChange: (_e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => void;
}

const TourResultsHeader: React.FC<TourResultsHeaderProps> = ({
  resultCount,
  filters,
  isFilterOpen,
  applyFilters,
  resetFilters,
  toggleFilters,
  handleFilterChange,
}) => {
  const hasActiveFilters =
    Boolean(filters.difficulty) || filters.priceRange !== null;

  return (
    <div className="mb-8 border-b border-gray-200 pb-6 dark:border-white/10">
      <div className="flex items-start justify-between gap-8">

        {/* LEFT */}
        <div className="min-w-0">

          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Curated experiences
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Popular journeys
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-mutedDark">
            Handpicked experiences for travelers looking for their
            next great escape.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0 flex-col items-end gap-2">

          {/* FIRST ROW — FILTER BUTTONS */}
          <div className="flex items-center gap-2">

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary dark:text-mutedDark dark:hover:bg-white/5"
              >
                Clear filters
              </button>
            )}

            <TourFilters
              applyFilters={applyFilters}
              filters={filters}
              handleFilterChange={handleFilterChange}
              isFilterOpen={isFilterOpen}
              resetFilters={resetFilters}
              toggleFilters={toggleFilters}
            />
          </div>

          {/* SECOND ROW — COUNT */}
          <div className="text-sm text-gray-500 dark:text-mutedDark">
            Showing{' '}
            <span className="font-extrabold text-fontLight dark:text-fontDark">
              {resultCount}
            </span>{' '}
            {resultCount === 1
              ? 'experience'
              : 'experiences'}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourResultsHeader;
