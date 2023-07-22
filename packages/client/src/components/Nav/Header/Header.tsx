import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { ReactComponent as AdyenLogoDark } from '../../../assets/adyen-logo-dark.svg';
import { ReactComponent as AdyenLogoLight } from '../../../assets/adyen-logo-light.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const Header = ({ headerHeight }: any) => {
  const { theme } = useSelector((state: RootState) => state.onDeck);

  return (
    <AppBar elevation={0} position="fixed" sx={{ width: '100%', maxHeight: `${headerHeight}px` }}>
      <Box sx={{ borderBottom: 1, borderColor: 'secondary.light', boxShadow: 3, px: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            {theme === 'dark' ? <AdyenLogoDark /> : <AdyenLogoLight />}
            <Button sx={{ color: 'success.main', ml: 3, pointerEvents: 'none', cursor: 'not-allowed' }}>BETA</Button>
          </Box>
          <Box>
            <Button href="https://docs.adyen.com/" sx={{ color: 'p.color', ml: 3 }} variant="text">
              <Typography variant="h6">Documentation</Typography>
            </Button>
            <Button href="https://help.adyen.com/en_US" sx={{ color: 'p.color', ml: 3 }} variant="text">
              Support
            </Button>
            <Button href="https://www.adyen.com/signup" sx={{ color: 'p.color', ml: 3 }} variant="outlined">
              Test Account
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
