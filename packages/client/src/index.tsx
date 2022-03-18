import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@adyen/adyen-web/dist/adyen.css';
import './index.scss';

import { store } from './store';
import App from './components/App';

const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);
