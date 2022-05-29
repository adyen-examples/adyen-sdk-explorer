import { useSelector } from 'react-redux';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from '../ConfigurationSession';
import Component from './Component';

const RedirectComponent = ({configuration, redirectResult}: {configuration: any, redirectResult: any}) => {

    return <div id="checkout"></div>;
};

export default RedirectComponent;
