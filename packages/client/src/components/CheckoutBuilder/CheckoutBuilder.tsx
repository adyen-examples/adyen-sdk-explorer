import { useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import { descriptorsActions, onDeckActions } from '../../app';
import { useAppDispatch, useApi } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';

const { updateDescriptors } = descriptorsActions;
const { clearOnDeckInfo } = onDeckActions;

const CheckoutBuilder = ({ txvariant }: { txvariant: string }) => {
  const dispatch = useAppDispatch();
  const { data } = useApi(`checkout/paymentMethods/${txvariant}`, 'GET');

  useEffect(() => {
    if (data) {
      dispatch(clearOnDeckInfo());
      dispatch(updateDescriptors(data));
    }
  }, [dispatch, data]);

  return (
    <Container maxWidth="lg" disableGutters={true}>
      <Paper elevation={0}>
        <ConfigWrapper />
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
