import { Box, Drawer, List, ListItem, ListItemButton, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';

export const Sidebar = ({ page, drawerWidth, headerHeight }: any) => {
  const { products } = useSelector((state: RootState) => state.onDeck);
  const productsKeys = Object.keys(products);
  const navigate = useNavigate();

  const selectedButtonStyle = {
    bgcolor: 'primary.main',
    borderRadius: 1,
    opacity: '1 !important'
  };
  const nonselectedButtonStyle = {
    '&:hover': { bgcolor: 'secondary.shadow', borderRadius: 1 },
  };

  const handleClick = (txvariant: any) => {
    navigate(`/${txvariant}`);
  };

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          borderRight: 2,
          borderColor: 'secondary.light',
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          mt: `calc(${headerHeight}px + 8px)`,
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
            <Typography sx={{ color: `${!page ? 'white' : 'black'}` }} variant="h6">
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
                    <Typography sx={{ ml: 2, color: `${selected ? 'white' : 'black'}` }} variant="h6">
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
  );
};
