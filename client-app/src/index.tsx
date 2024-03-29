import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import './app/layout/HomePage.css';
import 'react-calendar/dist/Calendar.css';
import App from './app/layout/App';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';
 
ReactDOM.render(
  <StoreContext.Provider  value={store}>
    <BrowserRouter >
      <App/>
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
);