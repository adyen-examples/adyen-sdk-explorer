import { Container, Paper } from '@mui/material';
import { useApi } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';

const CheckoutBuilder = ({ txvariant }: any) => {
  useApi(`http://localhost:8080/api/configurations/${txvariant}`, 'GET');

  return (
    <Container maxWidth="lg">
      <Paper elevation={0}>
        <ConfigWrapper />
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
