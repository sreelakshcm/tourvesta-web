import { FC } from 'react';

const RenderAbstractBg: FC = () => {
  return (
    <div className="absolute z-0 h-full w-full overflow-hidden">
      <img
        src="/src/assets/svg/abstract-bg.svg"
        alt="background"
        className="h-full w-full object-cover opacity-20"
      />
    </div>
  );
};

export default RenderAbstractBg;
