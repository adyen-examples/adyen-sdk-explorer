import { Route, Routes } from 'react-router-dom';
import { PaymentsFormProps } from './types';
import { PaymentsForm, ComponentBase, CheckoutBuilder } from './components';

const ApplicationRouter = ({ options, onSubmit, onChange }: PaymentsFormProps) => {
    return (
        <Routes>
            <Route path="/" element={<CheckoutBuilder options={options} onSubmit={onSubmit} onChange={onChange} />} />
            <Route path=":component" element={<ComponentBase {...options} />} />
        </Routes>
    );
};

export default ApplicationRouter;
