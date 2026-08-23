import { FC } from 'react';
import abstractBackground from '@assets/svg/abstract-bg.svg';

const RenderAbstractBg: FC = () => {
  return (
    <div className="absolute z-0 h-full w-full overflow-hidden">
      <img
        src={abstractBackground}
        alt="background"
        className="h-full w-full object-cover opacity-20"
      />
    </div>
  );
};

export default RenderAbstractBg;
