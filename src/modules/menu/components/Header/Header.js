import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TopBarPages from '../Topbar/TopBarPages';
import TopBarLogo from '../Topbar/TopBarLogo';
import TopBarSections from '../Topbar/TopBarSections';

const WrapFixed = styled.div`
  position: fixed;
  width: 100vw;
  z-index: 10;
`;

const Header = props => {
  const {
    topBarPages,
    topBarLogo,
    topBarSections,
    children,
    webLayout,
  } = props;
  return (
    <WrapFixed>
      {topBarPages && webLayout && <TopBarPages />}
      {topBarLogo && <TopBarLogo topBarSections />}
      {topBarSections && <TopBarSections>{children}</TopBarSections>}
    </WrapFixed>
  );
};

Header.propTypes = {
  topBarPages: PropTypes.bool,
  topBarLogo: PropTypes.bool,
  topBarSections: PropTypes.bool,
};

Header.defaultProps = {
  topBarPages: true,
  topBarLogo: true,
  topBarSections: false,
};

export default Header;
