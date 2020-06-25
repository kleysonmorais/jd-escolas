import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContainerBase from 'app/styleguide/components/Container';
import MenuContainer from 'app/modules/menu/containers/MenuContainer';
import Menu from 'app/modules/menu/components/Menu/Menu';
import { withState, compose } from 'recompose';
// import { useTranslation } from 'react-i18next';
// import FlagLanguage from '../FlagLanguage/FlagLanguage';
import { SECOND_COLOR } from 'app/modules/SinglePage/pages/styles';
import { propOr } from 'ramda';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';

const StyledHeader = styled.header`
  width: 100%;
  height: 55px;
  background-color: ${SECOND_COLOR};
  border-bottom: ${props => (props.topBarSections ? '1px solid #e1e0e0;' : '')};
  -webkit-box-shadow: ${props =>
    props.topBarSections ? '0px 3px 5px -2px rgba(0, 0, 0, 0.5);' : ''};
  -moz-box-shadow: ${props =>
    props.topBarSections ? '0px 3px 5px -2px rgba(0, 0, 0, 0.5);' : ''};
  box-shadow: ${props =>
    props.topBarSections ? '0px 3px 5px -2px rgba(0, 0, 0, 0.5);' : ''};
`;

const StyledContainer = styled(ContainerBase)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const StyledButton = styled(Button)`
  &:hover {
    opacity: 0.6;
  }
  i {
    background: #767676;
  }
`;

const StyledMenu = styled(Menu)`
  position: absolute;
  display: block;
  top: 65px;
  left: -20px;
  z-index: 99;
`;

const TopBarLogo = ({ isMenuOpen, setMenuOpen, topBarSections }) => {
  // const { i18n } = useTranslation();
  // const langCurrent = i18n.languages[0];
  return (
    <>
      <StyledHeader topBarSections={topBarSections}>
        <StyledContainer>
          <StyledButton
            isMenuOpen={isMenuOpen}
            onClick={() => {
              setMenuOpen(!isMenuOpen);
            }}
          />
          <Logo />
          {/*
          langCurrent === 'en' ? (
            <FlagLanguage
              lang="pt"
              onClick={() => {
                i18n.changeLanguage('pt');
              }}
            />
          ) : (
            <FlagLanguage
              lang="en"
              onClick={() => {
                i18n.changeLanguage('en');
              }}
            />
            )
            */}
          <div />
          <MenuContainer>
            {({ menu, socialLinks }) => {
              return (
                menu.length > 0 && (
                  <StyledMenu
                    menus={menu}
                    toggle={setMenuOpen}
                    visible={isMenuOpen}
                    icons={socialLinks}
                  />
                )
              );
            }}
          </MenuContainer>
        </StyledContainer>
      </StyledHeader>
    </>
  );
};

TopBarLogo.propTypes = {
  isMenuOpen: PropTypes.bool,
  setMenuOpen: PropTypes.func,
  topBarSections: PropTypes.bool,
};

TopBarLogo.defaultProps = {
  isMenuOpen: false,
  setMenuOpen: undefined,
  topBarSections: false,
};

export default compose(
  withState('isMenuOpen', 'setMenuOpen', propOr(false, 'isMenuOpen'))
)(TopBarLogo);
