import * as R from 'ramda';

export const normalizeItem = ({ label, url, links, newTab }) => ({
  label,
  url: url ? url.path : '',
  links: R.not(R.isNil(links)) ? R.map(normalizeItem, links) : null,
  newTab,
});

export const normalizeMenu = R.pipe(
  R.propOr([], 'links'),
  R.map(normalizeItem)
);
