import { ifElse, pipe, is, objOf, map } from 'ramda';
import { css } from 'styled-components';

import { rename } from 'app/lib/func';

/**
 * Tagged template string to convert screen sizes to pixel units
 */
const px = (strings, ...values) =>
  strings.reduce(
    (result, text, index) =>
      result +
      text +
      // eslint-disable-next-line
      (typeof values[index] !== 'undefined' ? values[index] + 'px' : ''),
    ''
  );

// -----------------------------
// Containers.
// -----------------------------

export const maxWidth = 1260;

export const containers = {
  xs: '100%',
  sm: '100%',
  md: '90%',
  lg: '80%',
  xl: '1260px',
};

export const screens = ['xs', 'sm', 'md', 'lg', 'xl'];

// -----------------------------
// Media points.
// -----------------------------

export const breakpoints = { xs: 0, sm: 480, md: 768, lg: 996, xl: 1200 };

// eslint-disable-next-line
export const breakpoint = breakpoint => breakpoints[breakpoint];

/*
 * React-Grid-Layout uses parental width to determine "breakpoint" (aka
 * element-query breakpoint), thus making the grid very confusing when
 * partitioning. It is simply easier to allow for 12 columns on whatever
 * width provided.
 */
export const columns = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 };

export const ranges = {
  xs: { min: breakpoint('xs'), max: breakpoint('sm') - 1 },
  sm: { min: breakpoint('sm'), max: breakpoint('md') - 1 },
  md: { min: breakpoint('md'), max: breakpoint('lg') - 1 },
  lg: { min: breakpoint('lg'), max: breakpoint('xl') - 1 },
  xl: { min: breakpoint('xl'), max: Infinity },
};

// -----------------------------
// Breakpoints
// -----------------------------

export const queries = {
  only: {
    xs: px`(min-width: ${ranges.xs.min}) and (max-width: ${ranges.xs.max})`,
    sm: px`(min-width: ${ranges.sm.min}) and (max-width: ${ranges.sm.max})`,
    md: px`(min-width: ${ranges.md.min}) and (max-width: ${ranges.md.max})`,
    lg: px`(min-width: ${ranges.lg.min}) and (max-width: ${ranges.lg.max})`,
    xl: px`(min-width: ${ranges.xl.min})`,
  },

  min: {
    xs: px`(min-width: ${ranges.xs.min})`,
    sm: px`(min-width: ${ranges.sm.min})`,
    md: px`(min-width: ${ranges.md.min})`,
    lg: px`(min-width: ${ranges.lg.min})`,
    xl: px`(min-width: ${ranges.xl.min})`,
  },

  max: {
    xs: px`(max-width: ${ranges.xs.max})`,
    sm: px`(max-width: ${ranges.sm.max})`,
    md: px`(max-width: ${ranges.md.max})`,
    lg: px`(max-width: ${ranges.lg.max})`,
    xl: null,
  },
};

/**
 * Helper methods to construct media queries.
 *
 * Usage:
 *
 * const MyComp = styled.div.attrs({ className: 'MyComp' })`
 *   width: 100px;
 *   ${media.min.sm`width: 200px;`}
 * `
 *
 * @see: https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md#media-templates
 * @see: https://www.styled-components.com/docs/advanced#media-templates
 */
export const media = Object.keys(queries).reduce(
  (result, kind) => ({
    ...result,
    [kind]: Object.keys(queries[kind]).reduce(
      // eslint-disable-next-line
      (result, size) => ({
        ...result,
        [size]: (...args) => css`
          @media screen and ${queries[kind][size]} {
            ${css(...args)}
          }
        `,
      }),
      {}
    ),
  }),
  {}
);

// -----------------------------
// React Container Query helpers
// -----------------------------

const size = n => (maxWidth / columns.xl) * n;

const parseElementQuery = ifElse(
  is(Number),

  // Use number as min-width (after sized to column system).
  pipe(size, objOf('minWidth')),

  // Map each value to column system, and rename to fit ContainerQuery needs.
  pipe(map(size), rename('min', 'minWidth'), rename('max', 'maxWidth'))
);

/**
 * Creates an element query as expected by react-container-query/ContainerQuery
 * component.
 *
 * @param {Object} query Element query prop map.
 * @param {Number|Object} query[prop] Either a number, to use as min-width option,
 *                                    or an object, as follows:
 * @param {Number} query[prop].min Minimum width query.
 * @param {Number} query[prop].max Maximum width query.
 *
 * All numbers provided are column amounts based on the XL container size (@see size).
 *
 * i.e.:
 * - elementQuery({ foo: 2 }) // { foo: { minWidth: 200 } }
 * - elementQuery({ foo: 2, bar: 1 }) // { foo: { minWidth: 200 }, bar: { minWidth: 100 } }
 * - elementQuery({ foo: { min: 3 } }) // { foo: { minWidth: 300 } }
 *
 * @return {Object} Map of element queries.
 */
export const elementQuery = map(parseElementQuery);
