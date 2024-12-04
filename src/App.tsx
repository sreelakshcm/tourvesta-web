import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import '@styles/loader.css';
import Loader from '@components/UI/Loader';

function App(): JSX.Element {
  return (
    <Router>
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
