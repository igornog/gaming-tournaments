import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { useTypedSelector } from './selectors/tournaments';
import {
  getTournamentsRequest,
  postTournamentRequest,
} from './actions/tournaments';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/Container';
import SearchBar from './components/SearchBar';
import Input from './components/Input';
import Button from './components/Button';
import Grid from './components/Grid';
import H4 from './components/H4';
import { Action } from './actions/actionTypes';
import Card from './components/Card';
import { Tournament } from './reducers';

const App = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>('');
  const { tournaments, loading, error } = useTypedSelector(
    (state) => state.tournaments
  );

  useEffect(() => {
    const loadTournaments = async () => {
      dispatch(getTournamentsRequest() as unknown as Action);
    };

    loadTournaments();
  }, [dispatch]);

  const reloadTournaments = () => {
    dispatch(getTournamentsRequest() as unknown as Action);
  };

  const createTournament = (e: any) => {
    postTournamentRequest(window.prompt(`Tournament Name: `));
    reloadTournaments();
  };

  const searchTournament = (e: any) => {
    setSearchText(e.currentTarget.value);
  };

  return (
    <>
      <Container>
        <H4>FACEIT Tournaments</H4>
        <SearchBar>
          <Input
            placeholder="Search tournament ..."
            onChange={searchTournament}
          />
          <Button onClick={(e) => createTournament(e)}>
            Create tournament
          </Button>
        </SearchBar>
        {loading ? (
          <p className="loading-text">Loading tournaments ...</p>
        ) : error ? (
          <div className="error-text">
            <p>Something went wrong</p>
            <Button onClick={reloadTournaments}>retry</Button>
          </div>
        ) : tournaments.length ? (
          <Grid>
            {' '}
            {tournaments
              .filter(
                (t) =>
                  searchText === '' ||
                  t.name.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((tournament: Tournament) => {
                return (
                  <Card
                    reload={() => reloadTournaments()}
                    tournament={tournament}
                  />
                );
              })}
          </Grid>
        ) : (
          <div className="no-tournament-text">
            <p>No tournaments found.</p>
          </div>
        )}
      </Container>
    </>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
