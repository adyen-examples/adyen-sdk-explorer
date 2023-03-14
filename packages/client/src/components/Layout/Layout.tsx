import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useApiLocal } from '../../hooks';
import { LayoutContent } from './LayoutContent';

export interface LayoutProps {
  main: (props: any) => JSX.Element;
}

export const Layout = ({ main: Main }: LayoutProps) => {
  const [sdkExplorerProps, setSdkExplorerProps] = useState<any>({});
  const [activeProduct, setActiveProduct] = useState({ product: '' });

  const [products]: any = useApiLocal('http://localhost:8080/api/products', 'GET');
  const { error, data } = products;

  const pathParams = useParams();
  const product: string | undefined = pathParams.component;

  if (!error && data) {
    for (let component in data.products) {
      if (data.products[component].txvariant === product) {
        setSdkExplorerProps(data.products[component]);
      }
    }
  }

  if (sdkExplorerProps.txvariant) {
    setActiveProduct({
      product: sdkExplorerProps.txvariant
    });
  }

  if (!error && !data) {
    return <Box>...Loading</Box>;
  }

  if (!sdkExplorerProps && product) {
    return <h1>404: Page not found</h1>;
  }

  return <LayoutContent main={Main} sdkExplorerProps={sdkExplorerProps} activeProduct={activeProduct} data={data} />;
};
