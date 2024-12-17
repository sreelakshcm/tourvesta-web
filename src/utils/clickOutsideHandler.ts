import React from 'react';

export const setupClickOutsideListener = (
  refs: React.RefObject<HTMLElement>[],
  closeHandlers: (() => void)[],
): (() => void) => {
  const handleClickOutside = (event: MouseEvent): void => {
    refs.forEach((ref, index) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeHandlers[index]?.();
      }
    });
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
};
