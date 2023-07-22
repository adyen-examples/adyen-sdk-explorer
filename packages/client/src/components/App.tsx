import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { onDeckActions } from '../app';
import { API_URL } from '../config';
import { useAppDispatch } from '../hooks';
import type { RequestOptions } from '../hooks/types';
import ApplicationRouter from './AppRouter';
import { darkThemeOptions, lightThemeOptions } from './theme';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const theme = createTheme(darkThemeOptions);
const { updateProductsInfo } = onDeckActions;

const Application = () => {
  const dispatch = useAppDispatch();
  const { theme } = useSelector((state: RootState) => state.onDeck);
  const appTheme = theme === 'dark' ? createTheme(darkThemeOptions) : createTheme(lightThemeOptions);

  useEffect(() => {
    const requestOptions: RequestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    };

    const makeRequest: () => void = async () => {
      try {
        const response = await fetch(`${API_URL}/api/checkout/paymentMethods`, requestOptions);
        const data = await response.json();
        dispatch(updateProductsInfo(data));
      } catch (err) {
        console.error(err);
      }
    };

    makeRequest();

    return () => {};
  }, [dispatch]);

  return (
    <div id="app">
      <ThemeProvider theme={appTheme}>
        <ApplicationRouter />
      </ThemeProvider>
    </div>
  );
};

export default Application;
