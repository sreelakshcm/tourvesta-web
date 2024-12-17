import { useAppSelector } from '@app/hooks';
import ButtonComponent from '@components/UI/Button';
import { selectTheme } from '@features/UI/themeToggleSlice';
import { FC } from 'react';

interface NoDataProps {
  label?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const NoData: FC<NoDataProps> = ({
  buttonText = 'Add Review',
  onButtonClick,
  label,
}) => {
  const theme = useAppSelector(selectTheme);

  return (
    <div className="flex h-5/6 w-full items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="z-10 space-y-6 md:space-y-8">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={`/src/assets/svg/no-data-${theme}.svg`}
            alt="No Data Illustration"
            className="h-40 w-40 sm:h-60 sm:w-60 md:h-80 md:w-80"
          />
        </div>

        {/* Main Message */}
        <p className="text-center text-xl font-bold text-gray-700
 dark:text-gray-300 sm:text-2xl md:text-4xl">
          {label? `Oops! No ${label} Found!`: 'Oops! Nothing here.'}
        </p>
        <p className="text-center text-sm font-medium text-gray-600
 dark:text-gray-400 sm:text-base md:text-lg">
          It looks like there's nothing to display here right now. Please check back later.
        </p>

        {/* Optional Button */}
        {buttonText && onButtonClick && (
          <div className="flex justify-center">
            <ButtonComponent
              onClick={onButtonClick}
              type="submit"
              className="mt-4 rounded-lg bg-primary px-6 py-2 text-sm font-semibold
              text-white shadow-md hover:bg-primary-hover focus:outline-none sm:text-base"
              variant="filled"
            >
              {buttonText}
            </ButtonComponent>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoData;
