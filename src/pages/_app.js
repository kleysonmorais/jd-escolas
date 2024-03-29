import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'animate.css/animate.min.css';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from 'app/redux/store';

// eslint-disable-next-line
function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// makeStore function that returns a new store for every request
const makeStore = () => store;

// withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
