import { useParams } from 'react-router-dom';
import { LayoutContent } from './LayoutContent';

export const Layout = ({ main: Main }: any) => {
  const pathParams = useParams();
  const product: string | undefined = pathParams.component;

  return <LayoutContent main={Main} selectedProduct={product} />;
};
