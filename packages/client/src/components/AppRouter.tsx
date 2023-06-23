import { Route, Routes } from 'react-router-dom';
import { CheckoutBuilder } from '.';
import { Layout } from './Layout';
import { Overview } from './Overview/Overview';
import { NotFound } from './Error/NotFound';

const ApplicationRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout main={Overview} />} />
      <Route path="/:component" key="/:component" element={<Layout main={CheckoutBuilder} />} />
      <Route path="/error" key="/error" element={<NotFound />} />
      <Route path="*" key="/error" element={<NotFound />} />
    </Routes>
  );
};

export default ApplicationRouter;
