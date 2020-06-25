import { path } from 'ramda';

export default {
  // Families.
  fontSans: '"Source Sans Pro", sans',
  fontSerif: '"Source Serif Pro", serif',
  fontSansTitle: '"Roboto", "Source Sans Pro", sans',

  // Sizes.
  sansXXL: '140px',
  sansGGG: '42px',
  sansGG: '32px',
  sansGI: '30px',
  sansG: '24px',
  sansI: '20px',
  sansM: '18px',
  sansAltP: '16px',
  sansP: '13px',
  sansMicro: '12px',

  serifG: '18px',
  serifM: '16px',
  serifP: '13px',

  base: '16px',

  h1: '1.75rem',
  h2: '1.5rem',
  h3: '1.25rem',
  h4: '1.15rem',
  h5: '1rem',
  h6: '1rem',

  lg: {
    h1: '3.25rem',
    h2: '2rem',
    h3: '1.6rem',
    h4: '1.2rem',
    h5: '1rem',
    h6: '1rem',
  },
};

export const fontSize = (size, breakpoint) =>
  path(
    breakpoint
      ? ['theme', 'typography', breakpoint, size]
      : ['theme', 'typography', size]
  );

export const fontFamily = font => path(['theme', 'typography', font]);
