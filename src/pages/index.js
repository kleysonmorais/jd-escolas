import React from 'react';
import HomePage from 'app/modules/HomePage/HomePage';
import GlobalStyle from 'app/styleguide/global';
import 'app/_i18n/i18n';
import withData from '../lib/apollo';

export default withData(() => {
  return (
    <>
      <HomePage />
      <GlobalStyle />
    </>
  );
});
