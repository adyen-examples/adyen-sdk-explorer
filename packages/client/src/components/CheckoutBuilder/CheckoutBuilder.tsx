import { Container, Paper } from '@mui/material';
import { useApi } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';

const CheckoutBuilder = ({props}: any) => {
  const { txvariant, steps } = props;
  useApi('http://localhost:8080/api/configurations', 'GET');  
  
  return (
    <Container maxWidth="lg">
      <Paper elevation={0}>
        <ConfigWrapper txvariant={txvariant} steps={steps} />
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
