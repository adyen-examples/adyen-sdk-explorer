import { Route, Routes } from 'react-router-dom';
import { CheckoutBuilder } from '.';
import { Layout } from './Nav/Layout';
import { Overview } from './Overview/Overview';

const ApplicationRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout main={Overview} />} />
      <Route path="/:component" element={<Layout main={CheckoutBuilder} />} />
    </Routes>
  );
};

export default ApplicationRouter;
