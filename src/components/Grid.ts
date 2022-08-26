import styled from 'styled-components';
import theme from '../theme';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin: ${theme.spacing(3)} -${theme.spacing(3)};
  justify-content: flex-start;

  .loading-text {
    text-align: center;
  }
`;

export default Grid;
