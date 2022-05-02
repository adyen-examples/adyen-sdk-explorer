import { Container, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useApi } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';

const theme = createTheme();

//Create init config class

const CheckoutBuilder = () => {
  useApi('http://localhost:8080/configurations', 'GET');

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ mb: 2 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout Builder
          </Typography>
          <ConfigWrapper />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CheckoutBuilder;
