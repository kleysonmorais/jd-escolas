import React from 'react';
import Header from 'app/modules/menu/components/Header/Header';
import Capa from 'app/modules/sections/components/Capa/Capa';
import Footer from 'app/modules/Footer/Footer';
import { useMediaQuery } from 'react-responsive';
import {
  DESKTOP_OR_LAPTOP_WIDTH,
  BIG_SCREEN_WIDTH,
} from 'app/styleguide/lib/constants';
import ProgressBar from 'react-scroll-progress-bar';
import CardNews from '../sections/components/CardNews/CardNews';
import Count from '../sections/components/Countdown/Count';

const HomePage = () => {
  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: DESKTOP_OR_LAPTOP_WIDTH,
  });
  const isBigScreen = useMediaQuery({ minDeviceWidth: BIG_SCREEN_WIDTH });
  const webLayout = isDesktopOrLaptop || isBigScreen;
  return (
    <>
      <Header webLayout={webLayout} />
      <ProgressBar bgcolor="#C9463C" />
      <Capa />
      <Count />
      <CardNews webLayout={webLayout} />
      <Footer />
    </>
  );
};

export default HomePage;
