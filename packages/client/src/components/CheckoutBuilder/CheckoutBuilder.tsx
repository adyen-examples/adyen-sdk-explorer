import { Container, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useApi } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';

const CheckoutBuilder = () => {
  useApi('http://localhost:8080/configurations', 'GET');
  return (
    <Container maxWidth="lg">
      <Paper elevation={0}>
        <ConfigWrapper/>
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
