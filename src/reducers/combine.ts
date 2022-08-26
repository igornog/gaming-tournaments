import { combineReducers } from 'redux';
import tournamentsReducer from './index';

const reducers = combineReducers({
  tournaments: tournamentsReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
