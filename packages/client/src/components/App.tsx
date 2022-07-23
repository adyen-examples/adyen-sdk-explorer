import { Header } from '.';
import ApplicationRouter from './AppRouter';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from './theme'
const theme = createTheme(themeOptions);

const Application = () => {
  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <Header />
        <ApplicationRouter />
      </ThemeProvider>
    </div>
  );
};

export default Application;
