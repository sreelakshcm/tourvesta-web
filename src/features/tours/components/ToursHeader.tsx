import { FC } from 'react';

const ToursHeader: FC = () => {
  return (
    <header className="p-6 text-center">
      <h1 className="text-4xl font-bold text-primary">
        Explore Our Exciting Tours
      </h1>
      <p className="mt-4 text-xl dark:text-mutedDark">
        Discover the most stunning destinations across the world
      </p>
    </header>
  );
};

export default ToursHeader;
