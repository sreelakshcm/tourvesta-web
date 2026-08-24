import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
} from 'react-router-dom';
import { routes } from './routes';
import '@styles/loader.css';
import Loader from '@components/UI/Loader';
import { useAppSelector } from '@app/hooks';
import Alert from '@components/UI/Alert';
import UnauthorizedPage from '@components/common/Illustrations/UnAuthorizedPage';
import { getToken } from '@features/auth/authSlice';

const AppContent = (): JSX.Element => {
  const isSuccess = useAppSelector((state) => state.theme.isSuccess);
  const successMessage = useAppSelector((state) => state.theme.successMessage);
  const isError = useAppSelector((state) => state.theme.alertType === 'error');
  const errorMessage = useAppSelector((state) => state.theme.alertMessage);
  const globalError = useAppSelector((state) => state.theme);
  const token = useAppSelector(getToken);
  const { pathname } = useLocation();
  const routeElements = useRoutes(routes);
  const isPublicPage =
    pathname === '/' ||
    pathname === '/tours' ||
    pathname.startsWith('/tours/detail/') ||
    pathname === '/about' ||
    pathname === '/auth' ||
    pathname === '/forgot-password' ||
    pathname === '/network-error';
  const isUnauthorized =
    (!token && !isPublicPage) ||
    (globalError.isError && globalError.errorStatus === 401 && !isPublicPage);

  return (
    <>
      {isSuccess && <Alert message={successMessage || ''} type="success" />}
      {isError && errorMessage && <Alert message={errorMessage} type="error" />}
      <Suspense fallback={<Loader />}>
        {isUnauthorized ? (
          <UnauthorizedPage />
        ) : (
          routeElements
        )}
      </Suspense>
    </>
  );
};

function App(): JSX.Element {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
