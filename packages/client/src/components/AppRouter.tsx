import { Route, Routes } from 'react-router-dom';
import { PaymentsFormProps } from './types';
import { CheckoutBuilder, PaymentsForm, ComponentBase } from '.';

const ApplicationRouter = () => {
  return (
    <Routes>
      <Route path="/checkout-builder" element={<CheckoutBuilder />} />
      <Route path="/checkout-builder/:component" element={<ComponentBase />} />
    </Routes>
  );
};

export default ApplicationRouter;
