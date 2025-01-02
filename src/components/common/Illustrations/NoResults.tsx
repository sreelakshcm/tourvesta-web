import { useAppSelector } from '@app/hooks';
import { selectTheme } from '@actions/themeToggleAction';
import { FC } from 'react';

const NoResults: FC = () => {
  const theme = useAppSelector(selectTheme);

  return (
    <div
      className="relative z-0 flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div className="z-10 space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={`/src/assets/svg/no-results-${theme}.svg`}
            alt="Page Not Found"
            className="h-96 w-96"
          />
        </div>

        {/* Main Message */}
        <p className="text-center text-4xl font-bold text-gray-700 dark:text-gray-300">
          No Results!
        </p>
        <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-400">
        We couldn't find anything matching your search. Try adjusting your filters or search terms!
        </p>

        {/* Navigation Options */}
        <div className="justify-center space-y-4 md:flex md:space-x-6 md:space-y-0"></div>
      </div>
    </div>
  );
};

export default NoResults;
