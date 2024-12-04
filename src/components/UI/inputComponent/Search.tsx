import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { NEUTRAL_DEFAULT } from '@constants/styles';
import { setSearchQuery } from '@features/UI/navbarSlice';
import { selectTheme } from '@features/UI/themeToggleSlice';
import { Cancel01Icon, Search02Icon } from 'hugeicons-react';

type SearchBarProps<T> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label?: string;
  data?: T[];
};

const SearchBar = <T extends { name: string }>({
  label,
  className = '',
  data = [],
  ...props
}: SearchBarProps<T>): JSX.Element => {
  const [value, setValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(value));
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler); // Cleanup the timeout on every re-render
    };
  }, [value, dispatch]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue.trim()) {
      const matches = data.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredSuggestions(matches);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setValue(suggestion); // Set the input value to the clicked suggestion
    setFilteredSuggestions([]); // Hide suggestions after selection
  };

  return (
    <div className="flex w-full">
      {label && <label className="mb-2 text-sm font-medium">{label}</label>}
      <div className="relative w-full">
        <input
          className={`w-full rounded-full border border-neutral-neutral bg-backgroundLight 
  px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary-focus
 dark:border-slate-400 md:placeholder:text-[10px] ${className}`}
          onChange={handleInputChange}
          value={value}
          {...props}
        />

        {value && filteredSuggestions.length > 0 && (
          <ul
            className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg 
    border bg-white shadow-md dark:border-slate-400 dark:bg-neutral-dark"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion.name)}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-white"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}

        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer 
  text-primary hover:text-primary-hover"
          onClick={value ? () => setValue('') : undefined}
        >
          {value ? (
            <Cancel01Icon
              size={18}
              color={theme === 'light' ? '#000000' : NEUTRAL_DEFAULT}
            />
          ) : (
            <Search02Icon
              size={18}
              color={theme === 'light' ? '#000000' : NEUTRAL_DEFAULT}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
