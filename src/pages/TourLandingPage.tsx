import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import Loader from '@components/UI/Loader';
import TourCard from '@features/tours/components/TourCard';
import { useGetAllToursQuery } from '@services/tourApi';
import { setTours } from '@slices/tourSlice';
import {
  getSearchQuery,
  setIsSearch,
  setSearchQuery,
} from '@slices/navbarSlice';
import {
  setAlertError,
  setError,
} from '@slices/themeToggleSlice';
import NoResults from '@components/common/Illustrations/NoResults';
import UnauthorizedPage from '@components/common/Illustrations/UnAuthorizedPage';
import { ApiErrorResponse } from 'types/api';
import TourFilters from '@features/tours/components/TourFilters';
import ToursHeader from '@features/tours/components/ToursHeader';
import { getErrors } from '@actions/themeToggleAction';

const TourLandingPage: React.FC = () => {
  const tours = useAppSelector((state) => state.tours.tours);
  const globalError = useAppSelector(getErrors);
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

  const toggleFilters = (): void => setIsFilterOpen(!isFilterOpen);

  useEffect(() => {
    if (data) dispatch(setTours(data));
    else dispatch(setTours([]));
  }, [dispatch, data]);

  useEffect(() => {
    const fetchError = error as ApiErrorResponse;

    if (fetchError?.status !== 403) {
      if (isError) {
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
    }
  }, [dispatch, error, isError]);

  // Apply search and filters only when apply button is clicked
  const applyFilters = (): void => {
    let filtered = tours.length ? [...tours] : [...(data || [])];

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

  useEffect(() => {
    dispatch(setSearchQuery(''));
  }, [dispatch, isFilterOpen]);

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

  if (isLoading || isFetching) return <Loader />;

  return (
    <>
      {tours?.length !== 0 && (
        <>
          <ToursHeader />
          <TourFilters
            applyFilters={applyFilters}
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterOpen={isFilterOpen}
            resetFilters={resetFilters}
            toggleFilters={toggleFilters}
          />
        </>
      )}

      {searchQuery && filteredTours.length === 0 ? (
        <NoResults />
      ) : (
        <TourCard tours={filteredTours} />
      )}
      {globalError.isError &&
        (globalError.errorStatus === 401 ||
          globalError.errorStatus === 500) && <UnauthorizedPage />}
    </>
  );
};

export default TourLandingPage;
