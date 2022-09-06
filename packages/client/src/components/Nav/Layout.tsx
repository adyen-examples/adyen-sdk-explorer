import { Box, CssBaseline } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './Header/Header';
import { JSONEditor } from './JSONEditor/JSONEditor';
import { Sidebar } from './Sidebar/Sidebar';

const products: any = {
  dropin: { txvariant: 'dropin', steps: ['profile','checkout', 'local', 'sessions', 'review'] },
  cards: { txvariant: 'card', steps: ['profile','local', 'sessions', 'review'] },
  paysafecard: { txvariant: 'paysafecard', steps: ['profile','local', 'sessions', 'review'] }
};

export const Layout = ({ main: Main }: any) => {
  const drawerWidth = 380;
  const headerHeight = 64;
  const editorWidth = 420;

  const params = useParams();
  const component: any = params.component;

  const payload = products;
  const componentProps = payload[component];

  const childComponent = payload ? <Main props={componentProps} /> : '...Loading';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} products={products} />
      <Box
        sx={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          width: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
          ml: `${drawerWidth}px`,
          mr: `${editorWidth}px`,
          overflow: 'scroll',
          mt: `${headerHeight}px`
        }}
        component="main"
      >
        {childComponent}
      </Box>
      <JSONEditor headerHeight={headerHeight} editorWidth={editorWidth} />
    </Box>
  );
};
