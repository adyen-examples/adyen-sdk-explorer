import { Route, Routes } from 'react-router-dom';
import { CheckoutBuilder, ComponentBase } from '.';
import { Overview } from './Overview/Overview';
import { Layout } from './Nav/Layout';

const ApplicationRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Overview />
          </Layout>
        }
      />
      <Route
        path="/:component"
        element={
          <Layout>
            <CheckoutBuilder />
          </Layout>
        }
      />
    </Routes>
  );
};

export default ApplicationRouter;
