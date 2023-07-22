import { Box, Drawer, List, ListItem, ListItemButton, Typography, CircularProgress, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';

const { updateTheme } = onDeckActions;

export const Sidebar = ({ page, drawerWidth, headerHeight }: any) => {
  const dispatch = useAppDispatch();
  const { products, theme } = useSelector((state: RootState) => state.onDeck);
  const productsKeys = Object.keys(products);
  const navigate = useNavigate();

  const selectedButtonStyle = {
    bgcolor: 'primary.main',
    borderRadius: 1,
    opacity: '1 !important'
  };
  const nonselectedButtonStyle = {
    '&:hover': { bgcolor: 'secondary.shadow', borderRadius: 1 }
  };

  const handleClick = (txvariant: any) => {
    navigate(`/${txvariant}`);
  };

  return (
    <Box>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            borderRight: 2,
            borderColor: 'secondary.light',
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            mt: `calc(${headerHeight}px + 2px)`,
            pb: `calc(${headerHeight}px + 2px)`,
            height: `calc(100% - ${headerHeight}px)`,
            pt: 2,
            px: 3
          }
        }}
        variant="permanent"
        anchor="left"
      >
        {productsKeys.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: '40vh' }}>
            <CircularProgress />
          </Box>
        )}
        {productsKeys.length > 0 && (
          <List>
            <ListItemButton onClick={(e: any) => handleClick('')} sx={!page ? selectedButtonStyle : nonselectedButtonStyle}>
              <Typography sx={{ color: `${!page ? 'primary.light' : 'primary.dark'}` }} variant="h6">
                Home
              </Typography>
            </ListItemButton>
            <ListItem>
              <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
                ONLINE PAYMENTS
              </Typography>
            </ListItem>
            {productsKeys.map((product: any, index: number) => {
              let subcategory = null;
              const selected = products[product].txVariant === page;
              const buttonStyle = selected ? selectedButtonStyle : nonselectedButtonStyle;

              if (product === 'Drop-in') {
                subcategory = (
                  <ListItem>
                    <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
                      COMPONENTS
                    </Typography>
                  </ListItem>
                );
              }
              return (
                <Box key={product}>
                  <ListItem disablePadding>
                    <ListItemButton disabled={selected} sx={buttonStyle} onClick={(e: any) => handleClick(products[product].txVariant)}>
                      <Typography sx={{ ml: 2, color: `${selected ? 'primary.light' : 'primary.dark'}` }} variant="h6">
                        {product}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  {subcategory}
                </Box>
              );
            })}
          </List>
        )}
      </Drawer>
      <Box
        sx={{
          borderTop: 2,
          position: 'fixed',
          bottom: 0,
          p: 1,
          bgcolor: 'secondary.light',
          color: 'secondary.light',
          zIndex: '1200',
          display: 'block',
          textAlign: 'center',
          width: `calc(${drawerWidth}px - 2px)`
        }}
      >
        <Typography variant="caption" sx={{ display: 'inline-block', textTransform: 'capitalize' }}>
          {theme} Theme
        </Typography>
        <Switch
          onChange={e => {
            dispatch(updateTheme(e.target.value === 'dark' ? 'light' : 'dark'));
          }}
          size="small"
          defaultChecked
          value={theme}
        />
      </Box>
    </Box>
  );
};
