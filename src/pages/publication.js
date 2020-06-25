import React from 'react';
import GlobalStyle from 'app/styleguide/global';
import SinglePage from 'app/modules/SinglePage/SinglePage';
import 'app/_i18n/i18n';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import {
  DESKTOP_OR_LAPTOP_WIDTH,
  BIG_SCREEN_WIDTH,
} from 'app/styleguide/lib/constants';
import withData from '../lib/apollo';

export default withData(() => {
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: DESKTOP_OR_LAPTOP_WIDTH,
  });
  const isBigScreen = useMediaQuery({ minDeviceWidth: BIG_SCREEN_WIDTH });
  const webLayout = isDesktopOrLaptop || isBigScreen;
  return (
    <>
      <div>
        <Head>
          <script src="https://www.gstatic.com/charts/loader.js" />
        </Head>
      </div>
      <SinglePage numberPage={router.query.page} webLayout={webLayout} />
      <GlobalStyle />
    </>
  );
});
