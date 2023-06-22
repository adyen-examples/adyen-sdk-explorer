import { Box, CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { useApi, useAppDispatch } from '../../hooks';
import { EditorBar } from '../EditorBar';
import { defaultComponentStyle, defaultDropinStyle } from '../EditorBar/Tabs/StyleTab/defaultStyles';
import { Navbar } from '../Nav/Navbar/Navbar';

const { updateTxVariant, updateStyleInfo, updateProductsInfo } = onDeckActions;

export const Layout = ({ main: Main }: any) => {
  const dispatch = useAppDispatch();

  const drawerWidth = 380;
  const headerHeight = 64;
  const navButtonHeight = 40;
  let editorWidth = 0;

  const { data, loading, error } = useApi('api/checkout/paymentMethods', 'GET');

  const pathParams = useParams();
  const product: string | undefined = pathParams.component;

  let editor = null;
  let sdkExplorerProps: any = null;

  useEffect(() => {
    let activeProduct: any = null;
    if (sdkExplorerProps) {
      sdkExplorerProps.steps = ['checkout', 'local', 'sessions', 'review'];
      dispatch(updateProductsInfo(sdkExplorerProps));
      dispatch(updateTxVariant(sdkExplorerProps.txVariant));

      if (product === 'dropin') {
        dispatch(updateStyleInfo(defaultDropinStyle));
      } else {
        dispatch(updateStyleInfo(defaultComponentStyle));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, data, dispatch]);

  if (!error && data) {
    for (let component in data as { [key: string]: { txvariant: String } }) {
      if (data[component].txVariant === product) {
        let componentDescriptors: object = data[component];
        sdkExplorerProps = { ...componentDescriptors };
        console.log('setting sdkExplorerProps')
      }
    }

    if (sdkExplorerProps) {
      editorWidth = 420;
      editor = (
        <EditorBar
          dimensions={{ buttonHeight: navButtonHeight, headerHeight: headerHeight, editorWidth: editorWidth }}
          steps={['sessions', 'checkout', 'local', 'review']}
        />
      );
    } else if (product !== undefined) {
      return <h1>404: Page not found</h1>;
    }
  }

  if (!error && data) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar drawerWidth={drawerWidth} products={data} headerHeight={headerHeight} page={product} />
        <Box
          sx={{
            position: 'fixed',
            top: '0',
            bottom: '0',
            width: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
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
        {editor}
      </Box>
    );
  }
  return <Box>...Loading</Box>;
};
