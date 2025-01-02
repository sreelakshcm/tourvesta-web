import { useAppSelector } from '@app/hooks';
import { AUTH } from '@constants/services';
import { getErrors } from '@actions/themeToggleAction';
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const globalError = useAppSelector(getErrors);

  return (
    <div className="flex min-h-[calc(100vh-94px)] w-full flex-col items-center justify-center 
      overflow-hidden px-4 text-center text-fontLight dark:bg-backgroundDark">
      <div className="z-10 space-y-6 sm:space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="/src/assets/svg/invalid.svg"
            alt="Session Expired"
            className="h-40 w-40 sm:h-60 sm:w-60"
          />
        </div>

        {/* Main Message */}
        <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 sm:text-4xl">
          {globalError.errorMessage}
        </p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 sm:text-lg">
          Your session has expired or you are unauthorized to access this page.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col space-y-4 sm:flex-row 
sm:justify-center sm:space-x-6 sm:space-y-0">
          <Link
            to={AUTH}
            className="rounded-lg bg-primary px-6 py-2 text-base font-semibold text-white shadow-lg 
              transition-all duration-300 hover:scale-105 hover:bg-teal-700 focus:ring-2 
              focus:ring-teal-500 sm:px-8 sm:py-3 sm:text-lg"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
