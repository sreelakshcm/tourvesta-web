import { FC } from 'react';
import '@styles/loader.css';

const Loader: FC = () => {

  return (
    <div className='fixed left-[50%] top-[50%] z-10'>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
