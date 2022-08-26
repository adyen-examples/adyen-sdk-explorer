import { Route, Routes } from 'react-router-dom';
import { CheckoutBuilder, ComponentBase } from '.';
import { Overview } from './Overview/Overview';

const ApplicationRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/:component" element={<CheckoutBuilder />} />
    </Routes>
  );
};

export default ApplicationRouter;
