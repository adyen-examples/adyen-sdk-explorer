import { Route, Routes } from 'react-router-dom';
import { CheckoutBuilder, ComponentBase } from '.';

const ApplicationRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckoutBuilder />} />
      <Route path="/:component" element={<ComponentBase />} />
    </Routes>
  );
};

export default ApplicationRouter;
