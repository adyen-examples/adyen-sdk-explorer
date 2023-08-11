import { Box, CircularProgress, Drawer, List, ListItem, ListItemButton, Switch, Typography, Slide } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { RootState } from '../../../store';

const { updateTheme } = onDeckActions;

export const Sidebar = ({ page, drawerWidth, headerHeight, variant, open, onClose }: any) => {
  const dispatch = useAppDispatch();
  const { products, theme } = useSelector((state: RootState) => state.onDeck);
  const productsKeys = Object.keys(products);
  const navigate = useNavigate();

  const selectedButtonStyle = {
    bgcolor: 'primary.main',
    borderRadius: 1,
    opacity: '1 !important',
    '&:hover': { bgcolor: 'primary.main' }
  };
  const nonselectedButtonStyle = {
    '&:hover': { bgcolor: 'secondary.shadow', borderRadius: 1 }
  };

  const handleClick = (txvariant: any) => {
    navigate(`/${txvariant}`);
  };

  const style = {
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
    },
    '#loading-icon': { textAlign: 'center', mt: '40vh' }
  };

  return (
    <Box>
      <Drawer sx={style} variant={variant} open={open} onClose={onClose} anchor="left">
        {productsKeys.length === 0 && (
          <Box id="loading-icon">
            <CircularProgress />
          </Box>
        )}
        {productsKeys.length > 0 && (
          <List>
            <ListItemButton onClick={(e: any) => handleClick('')} sx={!page ? selectedButtonStyle : nonselectedButtonStyle}>
              <Typography pl={2} sx={{ color: `${!page ? 'primary.light' : 'primary.dark'}` }} variant="h6">
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
      {open && (
        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
          <Box
            id="theme-switcher"
            sx={{
              borderTop: 2,
              position: 'fixed',
              bottom: 0,
              left: 0,
              p: 1,
              bgcolor: 'secondary.light',
              color: 'secondary.light',
              zIndex: '1300',
              display: 'block',
              textAlign: 'center',
              width: `${drawerWidth}px`
            }}
          >
            <Typography variant="caption" sx={{ display: 'inline-block', textTransform: 'capitalize' }}>
              {theme} Theme
            </Typography>
            <Switch
              onChange={e => {
                dispatch(updateTheme(e.target.value === 'dark' ? 'light' : 'dark'));
              }}
              defaultChecked
              value={theme}
            />
          </Box>
        </Slide>
      )}
    </Box>
  );
};
