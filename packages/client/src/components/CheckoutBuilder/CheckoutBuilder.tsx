import { Container, Paper } from '@mui/material';
import { useEffect } from 'react';
import { descriptorsActions, onDeckActions } from '../../app';
import { useApi, useAppDispatch } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';
import { useSearchParams } from 'react-router-dom';
import { CLIENT_URL } from '../../config';

const { updateDescriptors } = descriptorsActions;
const { resetOnDeckInfo, updateSessionsInfo } = onDeckActions;

const CheckoutBuilder = ({ txvariant }: { txvariant: string }) => {
  const dispatch = useAppDispatch();
  const [queryParameters] = useSearchParams();
  const redirectResult = queryParameters.get('redirectResult');
  const { data } = useApi(`api/checkout/paymentMethods/${txvariant}`, 'GET');

  useEffect(() => {
    let dynamicSessionProps: any = null;

    if (data) {
      const currency = data.sessionsConfig[0].properties[0].values;
      const merchantAccount = data.sessionsConfig[1].values;
      const countryCode = data.sessionsConfig[2].values;

      dynamicSessionProps = {
        amount: {
          value: '900',
          currency: currency.length > 0 ? currency[0] : 'USD'
        },
        merchantAccount: merchantAccount,
        reference: 'your-order-number',
        returnUrl: `${CLIENT_URL}/${txvariant}`
      };

      if (countryCode.length > 0) {
        dynamicSessionProps.countryCode = countryCode[0];
      }

      dispatch(updateDescriptors(data));
    }
    if (!redirectResult) {
      dispatch(resetOnDeckInfo());
      dynamicSessionProps && dispatch(updateSessionsInfo(dynamicSessionProps));
    }
    return () => {
      dispatch(resetOnDeckInfo());
    };
  }, [dispatch, data, redirectResult, txvariant]);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Paper elevation={0}>
        <ConfigWrapper />
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
