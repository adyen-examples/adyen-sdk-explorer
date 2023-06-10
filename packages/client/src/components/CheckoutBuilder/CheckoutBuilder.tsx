import { useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import { descriptorsActions } from '../../app';
import { useAppDispatch } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';
import { API_URL } from '../../config';
import type { RequestOptions } from '../../hooks/types';

const { updateDescriptors } = descriptorsActions;

const CheckoutBuilder = ({ txvariant }: any) => {
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
        const response = await fetch(`${API_URL}/api/checkout/paymentMethods/${txvariant}`, requestOptions);
        const data = await response.json();

        dispatch(updateDescriptors(data));
      } catch (err) {
        console.error(err);
      }
    };

    makeRequest();

    return () => {};
  }, [dispatch, txvariant]);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Paper elevation={0}>
        <ConfigWrapper />
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
