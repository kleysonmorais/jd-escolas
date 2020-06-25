import {
  path,
  pathSatisfies,
  complement,
  isNil,
  curry,
  ifElse,
  always,
  pathOr,
} from 'ramda';

/**
 * Getter for a theme color.
 * @param {String} color The color name to get.
 * @return {String} The color value.
 */
export const color = cl => path(['theme', 'colors', cl]);

/**
 * Helper to return something when predicates true and NULL otherwise.
 * @param {Function} predicate Testing predicate.
 * @param {Object} predicate.props Streamed properties.
 * @param {Boolean} predicate.return Whether or not we should apply whenTrue.
 * @param {Function|String} whenTrue Either a value to return when predicate validates true or
 *                                   a getter for this value.
 * @param {Object} [whenTrue.props] Streamed properties, in case whenTrue is a function.
 * @return {String} The value to insert, or null.
 */
export const when = curry((predicate, whenTrue) =>
  ifElse(
    predicate,
    typeof whenTrue === 'function' ? whenTrue : always(whenTrue),
    always(null)
  )
);

export const hasThemeContext = path_ =>
  pathSatisfies(complement(isNil), ['theme', 'context'].concat(path_));

const channelMap = {
  an: 'an',
  cbn_diario: 'cbn_diario',
  dc: 'dc',
  hora: 'hora_de_sc',
  hora_de_sc: 'hora_de_sc',
  nsc: 'nsc',
  santa: 'santa',
  versar: 'versar',
  clube: 'clube',
  itapema_fm: 'itapema_fm',
  radio_globo: 'radio_globo',
};

/**
 * Gets a channel logo given a channel name and a variation.
 *
 * @param {an|cbn_diario|dc|hora|hora_de_sc|itapema_fm|nsc|santa} channel
 * @param {color|white} variation
 */
export const getChannelLogoPath = (channel, variation) => {
  if (!channel || !variation) return null;

  const channelFile = channelMap[channel];

  if (!channelFile) return null;

  const newPath = ['logos', variation, channelFile];

  return '/'.concat(newPath.join('/')).concat('.svg');
};

/**
 * Gets channel id given a theme object.
 *
 * @param {Object} theme
 */
export const channelIdFromTheme = pathOr('', ['config', 'id']);
