import { RootState } from '@app/store';
import { Tour } from 'types/tourTypes';

export const getAllTourData = ((state: RootState): Tour[] => state.tours.tours);
export const getTourDataById = ((state: RootState, id: string): Tour =>
  state.tours.tours.find((tour) => tour?._id === id)|| {} as Tour);
