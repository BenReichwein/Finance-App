import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import WithAuth from './middleware/with-auth'
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Chat from './components/Chat'
// This is where we combine the react redux base our application
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <ThemeConfig>
  <GlobalStyles />
    <Provider store={store}>
      <BrowserRouter>
          <React.StrictMode>
            <Routes>
              <Route path="/login" exact element={<Login/>} />
              <Route path="/register" exact element={<Register/>} />
              <Route path="/" exact element={
                <div style={{width: '65vw'}}>
                <WithAuth>
                  <Home/>
                  <Chat/>
                </WithAuth>
                </div>
              }/>
              <Route path="/profile" element={
                <WithAuth>
                  <Profile/>
                </WithAuth>
              } />
            </Routes>
          </React.StrictMode>
        </BrowserRouter>
    </Provider>
  </ThemeConfig>,
  document.getElementById('root')
);