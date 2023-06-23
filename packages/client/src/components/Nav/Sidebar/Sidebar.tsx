import { Box, Drawer, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const Sidebar = ({ page, drawerWidth, headerHeight }: any) => {
  const { clearOnDeckInfo } = onDeckActions;
  const { products } = useSelector((state: RootState) => state.onDeck);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedButtonStyle = {
    bgcolor: 'primary.main',
    borderRadius: 1,
    color: '#FFFFFF',
    opacity: '1 !important'
  };
  const nonselectedButtonStyle = {
    '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.12)', borderRadius: 1 },
    color: '#000000'
  };

  const handleClick = (txvariant: any) => {
    dispatch(clearOnDeckInfo());
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
        {Object.keys(products).map((product: any, index: number) => {
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
    </Drawer>
  );
};
