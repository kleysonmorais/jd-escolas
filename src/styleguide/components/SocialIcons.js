import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { path, concat } from 'ramda';

import { actionBackground } from 'app/styleguide/colors';

import Icon from 'app/styleguide/components/Icon';

const StyledDiv = styled.div.attrs({ className: 'StyledDiv' })`
  display: inline-block;
  margin: 0 auto;
  text-align: center;
`;

export const StyledIcon = styled(Icon).attrs({ className: 'StyledIcon' })`
  width: auto;
  fill: ${path(['theme', 'fill'])};
  height: ${path(['theme', 'height'])};
  vertical-align: middle;
`;

export const StyledAnchor = styled.a.attrs({ className: 'StyledAnchor' })`
  display: inline-block;
  height: 32px;
  width: 32px;
  margin: 0 auto;
  border-radius: 50%;
  line-height: 1.75em;
  text-align: center;
  background-color: ${path(['theme', 'background'])};
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

const themeConfig = ['theme', 'config', 'components', 'socialIcons'];

const themes = {
  default: {
    height: '18px',
    fill: path(concat(themeConfig, ['default', 'fill'])),
    hover: {
      fill: path(concat(themeConfig, ['default', 'hover', 'fill'])),
    },
  },
  primaryCircle: {
    height: '16px',
    fill: path(concat(themeConfig, ['primaryCircle', 'fill'])),
    background: path(concat(themeConfig, ['primaryCircle', 'background'])),
    hover: {
      fill: path(concat(themeConfig, ['primaryCircle', 'hover', 'fill'])),
      background: path(
        concat(themeConfig, ['primaryCircle', 'hover', 'background'])
      ),
    },
  },
  inverseLink: {
    height: '18px',
    fill: path(concat(themeConfig, ['inverseLink', 'fill'])),
    hover: {
      fill: path(concat(themeConfig, ['inverseLink', 'hover', 'fill'])),
      background: path(
        concat(themeConfig, ['inverseLink', 'hover', 'background'])
      ),
    },
  },
  primaryLink: {
    height: '18px',
    fill: path(concat(themeConfig, ['primaryLink', 'fill'])),
    hover: {
      fill: path(concat(themeConfig, ['primaryLink', 'hover', 'fill'])),
    },
  },
  primaryLinkGreen: {
    height: '18px',
    fill: actionBackground,
    hover: {
      fill: actionBackground,
    },
  },
};

// eslint-disable-next-line
const getTheme = theme => (themes[theme] ? themes[theme] : themes['default']);

export const SocialIcon = ({ url, name, theme, className, ...props }) => (
  <ThemeProvider theme={getTheme(theme)}>
    {/* eslint-disable-next-line */}
    <StyledAnchor href={url} target="_blank" className={className} {...props}>
      <StyledIcon name={name} />
    </StyledAnchor>
  </ThemeProvider>
);

SocialIcon.propTypes = {
  // eslint-disable-next-line react/require-default-props
  url: PropTypes.string,
  // eslint-disable-next-line
  name: PropTypes.string,
  // eslint-disable-next-line
  theme: PropTypes.string,
  // eslint-disable-next-line
  className: PropTypes.string,
};

const SocialIcons = ({ items, theme, className }) => (
  <StyledDiv className={className}>
    {items.map((item, i) => (
      <SocialIcon
        href={item.url}
        name={item.name}
        theme={theme}
        // eslint-disable-next-line
        key={`${item.url}-${i}`}
      />
    ))}
  </StyledDiv>
);

SocialIcons.propTypes = {
  // eslint-disable-next-line
  className: PropTypes.string,
  // eslint-disable-next-line
  theme: PropTypes.string,
  // eslint-disable-next-line
  items: PropTypes.array,
};

SocialIcons.defaultProps = {
  items: [],
  // eslint-disable-next-line
  inverse: false,
};

export default styled(SocialIcons).attrs({ className: 'SocialIcons' })``;
