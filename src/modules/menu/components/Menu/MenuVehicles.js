import React from 'react';
import { Toggle } from 'react-powerplug';
import styled, { css } from 'styled-components';

import { media } from 'app/styleguide/media';

import Icon from 'app/styleguide/components/Icon';
import ChannelLogo from 'app/styleguide/components/Logo/ChannelLogo';
import Link from 'app/lib/Link';

const StyledJournalIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: ${props => (props.open ? '200px' : '59px')};
  transition: 250ms ease;
  overflow: hidden;
  justify-content: end;
  padding-bottom: 1em;
`;

const StyledJournalLinks = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  ${media.min.xl`
    display: none;
  `}
`;

const StyledNetworkLogo = styled(ChannelLogo)`
  width: 49px;
  max-height: 40px;
`;

const StyledJournalIcon = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.background};
  width: calc(100% / 4 - 5px);
  height: 56px;
  margin-top: 10px;
  border-radius: 5px;
  margin-right: 0.25em;
  padding: 0.25em;
  box-sizing: border-box;
`;

const StyledCaret = styled(Icon)`
  fill: #b2b2b2;
  ${props =>
    props.invert &&
    css`
      transform: rotate(180deg);
    `}
  height: 12px;
  max-width: 12px;
  margin-left: 3px;
  margin-bottom: -7px;
  padding: 5px;
`;

const StyledTextButton = styled.button`
  border: none;
  background-color: inherit;
  padding: 1em;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #b2b2b2;
  margin: 0 auto;
  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

const MenuVehicles = () => (
  <Toggle initial={false}>
    {({ on, toggle }) => (
      <StyledJournalLinks>
        <StyledJournalIconsContainer open={on}>
          <StyledJournalIcon
            href="https://www.nsctotal.com.br/dc"
            background="linear-gradient(180deg, #006DF1 0%, #00C8FE 100%)"
          >
            <StyledNetworkLogo channel="dc" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://www.nsctotal.com.br/home"
            background="linear-gradient(180deg, #FF4C58 0%, #FF6818 100%)"
          >
            <StyledNetworkLogo channel="nsc" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://www.nsctotal.com.br/santa"
            background="linear-gradient(180deg, #006DF1 0%, #00C8FE 100%)"
          >
            <StyledNetworkLogo channel="santa" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://www.nsctotal.com.br/an"
            background="linear-gradient(180deg, #006DF1 0%, #00C8FE 100%)"
          >
            <StyledNetworkLogo channel="an" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://www.nsctotal.com.br/hora-sc"
            background="linear-gradient(180deg, #339C26 0%, #8AC26B 100%)"
          >
            <StyledNetworkLogo channel="hora" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://www.nsctotal.com.br/cbn"
            background="#E11B22"
          >
            <StyledNetworkLogo channel="cbn_diario" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://www.itapemafm.com.br"
            background="#0095CC"
          >
            <StyledNetworkLogo channel="itapema_fm" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://www.revistaversar.com.br"
            background="#FFBA2C"
          >
            <StyledNetworkLogo channel="versar" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://radioglobo.globo.com/"
            background="linear-gradient(180deg, #ED8025 0%, #B62765 100%)"
          >
            <StyledNetworkLogo channel="radio_globo" variation="white" />
          </StyledJournalIcon>
          <StyledJournalIcon
            href="https://clubensc.com.br"
            background="linear-gradient(114.49deg, #621D78 16.86%, #AF3549 82.85%)"
          >
            <StyledNetworkLogo channel="clube" variation="white" />
          </StyledJournalIcon>
        </StyledJournalIconsContainer>
        <StyledTextButton onClick={toggle}>
          {on ? <span>ocultar</span> : <span>mostrar</span>}
          <StyledCaret name="caretDown" className="caret" invert="false" />
        </StyledTextButton>
      </StyledJournalLinks>
    )}
  </Toggle>
);

export default MenuVehicles;
