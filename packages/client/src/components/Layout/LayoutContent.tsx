import { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Navbar } from '../Nav/Navbar/Navbar';
import { EditorWrapper } from '../JSONEditor/Editor';
import type { LayoutProps } from './Layout';
import { useMemoCompare, useAppDispatch } from '../../hooks';
import { onDeckActions, sdkExplorerActions } from '../../app';

const { updateExplorer } = sdkExplorerActions;
const { updateProfileInfo } = onDeckActions;

interface LayoutContentProps extends LayoutProps {
  sdkExplorerProps: any;
  activeProduct: { product: string };
  data: any;
}

export const LayoutContent = ({ main: Main, sdkExplorerProps, activeProduct, data }: LayoutContentProps) => {
  const drawerWidth = 380;
  const headerHeight = 64;
  const navButtonHeight = 40;
  const editorWidth = 420;

  const { product } = activeProduct;

  const dispatch = useAppDispatch();

  const sdkProps = useMemoCompare(sdkExplorerProps);
  const activeProd = useMemoCompare(activeProduct);

  useEffect(() => {
    if (sdkProps && activeProd) {
      dispatch(updateExplorer(sdkProps));
      dispatch(updateProfileInfo(sdkProps));
    }
  }, [dispatch, activeProd, sdkProps]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar drawerWidth={drawerWidth} products={data.products} headerHeight={headerHeight} page={product} />
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
        <Main txvariant={product} />
      </Box>
      <EditorWrapper dimensions={{ buttonHeight: navButtonHeight, headerHeight: headerHeight, editorWidth: editorWidth }} />;
    </Box>
  );
};
