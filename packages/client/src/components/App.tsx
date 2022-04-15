import { Header } from '.';
import ApplicationRouter from './AppRouter';

const Application = () => {
  return (
    <div id="app">
      <Header />
      <ApplicationRouter />
    </div>
  );
};

export default Application;
