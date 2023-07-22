import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { onDeckActions } from '../app';
import { API_URL } from '../config';
import { useAppDispatch } from '../hooks';
import type { RequestOptions } from '../hooks/types';
import ApplicationRouter from './AppRouter';
import { darkThemeOptions, lightThemeOptions } from './theme';

const theme = createTheme(lightThemeOptions);
const { updateProductsInfo } = onDeckActions;

const Application = () => {
  const dispatch = useAppDispatch();
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
      <ThemeProvider theme={theme}>
        <ApplicationRouter />
      </ThemeProvider>
    </div>
  );
};

export default Application;
