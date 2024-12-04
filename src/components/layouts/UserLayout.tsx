import { FC } from 'react';
import Navbar from './Navbar';
import { useAppSelector } from '@app/hooks';
import { getIsLoading } from '@features/UI/themeToggleSlice';
import Loader from '@components/UI/Loader';
import { Outlet } from 'react-router-dom';

const UserLayout: FC = () => {
  const loading = useAppSelector(getIsLoading);

  return (
    <div className="flex min-h-screen flex-col bg-backgroundLight p-4 text-fontLight
 dark:bg-backgroundDark dark:text-fontDark">
      <Navbar />
      <main className={'mt-20 h-full flex-grow'}>
        {loading
          ? <Loader />
          : <div className={`${loading ? 'blur' : ''}`}>
            <Outlet />
          </div>}
      </main>
    </div>
  );
};

export default UserLayout;
