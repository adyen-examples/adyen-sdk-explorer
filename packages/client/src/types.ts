import React from 'react';

export type FormDataProps = {
    value: number;
    currency: string;
    countryCode: string;
    component?: string;
};

export type PaymentsFormProps = {
    options: FormDataProps;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
