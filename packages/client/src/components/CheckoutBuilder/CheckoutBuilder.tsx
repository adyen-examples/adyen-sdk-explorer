import { Container, Paper } from '@mui/material';
import { useEffect } from 'react';
import { descriptorsActions, onDeckActions } from '../../app';
import { useApi, useAppDispatch } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';

const { updateDescriptors } = descriptorsActions;
const { resetOnDeckInfo } = onDeckActions;

const CheckoutBuilder = ({ txvariant }: { txvariant: string }) => {
  const dispatch = useAppDispatch();
  const { data } = useApi(`api/checkout/paymentMethods/${txvariant}`, 'GET');

  useEffect(() => {
    if (data) {
      dispatch(resetOnDeckInfo());
      dispatch(updateDescriptors(data));
    }
  }, [dispatch, data]);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Paper elevation={0}>
        <ConfigWrapper />
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
