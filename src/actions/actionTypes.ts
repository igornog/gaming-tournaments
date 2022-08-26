import { Tournament } from '../reducers';

export enum ActionType {
  GET_TOURNAMENTS_PENDING = 'GET_TOURNAMENTS_PENDING',
  GET_TOURNAMENTS_SUCCESS = 'GET_TOURNAMENTS_SUCCESS',
  GET_TOURNAMENTS_FAIL = 'GET_TOURNAMENTS_FAIL',
}

interface actionPending {
  type: ActionType.GET_TOURNAMENTS_PENDING;
}

interface actionSuccess {
  type: ActionType.GET_TOURNAMENTS_SUCCESS;
  payload: Tournament[];
}

interface actionFail {
  type: ActionType.GET_TOURNAMENTS_FAIL;
  payload: string;
}

export type Action = actionPending | actionSuccess | actionFail;
