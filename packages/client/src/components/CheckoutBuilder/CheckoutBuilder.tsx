import { Container, Paper } from '@mui/material';
import { useApi } from '../../hooks';
import { ConfigWrapper } from './ConfigWrapper';


const CheckoutBuilder = () => {
  useApi('http://localhost:8080/api/configurations', 'GET');  

  // From here I can update the state so that this is forced to rerender everything
  // I think useNavigate might be updating the state
  return (
    <Container maxWidth="lg">
      <Paper elevation={0}>
        <ConfigWrapper/>
      </Paper>
    </Container>
  );
};

export default CheckoutBuilder;
