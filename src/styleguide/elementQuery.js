/**
 * Element query helpers for styled-components.
 *
 * The system is based on the columns sizes relative to the biggest possible container
 * on the site (1020px). Basically, one element query unit stands for 1 * (1020 / 12),
 * meaning if you need a query to match something arround (> 500px) you should use
 * 6 units (6 * (1020 / 12) = 510px).
 *
 * This file also holds some helpers to facilitate styling using element queries,
 * such as things to style based on parent node's element queries.
 */

import { lifecycle, hoistStatics } from 'recompose';
import { ElementQueries } from 'css-element-queries';
import { css } from 'styled-components';
import { maxWidth, columns } from './media';

import debounce from 'lodash.debounce';

const refreshElementQuery = debounce(ElementQueries.init, 250);

/**
 * Higher-Order Component to attach element query listeners to a component.
 *
 * css-element-queries polyfill can be initiated as many times as needed, and it will
 * be repsonsible for attaching element query attributes to the DOM nodes, thus
 * activating element query selectors. Everytime it gets initiated, it will traverse
 * CSS rules to find element query selectors, then it will find related DOM nodes and
 * start listening to their resizing events. Keep the usage of withElementQuery as
 * restricted as possible, so not to harm performance. Add it only to parental
 * components, when possible. Child components might use elementQuery function to
 * react to it's parent's.
 *
 * @return {Component} React component.
 */
export const withElementQuery = hoistStatics(
  lifecycle({
    componentDidMount() {
      refreshElementQuery();
    },
  })
);

/**
 * Element query calculator.
 *
 * Provided "n" query units, calculate the equivalent size in pixels based on a
 * relative maxWidth and the biggest grid's amount of columns.
 *
 * This is mostly not supposed to be used directly, but by this element query system.

 * Usage:
 * ```
 * const StyledComponent = styled.div.attrs({ className: 'StyledComponent' })`
 *   width: ${elementQuery.size(6)}
 * `
 * ```
 *
 * @param {Number} n Size in query units (columns of xl).
 * @return {Number} the element query size in pixels.
 */
export const size = n => (maxWidth / columns.xl) * n;

/**
 * Element query CSS generator for a minimum-width based query.
 *
 * Usage:
 * ```
 * const StyledComponent = styled.div.attrs({ className: 'StyledComponent' })`
 *   &${elementQuery.min(6)} {
 *     background-color: blue;
 *   }
 * `
 * ```
 *
 * @param {Number} n Size in query units (columns of xl).
 * @param {String} [selector] Optional selector for the affected element.
 * @return {String} Element query attribute.
 */
export const min = n => `[min-width~="${size(n)}px"]`;

/**
 * Element query CSS generator for a maximum-width based query.
 *
 * Usage:
 * ```
 * const StyledComponent = styled.div.attrs({ className: 'StyledComponent' })`
 *   &${elementQuery.max(6)} {
 *     background-color: blue;
 *   }
 * `
 * ```
 *
 * @param {Number} n Size in query units (columns of xl).
 * @param {String} [selector] Optional selector for the affected element.
 * @return {String} Element query attribute.
 */
export const max = n => `[max-width~="${size(n)}px"]`;

/**
 * Helpers to enable (install) element query tracking. Basically, it will
 * create a full element query but with an invalid CSS rule.
 *
 * A common use case is when a conditionally mounted child component need to adapt
 * to it's parent's size. In that case, the parent component must install element query
 * using withElementQuery, and must also pre-configure element queries to start
 * the listener. The child, then, can make it's styled based on the parent element
 * query, using the elementQuery helper below.
 *
 * Usage:
 * ```
 * const StyledComponent = styled.div.attrs({ className: 'StyledComponent' })`
 *   ${elementQuery.enable.min(6)}
 * `
 * ```
 *
 * @prop {Function} min Enables min-based element query.
 * @prop {Function} max Enables max-based element query.
 */
export const enable = {
  min: n => `${min(n)}{element-query:true;}`,
  max: n => `${max(n)}{element-query:true;}`,
};

/**
 * Factory for StyledComponent relative element query CSS generators.
 *
 * This facilitates a child component to respond to it's parent's size throught
 * element queries.
 *
 * Usage:
 * ```
 * const StyledComponent = styled.div.attrs({ className: 'StyledComponent' })`
 *   &${elementQuery.enable.min(6)}
 * `
 *
 * const ChildStyledComponent = styled.div.attrs({ className: 'ChildStyledComponent' })`
 *   ${elementQuery(StyledComponent).min(6)} & {
 *     background-color: blue;
 *   }
 * `
 * ```
 *
 * @param {React.Component} A styled-component React component.
 * @return {Object} A suite of generatores relative to a given StyledComponent.
 * @return {Function} return.min Pre-configured version of min.
 * @return {Function} return.max Pre-configured version of max.
 */
export const elementQuery = StyledComponent => ({
  min: n => css`${StyledComponent}${min(n)}`,
  max: n => css`${StyledComponent}${max(n)}`,
});

elementQuery.size = size;
elementQuery.min = min;
elementQuery.max = max;
elementQuery.enable = enable;

export default elementQuery;
