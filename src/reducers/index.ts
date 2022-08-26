import { Action, ActionType } from '../actions/actionTypes';

export interface Tournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
}

interface State {
  tournaments: Tournament[];
  loading: boolean;
  error: string | null;
}

const initialState = {
  loading: true,
  tournaments: [],
  error: null,
};

const tournamentsReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionType.GET_TOURNAMENTS_PENDING:
      return {
        loading: true,
        tournaments: [],
        error: null,
      };
    case ActionType.GET_TOURNAMENTS_SUCCESS:
      return {
        loading: false,
        tournaments: action.payload,
        error: null,
      };
    case ActionType.GET_TOURNAMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
        tournaments: [],
      };
    default:
      return state;
  }
};

export default tournamentsReducer;
