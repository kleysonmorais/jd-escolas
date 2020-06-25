import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Value } from 'react-powerplug';
// import { renderNothing } from 'recompose';
import { path } from 'ramda';

import { media } from 'app/styleguide/media';
// import { withErrorBoundary } from 'app/components/ErrorBoundary';

import SocialIcons from 'app/styleguide/components/SocialIcons';
import Button from 'app/styleguide/components/Button/Button';
import Logo from 'app/styleguide/components/Logo/Logo';
import Link from 'app/lib/Link';
import MenuItems from './MenuItems';
import MenuVehicles from './MenuVehicles';

const PADDING = '20px';

const StyledHeader = styled.header`
  padding: ${PADDING};

  ${media.min.xl`
    display: none;
    border-bottom: 2px solid #ebebeb;
  `}
`;

const StyledFooter = styled.footer`
  border-top: 2px solid #ebebeb;
  display: flex;
  justify-content: space-between;
  padding: ${PADDING};
  flex-direction: column;
`;

const StyledSocialInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const StyledButton = styled(Button)`
  display: none;
  background-color: '#333333';

  ${media.min.xl`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 0 auto;
    width: 80%;
    font-size: 17px;

    &:hover {
      box-shadow: none;
    }
  `}
`;

const OverflowContainer = styled.div`
  background: white;
  overflow-y: auto;
  max-height: 100%;
  ${media.min.xl`
    max-height: 400px;
  `}
`;

const StyledContainer = styled.div`
  height: 100%;
  position: fixed;
  width: 268px;
  background: white;
  top: 0;
  left: ${props => (props.visible ? '0' : '-300px')};
  transition: all 400ms ease-in;
  z-index: 100;
  box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.24);

  ${media.min.xl`
    background-color: white;
    width: 400px;
    border: 1px solid #e1e0e0;
    border-radius: 5px;
    position: relative;
    display: ${props => (props.visible ? 'block' : 'none')};

    &::before {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      top: -16px;
      left: 30px;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 15px solid #e1e0e0;
    }
    &::after {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      top: -15px;
      left: 30px;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 15px solid white;
    }

  `}
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const StyledTextLink = styled(StyledLink)`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  padding-bottom: 0.5em;

  /* &:hover {
    color: ${path(['theme', 'config', 'header', 'logo', 'color'])};
  } */
`;

const StyledLogo = styled(Logo)`
  display: inline-block;
  width: 55px;
  padding-left: 10px;
  /* margin-bottom: -5px; */
`;

const StyledContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSocialIcons = styled(SocialIcons)`
  margin: 0;
`;

const Background = styled.div`
  position: fixed;
  background: #333333;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
  opacity: 0.8;

  ${media.min.xl`
    display: none;
  `}
`;

const setRef = ({ set, elRef }) => el => {
  if (el !== null && !elRef) set(el);
};

const Menu = ({ visible, toggle, menus, icons, ...props }) => (
  // eslint-disable-next-line
  <div {...props}>
    <Value>
      {({ value: elRef, set }) => (
        // eslint-disable-next-line react/jsx-fragments
        <React.Fragment>
          <StyledContainer visible={visible}>
            <OverflowContainer ref={setRef({ set, elRef })}>
              <StyledHeader>{/* <UserArea /> */}</StyledHeader>
              <MenuVehicles />
              <MenuItems menus={menus} elRef={elRef} />
              <StyledFooter>
                <StyledSocialInfoContainer>
                  <StyledSocialIcons items={icons} />
                  <StyledContactInfo>
                    <StyledTextLink href="https://www.nsccomunicacao.com.br/trabalhe-conosco/#trabalhe-conosco">
                      Trabalhe Conosco
                    </StyledTextLink>
                    <StyledTextLink href="https://www.nsccomunicacao.com.br/contato/#contato">
                      Fale Conosco
                    </StyledTextLink>
                  </StyledContactInfo>
                </StyledSocialInfoContainer>
                <StyledLink href="https://negociossc.com.br">
                  <StyledButton bold>
                    anuncie na <StyledLogo />
                  </StyledButton>
                </StyledLink>
              </StyledFooter>
            </OverflowContainer>
          </StyledContainer>
          {visible && <Background onClick={() => toggle(false)} />}
        </React.Fragment>
      )}
    </Value>
  </div>
);

Menu.propTypes = {
  // eslint-disable-next-line
  menus: PropTypes.array,
  // eslint-disable-next-line
  icons: PropTypes.array,
  // eslint-disable-next-line
  visible: PropTypes.bool,
  // eslint-disable-next-line
  toggle: PropTypes.func,
};

export default Menu;
