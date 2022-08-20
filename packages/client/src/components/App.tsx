import { Header } from '.';
import { Nav } from './Nav/Nav';
import ApplicationRouter from './AppRouter';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from './theme';
const theme = createTheme(themeOptions);

const Application = () => {
  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <Nav>
          <ApplicationRouter />
        </Nav>
      </ThemeProvider>
    </div>
  );
};

export default Application;
