import { RootState } from '../reducers/combine';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
