import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { routes } from './routes';
import '@styles/loader.css';
import Loader from '@components/UI/Loader';
import { useAppSelector } from '@app/hooks';
import {
  getAlertErrors,
  getErrors,
  getSuccess,
} from '@features/UI/themeToggleSlice';
import Alert from '@components/UI/Alert';
import UnauthorizedPage from '@components/common/Illustrations/UnAuthorizedPage';
import { getToken } from '@features/auth/authSlice';

const AppContent = (): JSX.Element => {
  const { isSuccess, successMessage } = useAppSelector(getSuccess);
  const { isError, errorMessage } = useAppSelector(getAlertErrors);
  const globalError = useAppSelector(getErrors);
  const token = useAppSelector(getToken);
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/auth';
  const isPublicTourPage = pathname === '/tours';
  const requiresAuthentication = !isLoginPage && !isPublicTourPage;
  const isUnauthorized =
    (!token && requiresAuthentication) ||
    (globalError.isError && globalError.errorStatus === 401 && !isLoginPage);

  return (
    <>
      {isSuccess && <Alert message={successMessage || ''} type="success" />}
      {isError && errorMessage && <Alert message={errorMessage} type="error" />}
      <Suspense fallback={<Loader />}>
        {isUnauthorized ? (
          <UnauthorizedPage />
        ) : (
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children?.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    index={!!childRoute.index}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ))}
          </Routes>
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
