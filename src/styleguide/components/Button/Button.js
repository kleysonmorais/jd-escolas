import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as R from 'ramda';

import { color, when } from 'app/styleguide/lib/helpers';
import { fontFamily } from 'app/styleguide/typography';

// eslint-disable-next-line no-shadow
const style = style =>
  when(R.prop(style), props =>
    props.inverse
      ? `color: ${color(style.concat('Background'))(props)};`
      : `
      background-color: '#333333';
      color: ${color(style.concat('TextColor'))(props)};
    `
  );

export const focus = 'box-shadow: 0px 0.15em 0.5em rgba(0, 0, 0, 0.15);';

const Button = styled.button.attrs({ className: 'Button' })`
  display: inline-block;
  margin: 1em 1em 1em 0;
  padding: 1em 1.8em;
  border: none;
  border-radius: 0.2em;
  box-sizing: border-box;
  outline-style: none;
  cursor: pointer;
  text-align: center;

  color: white;
  background-color: #333333;
  text-decoration:none;

  &:hover, &:focus {
    ${focus}
  }

  ${when(
    R.prop('inverse'),
    () => `
      color: ${color('text')};
      background-color: transparent;
      &:hover, &:focus {
        box-shadow: none;
        opacity: 0.75;
      }
    `
  )}

  ${when(
    R.prop('inline'),
    () => `
      margin: 0 1em 0 0;
    `
  )}

  ${when(
    R.prop('disabled'),
    () => `
      cursor: default;
      opacity: 0.3;
      pointer-events: none;
    `
  )}

  ${when(
    R.prop('readOnly'),
    () => `
      cursor: default;
      pointer-events: none;
    `
  )}

  /*
   * Button weight.
   */

  ${when(R.prop('bold'), () => 'font-weight: bold;')}

  /*
   * Button sizes.
   */

  ${when(
    R.prop('tiny'),
    () => 'font-size: 0.85em; padding: .5em 0.75em .25em;'
  )}
  ${when(R.prop('small'), () => 'font-size: 0.85em;')}
  ${when(R.prop('big'), () => 'font-size: 1.4em;')}
  ${when(R.prop('large'), () => 'font-size: 1.6em;')}

  ${when(
    R.prop('lower'),
    () => `
      font-family: ${fontFamily('fontSansTitle')};
      text-transform: lowercase;
      padding: 0.4rem 1rem;
      margin: 0;
    `
  )}

  /*
   * Button styles.
   */

  ${style('primary')}
  ${style('secondary')}
  ${style('danger')}
  ${style('warning')}
  ${style('action')}
  ${style('warmGrey')}

  /*
   * Button SVG icons.
   */

  & svg {
    font-size: 1.4em;
    margin: -0.4em 0 -0.2em;
  }
`;

Button.styled = { focus };

Button.propTypes = {
  // Styles:
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  warning: PropTypes.bool,
  action: PropTypes.bool,
  inverse: PropTypes.bool,

  // Sizes:
  tiny: PropTypes.bool,
  small: PropTypes.bool,
  big: PropTypes.bool,
  large: PropTypes.bool,

  // Weight:
  bold: PropTypes.bool,

  // States:
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default Button;
