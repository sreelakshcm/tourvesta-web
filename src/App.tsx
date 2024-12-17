import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import '@styles/loader.css';
import Loader from '@components/UI/Loader';
import { useAppSelector } from '@app/hooks';
import { getAlertErrors, getSuccess } from '@features/UI/themeToggleSlice';
import Alert from '@components/UI/Alert';

function App(): JSX.Element {
  const { isSuccess, successMessage } = useAppSelector(getSuccess);
  const { isError, errorMessage } = useAppSelector(getAlertErrors);

  return (
    <Router>
      {isSuccess && <Alert message={successMessage || ''} type="success" />}
      {isError && errorMessage && <Alert message={errorMessage} type="error" />}
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
