import { FC } from 'react';
import { useAppSelector } from '@app/hooks';
import { getIsLoading } from '@features/UI/themeToggleSlice';
import Loader from '@components/UI/Loader';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import NavigationHandler from '@components/UI/NavigationHandler';

const UserLayout: FC = () => {
  const loading = useAppSelector(getIsLoading);

  return (
    <div
      className="flex min-h-screen flex-col overflow-auto bg-backgroundLight p-4 text-fontLight
 dark:bg-backgroundDark dark:text-fontDark"
    >
      <Navbar />
      <NavigationHandler />
      <main className={'mt-16 h-full flex-grow overflow-auto'}>
        {loading ? (
          <Loader />
        ) : (
          <div
            className={`${loading ? 'blur' : ''}`}
          >
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
};

export default UserLayout;
