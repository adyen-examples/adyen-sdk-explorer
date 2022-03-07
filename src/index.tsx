import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '@adyen/adyen-web/dist/adyen.css';
import './index.scss';
import App from './App';

const rootElement = document.getElementById('root');
render(
    <Router>
        <App />
    </Router>,
    rootElement
);
