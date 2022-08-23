import { Header } from '.';
import { Layout } from './Nav/Layout';
import ApplicationRouter from './AppRouter';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from './theme';
const theme = createTheme(themeOptions);

const Application = () => {
  return (
    <div id="app">
      <ThemeProvider theme={theme}>
        <Layout>
          <ApplicationRouter />
        </Layout>
      </ThemeProvider>
    </div>
  );
};

export default Application;
