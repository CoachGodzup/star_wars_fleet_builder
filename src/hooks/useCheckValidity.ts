import { RootState } from '../store/rootStore';
import { useSelector } from 'react-redux';

export const useCheckValidity = (page: number) => {
  const state = useSelector((state: RootState) => state.nav);

  return !(page > state.lastValidStep);
};
