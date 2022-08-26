import React from 'react';
import styled from 'styled-components';
import {
  deleteTournamentRequest,
  editTournamentRequest,
} from '../actions/tournaments';
import theme from '../theme';
import Button from './Button';

interface PropsInterface {
  tournament: {
    id: string;
    name: string;
    organizer: string;
    game: string;
    participants: {
      current: number;
      max: number;
    };
    startDate: any;
  };
  reload: any;
}

const Card = styled.div`
  background-color: #1f1f1f;
  padding: 1rem;
  margin: ${theme.spacing(3)};
  border-radius: 4px;
  width: calc(320px - 3rem);

  button {
    margin: ${theme.spacing(4)} ${theme.spacing(2)} 0 0;
    text-transform: uppercase;
  }
`;

const TextTitle = styled.h6`
  ${theme.typography.h6};
  margin: 0 0 ${theme.spacing(4)};
`;

const Text = styled.p`
  margin: 0;
`;

const editTournament = (
  e: any,
  id: string,
  newName: string,
  reloadTournaments: any
) => {
  e.preventDefault();
  editTournamentRequest(
    id,
    window.prompt(`New Tournament Name: `, `${newName}`)
  );
  reloadTournaments();
};

const deleteTournament = (e: any, id: string, reloadTournaments: any) => {
  if (window.confirm('Do you really want to delete this tournament?')) {
    deleteTournamentRequest(id);
    reloadTournaments();
  }
};

const TournamentCard: React.FC<PropsInterface> = ({
  tournament,
  reload,
}: PropsInterface) => {
  return (
    <Card className={`${tournament.id}`}>
      <TextTitle>{tournament.name}</TextTitle>
      <Text>Organizer: {tournament.organizer}</Text>
      <Text>Game: {tournament.game}</Text>
      <Text>
        Participants:{' '}
        <span>
          {tournament.participants.current}/{tournament.participants.max}
        </span>
      </Text>
      <Text>
        Start:{' '}
        {`${new Date(tournament.startDate).toLocaleDateString('en-GB')} ${
          tournament.startDate.split('T')[1].split('.')[0]
        }`}
      </Text>
      <Button
        onClick={(e) =>
          editTournament(e, tournament.id, tournament.name, reload)
        }
      >
        edit
      </Button>
      <Button onClick={(e) => deleteTournament(e, tournament.id, reload)}>
        delete
      </Button>
    </Card>
  );
};

export default TournamentCard;
