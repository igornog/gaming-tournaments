import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType, Action } from './actionTypes';
import { API_TOURNAMENTS_URL } from '../constants/api';

// @ts-check
const { faker } = require('@faker-js/faker');
const random = require('lodash.random');
const upperFirst = require('lodash.upperfirst');

const games = [
  'Counter-Strike: Global Offensive',
  'Dota 2',
  'Rocket League',
  'Battalion 1944',
  'League of Legends',
];

export const getTournamentsRequest = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_TOURNAMENTS_PENDING,
    });
    try {
      const { data } = await axios.get(API_TOURNAMENTS_URL);
      dispatch({
        type: ActionType.GET_TOURNAMENTS_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.GET_TOURNAMENTS_FAIL,
        payload: err.message,
      });
    }
  };
};

const body = (name: string | null) => {
  return {
    id: faker.datatype.uuid(),
    name:
      name ||
      faker.lorem.words(random(2, 4)).split(' ').map(upperFirst).join(' '),
    organizer: faker.lorem
      .words(random(1, 2))
      .split(' ')
      .map(upperFirst)
      .join(' '),
    game: games[random(0, games.length - 1)],
    participants: {
      current: random(0, 256),
      max: 256,
    },
    startDate: new Date().toISOString(),
  };
};

export const postTournamentRequest = (name: string | null) => {
  axios.post(API_TOURNAMENTS_URL, body(name));
};

export const deleteTournamentRequest = (id: string) => {
  axios.delete(API_TOURNAMENTS_URL + `/${id}`);
};

export const editTournamentRequest = (id: string, name: string | null) => {
  axios.put(API_TOURNAMENTS_URL + `/${id}`, body(name));
};
