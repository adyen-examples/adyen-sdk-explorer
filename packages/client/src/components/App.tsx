import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { onDeckActions } from '../app';
import { createTheme, ThemeProvider } from '@mui/material';
import ApplicationRouter from './AppRouter';
import { themeOptions } from './theme';
import { API_URL } from '../config';
import type { RequestOptions } from '../hooks/types';

const { updateProductsInfo } = onDeckActions;

const theme = createTheme(themeOptions);

const Application = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('calling');
    const requestOptions: RequestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    };

    const makeRequest: () => void = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`, requestOptions);
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
