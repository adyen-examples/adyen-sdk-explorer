import { AppBar, Box, Button, Toolbar, IconButton, Drawer, Typography } from '@mui/material';
import { ReactComponent as AdyenLogoLight } from '../../../assets/adyen-logo-light.svg';
import { ReactComponent as AdyenLogoDark } from '../../../assets/adyen-logo-dark.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from '../Sidebar/Sidebar';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const Navbar = ({ drawerWidth, headerHeight, page }: any) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { theme } = useSelector((state: RootState) => state.onDeck);

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

  const style = {
    '#app-bar': { width: '100%', maxHeight: `${headerHeight}px` },
    '#toolbar-container': {
      borderBottom: 1,
      bgcolor: 'background.default',
      borderColor: 'secondary.light',
      boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)',
      px: { md: 0, lg: 2 },
      '#MuiToolbar-root': { pl: { xs: 0, md: 0, lg: 2 } },
      Toolbar: { justifyContent: { xs: 'start', md: 'start', lg: 'space-between', xl: 'space-between' } }
    },
    '#desktop-side-nav': { flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' } },
    '#mobile-side-nav': { width: `${drawerWidth}px`, '.MuiDrawer-paper': { position: 'initial' } },
    '#icon-button': {
      display: { xs: 'inline-block', md: 'inline-block', lg: 'none', xl: 'none' },
      svg: { color: 'primary.light', verticalAlign: 'top' },
      button: { pr: 2, pt: 0 }
    }
  };

  return (
    <Box sx={style}>
      <AppBar elevation={0} position="fixed" id="app-bar">
        <Box id="toolbar-container">
          <Toolbar>
            <Box id="icon-button">
              <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>{theme === 'dark' ? <AdyenLogoDark /> : <AdyenLogoLight />}</Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {links.map((link: any) => (
                <Button
                  key={link.title}
                  href={link.url}
                  sx={{ ml: 3, borderColor: 'primary.border' }}
                  variant={`${link.title === 'Test Account' ? 'outlined' : 'text'}`}
                >
                  <Typography
                    variant="h6"
                    className="nav-link"
                    sx={{ textTransform: 'none', fontSize: '0.95rem', fontWeight: `${link.title === 'Test Account' ? 'bold' : 'light'}` }}
                  >
                    {link.title}
                  </Typography>
                </Button>
              ))}
              <Button sx={{ color: 'success.main', ml: 3, pointerEvents: 'none', cursor: 'not-allowed' }}>BETA</Button>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      <Box id="desktop-side-nav">
        <Sidebar drawerWidth={drawerWidth} headerHeight={headerHeight} page={page} />
      </Box>
      <Box>
        <Drawer anchor="left" open={isNavOpen} onClose={handleOpenNavMenu} id="mobile-side-nav">
          <Sidebar drawerWidth={drawerWidth} headerHeight={'-5'} page={page} />
        </Drawer>
      </Box>
    </Box>
  );
};
