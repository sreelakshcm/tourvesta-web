import { useAppDispatch, useAppSelector } from '@app/hooks';
import { AUTH } from '@constants/services';
import { clearErrorState, getErrors } from '@features/UI/themeToggleSlice';
import React from 'react';
import { Link } from 'react-router-dom';
import invalidIllustration from '@assets/svg/invalid.svg';

const UnauthorizedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const globalError = useAppSelector(getErrors);

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center overflow-hidden
        bg-backgroundLight px-4 py-8 text-center text-fontLight dark:bg-backgroundDark sm:px-6"
    >
      <div className="z-10 w-full max-w-2xl space-y-6 sm:space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={invalidIllustration}
            alt="Session Expired"
            className="h-40 w-40 sm:h-52 sm:w-52"
          />
        </div>

        {/* Main Message */}
        <p className="text-2xl font-bold text-gray-700 sm:text-4xl dark:text-gray-300">
          {globalError.errorMessage || 'You are not logged in. Please log in.'}
        </p>
        <p className="text-base font-medium text-gray-600 sm:text-lg dark:text-gray-400">
          Your session has expired or you are unauthorized to access this page.
        </p>

        {/* Navigation Options */}
        <div className="justify-center space-y-4 md:flex md:space-x-6 md:space-y-0">
          <Link
            to={AUTH}
            onClick={() => dispatch(clearErrorState())}
            className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg 
        transition-all duration-300 hover:scale-105 hover:bg-teal-700 focus:ring-2 
        focus:ring-teal-500"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
