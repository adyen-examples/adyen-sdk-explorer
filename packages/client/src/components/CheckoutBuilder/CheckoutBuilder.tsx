import { Container, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useApi } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';

//Create init config class

const CheckoutBuilder = () => {
  useApi('http://localhost:8080/configurations', 'GET');
  return (
      <Container component="main" maxWidth="lg">
        <Paper sx={{ mx: { xs: 3, md: 8 }, p: { xs: 4, md: 5 } }}>
          <ConfigWrapper />
        </Paper>
      </Container>
  );
};

export default CheckoutBuilder;
