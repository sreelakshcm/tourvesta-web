import { FC, useState } from 'react';
import { Moon02Icon, Sun02Icon } from 'hugeicons-react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectTheme } from '@actions/themeToggleAction';
import { toggleTheme } from '@slices/themeToggleSlice';

const ThemeToggle: FC = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
    dispatch(toggleTheme());
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="rounded-full p-2 text-gray-600 dark:text-gray-300"
    >
      {isDarkMode ? (
        <Moon02Icon size={24} color={'#ffffff'} />
      ) : (
        <Sun02Icon size={24} color={'#000000'} />
      )}
    </button>
  );
};

export default ThemeToggle;
