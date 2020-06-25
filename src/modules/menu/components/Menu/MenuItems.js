import React from 'react';
import PropTypes from 'prop-types';
import { State } from 'react-powerplug';
import { concat, takeLast, dropLast, unnest, path } from 'ramda';
import styled from 'styled-components';

import { media } from 'app/styleguide/media';
import { fontFamily, fontSize } from 'app/styleguide/typography';

import Icon from 'app/styleguide/components/Icon';
import Link from 'app/lib/Link';

const PADDING = '20px';

const openMenu = ({ state, setState, item, previous, elRef }) => () => {
  elRef.scrollTo({ top: 0, behavior: 'smooth' });
  const addedPrevious = concat(state.previous, [previous]);
  setState({ menus: item.links, previous: addedPrevious });
};

const openPrevious = ({ state, setState }) => () => {
  const activeMenu = unnest(takeLast(1, state.previous));
  const removedPrevious = dropLast(1, state.previous);
  setState({ menus: activeMenu, previous: removedPrevious });
};

const StyledIcon = styled(Icon)`
  fill: #e3dddd;
  height: 20px;
  max-width: 20px;
  margin-right: -8px;
`;

const StyledSubMenu = styled.ul`
  margin: 0;
  padding: 0;
  position: relative;
  background-color: white;
  text-align: left;
`;

const StyledCloseButton = styled.button`
  border: 0;
  background: none;
  font-family: ${fontFamily('fontSans')};
  font-size: ${fontSize('sansM')};
  color: ${path(['theme', 'config', 'header', 'logo', 'color'])};
  font-weight: bold;
  margin: 0;
  padding: ${PADDING};
  svg {
    position: relative;
    left: -10px;
    transform: rotate(180deg);
    fill: ${path(['theme', 'config', 'header', 'logo', 'color'])};
    height: 16px;
    max-width: 16px;
  }
  &:hover {
    cursor: pointer;
  }
  &:focus,
  &:active {
    outline: none;
  }
`;

const StyledMenuItem = styled.li`
  list-style-type: none;
  font-family: ${fontFamily('fontSans')};
  font-size: ${fontSize('sansM')};
  font-weight: bold;
  line-height: 2.5em;
  display: flex;
  align-items: center;
  color: #242526;
  justify-content: space-between;
  padding: 0 ${PADDING};

  &:hover {
    cursor: pointer;
    color: ${path(['theme', 'config', 'header', 'logo', 'color'])};
    background-color: #f5f5f5;
    svg {
      fill: ${path(['theme', 'config', 'header', 'logo', 'color'])};
    }
  }
`;
const StyledMenu = styled.div`
  margin: 0;
  position: relative;
  overflow: hidden;
  padding: ${PADDING} 0;

  ${media.min.xl`
    padding: 5px 0;
  `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MenuItem = ({ item = {}, onClick }) => (
  <StyledMenuItem onClick={onClick}>
    {item.label && item.label.toLowerCase()}
    {item.links && item.links.length > 0 && (
      <StyledIcon name="caretRight" className="caret" />
    )}
  </StyledMenuItem>
);

MenuItem.propTypes = {
  // eslint-disable-next-line
  item: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.func,
};

const SubMenus = ({ menus = [], state, setState, previous, elRef }) => (
  <StyledSubMenu>
    {previous.length > 0 && (
      <StyledCloseButton onClick={openPrevious({ state, setState, menus })}>
        <Icon name="caretRight" className="caret" />
        voltar
      </StyledCloseButton>
    )}
    {menus.map((item, index) =>
      (!item.links || item.links.length <= 0) && item.url ? (
        // eslint-disable-next-line react/no-array-index-key
        <StyledLink href={item.url.path} key={item.label + index}>
          <MenuItem
            elRef={elRef}
            item={item}
            state={state}
            setState={setState}
            previous={menus}
          />
        </StyledLink>
      ) : (
        <MenuItem
          elRef={elRef}
          onClick={openMenu({ state, setState, item, previous: menus, elRef })}
          // eslint-disable-next-line react/no-array-index-key
          key={item.label + index}
          item={item}
          state={state}
          setState={setState}
          previous={menus}
        />
      )
    )}
  </StyledSubMenu>
);

SubMenus.propTypes = {
  // eslint-disable-next-line
  menus: PropTypes.array,
  // eslint-disable-next-line
  state: PropTypes.object,
  // eslint-disable-next-line
  setState: PropTypes.func,
  // eslint-disable-next-line
  previous: PropTypes.array,
  // eslint-disable-next-line
  elRef: PropTypes.object,
};

const MenuItems = ({ menus, elRef }) => (
  <StyledMenu>
    <State initial={{ menus, previous: [] }}>
      {({ state, setState }) => (
        // eslint-disable-next-line react/jsx-fragments
        <React.Fragment>
          <SubMenus
            elRef={elRef}
            previous={state.previous}
            menus={state.menus}
            state={state}
            setState={setState}
          />
        </React.Fragment>
      )}
    </State>
  </StyledMenu>
);

MenuItems.propTypes = {
  // eslint-disable-next-line
  menus: PropTypes.array,
  // eslint-disable-next-line
  elRef: PropTypes.object,
};

export default MenuItems;
