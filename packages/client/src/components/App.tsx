import { createTheme, ThemeProvider } from '@mui/material';
import ApplicationRouter from './AppRouter';
import { themeOptions } from './theme';
const theme = createTheme(themeOptions);

const Application = () => {
  return (
    <div id="app">
      <ThemeProvider theme={theme}>
          <ApplicationRouter />
      </ThemeProvider>
    </div>
  );
};

export default Application;
