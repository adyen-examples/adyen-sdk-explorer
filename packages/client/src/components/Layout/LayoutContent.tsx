import { useSelector } from 'react-redux';
import { Box, CssBaseline } from '@mui/material';
import { EditorWrapper } from '../JSONEditor/Editor';
import { Navbar } from '../Nav/Navbar/Navbar';

import type { RootState } from '../../store';

interface LayoutContentProps {
  main: any;
  selectedProduct: string | undefined;
}

export const LayoutContent = ({ main: Main, selectedProduct }: LayoutContentProps) => {
  const { products } = useSelector((state: RootState) => state.onDeck);
  const drawerWidth = 380;
  const headerHeight = 64;
  const navButtonHeight = 40;

  let editorWidth = 0;

  let editor;

  if (selectedProduct) {
    editorWidth = 420;
    editor = <EditorWrapper dimensions={{ buttonHeight: navButtonHeight, headerHeight: headerHeight, editorWidth: editorWidth }} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar drawerWidth={drawerWidth} products={products} headerHeight={headerHeight} page={selectedProduct} />
      <Box
        sx={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          ml: {
            xs: 0,
            md: 0,
            lg: `${drawerWidth}px`,
            xl: `${drawerWidth}px`
          },
          mr: {
            xs: 0,
            md: `${editorWidth}px`,
            lg: `${editorWidth}px`,
            xl: `${editorWidth}px`
          },
          overflow: 'scroll',
          mt: `${headerHeight}px`
        }}
        component="main"
      >
        <Main txvariant={selectedProduct} />
      </Box>
      {editor}
    </Box>
  );
};
