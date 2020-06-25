/**
 * Named colors.
 */

import { path } from 'ramda';

export const scarlet = '#d0021b';
export const fireEngineRed = '#e11b22';
export const watermelon = '#ff4a5d';
export const barbiePink = '#ff4ab6';
export const watermelonTwo = '#ff4863';
export const rustBrown = '#8c3301';
export const rustyOrange = '#dc5713';
export const brightOrange = '#ff6915';
export const lightMossGreen = '#87c86b';
export const darkMint = '#56b979';
export const goblinGreen = '#3E8658';
export const veryLightBlue = '#e3f0ff';
export const brightSkyBlue = '#00c8fe';
export const curiousBlue = '#2ba0d5';
export const lightCeruleanBlue = '#378cf2';
export const jellyBeanBlue = '#2b7aa1';
export const biscayBlue = '#1a4a61';
export const astralBlue = '#3185ab';
export const ceruleanBlue = '#006df1';
export const peacockBlue = '#064da3';
export const azureBlue = '#3466ae';
export const pictonBlue = '#38beef';
export const brightLavender = '#b84aff';
export const iris = '#6c4ac0';
export const butterflyBush = '#675795';
export const razzmatazz = '#D60B51';
export const veryLightPink = '#ffeee4';
export const lightPink = veryLightPink;
export const vividOrange = '#f6a623';
export const darkGray = '#9b9b9b';
export const lightNavy = '#145086';
export const bluish = '#299bd2';
export const thunder = '#362B2C';
export const silver = '#C4C4C4';

export const whiteTwo = '#e1e1e1';
export const VeryLightGray = '#e9e9e9';
export const mediumGrey = '#b1b1b1';
export const lightGrey = '#ebebeb';
export const paleGrey = '#eeeced';
export const pinkishGrey = '#bebebe';
export const warmGrey = '#717171';
export const brownishGrey = '#666666';
export const purplishBrown = '#454344';
export const darkGrey = '#242425';
export const lightPeach = '#f5dccd';
export const treeGreen = '#339c26';
export const sageGreen = '#8ac26b';
export const crimson = '#D31453';
export const seashell = '#F2F1F1';
export const sand = '#F4F4F4';
export const aliceBlue = '#F5FAFF';
export const corn = '#F2BE03';

/**
 * Overriden colors.
 */

export const black = darkGrey;
export const sideBlack = warmGrey;
export const white = 'white';

/**
 * Semantic colors.
 */

export const primaryBackground = brightOrange;
export const secondaryBackground = white;
// export const infoBackground = secondary
// export const successBackground = teal-green
export const dangerBackground = scarlet;
export const warmGreyBackground = warmGrey;
// export const warningBackground = fire-bush
// export const complementaryBackground = fun-green
// export const linkBackground = teal-green
// export const tagBackground = light-sage
// export const shadowBackground =rsed: --mercury

export const primaryColor = brightOrange;
export const secondaryColor = black;

export const primaryTextColor = white;
export const secondaryTextColor = black;
// export const infoColor = secondary
// export const successColor = teal-green
export const dangerColor = white;
export const danger = scarlet;
// export const warningColor = fire-bush
// export const complementaryColor = fun-green
// export const linkColor = teal-green
// export const tagColor = light-sage
// export const shadowColor =rsed: --mercury
export const actionBackground = darkMint;

// CBN Colors
export const cbnColor = fireEngineRed;

/**
 * Functional colors.
 */

export const text = black;

/**
 * Helper colors.
 */
export const color = c => path(['theme', 'colors', c]);
