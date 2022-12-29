import { Box, CssBaseline } from '@mui/material';
import { useParams } from 'react-router-dom';
import { onDeckActions, sdkExplorerActions } from '../../app';
import { useApiLocal, useAppDispatch } from '../../hooks';
import { Header } from './Header/Header';
import { JSONEditor } from './JSONEditor/JSONEditor';
import { Sidebar } from './Sidebar/Sidebar';
const { updateExplorer } = sdkExplorerActions;
const { updateProfileInfo } = onDeckActions;

export const Layout = ({ main: Main }: any) => {
  const drawerWidth = 380;
  const headerHeight = 64;
  let editorWidth = 0;

  const [products]: any = useApiLocal('http://localhost:8080/api/products', 'GET');
  const { state, error, data } = products;

  const dispatch = useAppDispatch();

  const pathParams = useParams();
  const product: any = pathParams.component;

  let editor = null;

  if (!error && data) {
    let sdkExplorerProps: any = null;
    Object.keys(data.products).forEach(component => {
      if (data.products[component].txvariant === product) {
        sdkExplorerProps = data.products[component];
      }
    });

    if (sdkExplorerProps) {
      const txvariant = sdkExplorerProps.txvariant;
      const activeProduct: any = {
        product: txvariant
      };

      dispatch(updateExplorer(sdkExplorerProps));
      dispatch(updateProfileInfo(activeProduct));
      editorWidth = 420;
      editor = <JSONEditor headerHeight={headerHeight} editorWidth={editorWidth} />;
    } else if (!sdkExplorerProps && product) {
      return <h1>404: Page not found</h1>;
    }

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header drawerWidth={drawerWidth} />
        <Sidebar drawerWidth={drawerWidth} products={data.products} />
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
          <Main txvariant={product} />
          {editor}
        </Box>
      </Box>
    );
  }

  return <Box>...Loading</Box>;
};
