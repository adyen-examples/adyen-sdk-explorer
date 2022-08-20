import { Container, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useApi } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';

//Create init config class

const CheckoutBuilder = () => {
  useApi('http://localhost:8080/configurations', 'GET');
  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={0} sx={{ mt: { xs: 9 } }}>
        <ConfigWrapper />
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
