import styled from 'styled-components';
import theme from '../theme';

const Container = styled.div`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;

  .loading-text,
  .error-text,
  .no-tournament-text {
    text-align: center;
    margin-top: ${theme.spacing(12)};
  }
`;

export default Container;
