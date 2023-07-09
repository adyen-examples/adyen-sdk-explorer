import { AppBar, Box, Button, Toolbar, IconButton, Drawer, Typography } from '@mui/material';
import { ReactComponent as AdyenLogo } from '../../../assets/adyen-logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from '../Sidebar/Sidebar';
import { useState } from 'react';

export const Navbar = ({ drawerWidth, headerHeight, page }: any) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const links = [
    { title: 'Documentation', url: 'https://docs.adyen.com/' },
    {
      title: 'Support',
      url: 'https://help.adyen.com/en_US'
    },
    {
      title: 'Test Account',
      url: 'https://www.adyen.com/signup'
    }
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Box>
      <AppBar elevation={0} position="fixed" sx={{ width: '100%', maxHeight: `${headerHeight}px` }}>
        <Box
          bgcolor="white"
          sx={{
            borderBottom: 1,
            borderColor: 'primary.border',
            boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)',
            px: 2,
            '.MuiToolbar-root': { pl: { xs: 0, md: 0, lg: 2 } }
          }}
        >
          <Toolbar sx={{ justifyContent: { xs: 'start', md: 'start', lg: 'space-between', xl: 'space-between' } }}>
            <Box sx={{ color: 'secondary.gray', display: { xs: 'inline-block', md: 'inline-block', lg: 'none', xl: 'none' } }}>
              <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <AdyenLogo />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {links.map((link: any) => (
                <Button
                  key={link.title}
                  href={link.url}
                  sx={{ ml: 3, borderColor: 'primary.border' }}
                  variant={`${link.title === 'Test Account' ? 'outlined' : 'text'}`}
                >
                  <Typography variant="h6" sx={{ textTransform: 'none', fontSize: '0.95rem', fontWeight: `${link.title === 'Test Account' ? 'bold' : 'light'}` }}>
                    {link.title}
                  </Typography>
                </Button>
              ))}
              <Button sx={{ color: '#08be52', ml: 3, pointerEvents: 'none', cursor: 'not-allowed' }}>BETA</Button>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' } }}>
        <Sidebar drawerWidth={drawerWidth} headerHeight={headerHeight} page={page} />
      </Box>
      <Box>
        <Drawer anchor="left" open={isNavOpen} onClose={handleOpenNavMenu}>
          <Sidebar drawerWidth={drawerWidth} headerHeight={'-5'} page={page} />
        </Drawer>
      </Box>
    </Box>
  );
};
