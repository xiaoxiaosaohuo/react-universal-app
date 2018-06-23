import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { AppContainer } from "react-hot-loader"; 
import { BrowserRouter } from 'react-router-dom';
import App from './components/App'
import configureStore from './store'

const store = configureStore(window.__INITIAL_STATE__)
const render = App => ReactDOM.hydrate(
  <Provider store={store}>
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
    </AppContainer>
  </Provider>,
  document.getElementById('root')
)
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./components/App.js", () => {
    const App = require("./components/App").default;
    render(App);
  });
}
render(App)
