import { useState, useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import { useMemoCompare } from './useMemoCompare';
import { compareSessionData } from '../helpers';
import { CLIENT_KEY, ENVIRONMENT } from '../config';

type SessionDataConfig = {
    id: string;
    sessionData?: string;
};

type CheckoutConfiguration = {
    environment: string;
    clientKey: string;
    session: SessionDataConfig;
    onPaymentCompleted: (result: any, component: any) => void;
    onError: (result: any, component: any) => void;
};

export const useCheckout = (options: {
    sessionId: string;
    sessionData: string;
    redirectResult?: {
        redirectResult: string | null;
        redirectSessionId: string | null;
    };
}) => {
    const [checkout, setCheckout] = useState<any>(null);

    // creates ref and uses data compare callback to decide if re-rendering should occur.  Without this, there is an infinite loop.
    const opts = useMemoCompare(options, compareSessionData);

    useEffect(() => {
        const { sessionId, sessionData, redirectResult } = options;

        let session: SessionDataConfig = {
            id: sessionId
        };

        if (redirectResult && redirectResult.redirectSessionId) {
            session = { id: redirectResult.redirectSessionId };
        } else {
            session.sessionData = sessionData;
        }
        const configuration: CheckoutConfiguration = {
            environment: ENVIRONMENT,
            clientKey: CLIENT_KEY, // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
            session,
            onPaymentCompleted: (result, component) => {
                console.info(result, component);
            },
            onError: (error, component) => {
                console.error(error.name, error.message, error.stack, component);
            }
        };
        const initializeCheckout: (config: object) => void = async config => {
            const component = await AdyenCheckout(config);
            if (redirectResult && redirectResult.redirectResult && redirectResult.redirectSessionId) {
                component.submitDetails({
                    details: { redirectResult: redirectResult.redirectResult }
                });
            }

            setCheckout(component);
        };

        initializeCheckout(configuration);
    }, [opts]);

    return [checkout];
};
