import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './components';
import ApplicationRouter from './AppRouter';

const Application = () => {
    const [options, setOptions] = useState({
        value: 25,
        currency: 'EUR',
        countryCode: 'NL',
        component: 'dropin'
    });
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(options.component);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptions(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div id="app">
            <Header />
            <ApplicationRouter onSubmit={handleSubmit} onChange={handleChange} options={options} />
        </div>
    );
};

export default Application;
