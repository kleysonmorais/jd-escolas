import {
  compose,
  curry,
  replace,
  pipe,
  omit,
  reduce,
  assoc,
  keys,
  prepend,
  complement,
  map,
  remove,
  insert,
  ifElse,
  always,
  not,
  isEmpty,
  match,
  __,
  juxt,
  isNil,
  identity,
  pathOr,
  test,
  concat,
} from 'ramda';

/**
 * Empty function. Commonly used for default func properties.
 */
export const noop = () => {};

/**
 * Higher-order function to stop event propagations.
 */
export const stopPropagation = fn => (event, ...args) => {
  if (event) event.stopPropagation();
  return fn ? fn(event, ...args) : undefined;
};

/**
 * Higher-order function to prevent event handler defaults.
 */
export const preventDefault = fn => (event, ...args) => {
  if (event) event.preventDefault();
  return fn ? fn(event, ...args) : undefined;
};

/**
 * Helper method to both stop propagation and prevent default for event handlers.
 */
export const finishEvent = compose(stopPropagation, preventDefault);

/**
 * Renames a property on a given object.
 *
 * @param {String} from Original property name.
 * @param {String} to New property name.
 * @param {Object} object The object to apply the renaming.
 * @return {Object} return The resulting object.
 */
export const rename = curry((from, to, obj) =>
  obj ? omit([from], { ...obj, [to]: obj[from] }) : obj
);

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @sig {a: b} -> {a: *} -> {b: *}
 */
export const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj))
);

/**
 * Create a key on object based on the function result.
 *
 * @param {String} key The name of the prop you want to fill.
 * @param {Function} fn The mapper wich will return your prop.
 */
export const createKey = curry((key, fn, obj) => assoc(key, fn(obj), obj));

/**
 * Function version of throw, to facilitate composition.
 *
 * @param {Object} err Object (usually an error) to bw thrown.
 * @throws {Object} err.
 */
export const launch = err => {
  throw err;
};

/**
 * Rethrow composition helper.
 *
 * @param {Function} fn Function to call.
 * @param {Error} err Thrown error.
 * @return void
 */
export const rethrow = pipe(prepend(__, [launch]), juxt);

/**
 * Flatten an object's prop.
 * @param {String} prop.
 * @param {Object} object.
 * @return {Object} object.
 */
export const flatten = curry((prop, { [prop]: toFlatten, ...object }) => ({
  ...object,
  ...toFlatten,
}));

/**
 * Executes an array of functions with on value
 * @param {Function[]} An array of functions
 * @param {*} The value for the functions
 */
export const applyArr = curry((arr, val) => map(a => a(val), arr));

/**
 * Opposite version of isNil from Ramda.
 */
export const isNotNil = complement(isNil);

/**
 * Check if code is running on the client.
 *
 * If process is available (Next), check if it has a property "browser".
 * Otherwise, check if a window object is available.
 */
export const isClient = () =>
  typeof process !== 'undefined'
    ? !!process.browser
    : typeof window !== 'undefined';

/**
 * Check if code is running on the server.
 */
export const isServer = complement(isClient);

/**
 * Check if code is running on production mode.
 */
export const isProduction = () =>
  typeof process !== 'undefined' && process.env.NODE_ENV === 'production';

/**
 * Check if code is running on development mode.
 */
export const isDevelopment = complement(isProduction);

/**
 * Check if code is running on stage + production mode.
 * @TODO Maybe we should have another ENV variable for this.
 */
export const isStage = () =>
  isProduction() &&
  // eslint-disable-next-line
  process.env.hasOwnProperty('APP_HOST') &&
  !process.env.APP_HOST.match(/nsctotal\.com\.br/);

export const getGraphqlHost = (forceCDN = false) => {
  if (isServer() && !forceCDN) return process.env.GRAPHQL_HOST;

  if (isServer() && forceCDN) {
    // eslint-disable-next-line
    return process.env.hasOwnProperty('GRAPHQL_HOST_CDN')
      ? process.env.GRAPHQL_HOST_CDN
      : process.env.GRAPHQL_HOST;
  }

  return window.env.GRAPHQL_HOST;
};

/**
 * Reorder an array of items by indexes.
 * @param {Integer} sourceIndex
 * @param {Integer} destinationIndex
 * @param {Array} items
 *
 * @example: reorderArray(1, 0, ['a', 'b', 'c']) // ['b', 'a', 'c']
 */
export const reorderArray = curry((sourceIndex, destinationIndex, items) => {
  const item = items[sourceIndex];
  return pipe(remove(sourceIndex, 1), insert(destinationIndex, item))(items);
});

/**
 * Path normalizer
 * @param {String} pathname
 *
 * @example:
 *  - normalizePagePath('/florianopolis/') // '/florianopolis'
 *  - normalizePagePath('/florianopolis#title1') // '/florianopolis'
 *  - normalizePagePath('/florianopolis?title=hi') // '/florianopolis'
 */
export const normalizePagePath = compose(
  pipe(
    replace(/((\?|#).*)/, ''),
    replace(/\/+$/, ''),
    ifElse(isEmpty, always('/'), identity)
  )
);

/**
 * Returns the index of a sub-list in another list.
 * @param {Array} subList Sub-list to search inside list.
 * @param {Array} list List to be search on.
 * @return {Function} Predicate.
 */
export const arrayIndex = curry((subList, list) => {
  const subListStr = subList.join('__DOT__');
  const listStr = list.join('__DOT__');
  const index = listStr.indexOf(subListStr);

  if (index === -1) return -1;

  return index === -1
    ? -1
    : list.length - listStr.substr(index).split('__DOT__').length;
});

/**
 * Helps to know if a string matches with a regex pattern.
 * Good to use with `cond()` function to do pattern matching.
 */
export const matches = regex => (text = '') =>
  compose(not, isEmpty, match(regex))(text);

export const validHttps = url =>
  test(/https/)(url) ? url : concat('https:')(url);

export const existHttp = url =>
  test(/^http[^s]/)(url) ? replace(/http/, 'https')(url) : validHttps(url);

/**
 * Returns the url with https.
 * @param {String} url.
 * @return {String} The url normalized.
 */

export const setMainImageHttpToHttps = pipe(
  pathOr('https://www.nsctotal.com.br/leia_no_nsc_total.jpg', [
    'derivative',
    'url',
  ]),
  existHttp
);

/**
 * Get the entity Name from a EntityField array.
 *
 * @param values
 * @returns {Array}
 */
export const getEntityFieldItemsName = values => {
  const itemList = [];
  values.map(value => itemList.push(value.entity.name));
  return itemList;
};

export const slugify = str => {
  return (
    str
      .toString()
      .toLowerCase()
      .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')
      .replace(/[èÈéÉêÊëË]+/g, 'e')
      .replace(/[ìÌíÍîÎïÏ]+/g, 'i')
      .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')
      .replace(/[ùÙúÚûÛüÜ]+/g, 'u')
      .replace(/[ýÝÿŸ]+/g, 'y')
      .replace(/[ñÑ]+/g, 'n')
      .replace(/[çÇ]+/g, 'c')
      .replace(/[ß]+/g, 'ss')
      .replace(/[Ææ]+/g, 'ae')
      .replace(/[Øøœ]+/g, 'oe')
      .replace(/[%]+/g, 'pct')
      .replace(/\s+/g, '-')
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-]+/g, '')
      // eslint-disable-next-line no-useless-escape
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  );
};

export const getBasePathFromUrl = url => {
  // eslint-disable-next-line
  const [scheme, _, host] = url.split('/');
  return `${scheme}//${host}`;
};

/**
 * Add CDN image parameters to an image url.
 * Ex.:
 *
 * @example:
 *  - optimizeImage('https://site.com/static/image.png', { width: 100, height: 100 })
 *    // 'https://site.com/cdn-cgi/image/static/image.png?width=100&height=100'
 *
 * @param {String} url Source image.
 * @param {Object} params CDN image params // https://docs.fastly.com/api/imageopto/
 * @returns {String}
 */
export const optimizeImage = (url, params = {}) => {
  if (!url) return '';

  const options = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  const [, queryString] = url.match(/[^?]+(\?.*)?/);

  if (!options || options === '') return url;

  return !queryString || queryString === ''
    ? [url, options].join('?')
    : [url, options].join('&');
};
