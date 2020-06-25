import styled from 'styled-components';

import {
  GRID_SPACING_MOBILE,
  GRID_SPACING_DESKTOP,
} from 'app/styleguide/lib/constants';
import { media, containers } from '../media';

// @TODO: fluid containers?
export default styled.div.attrs({ className: 'container-principal' })`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  padding-left: ${GRID_SPACING_MOBILE};
  padding-right: ${GRID_SPACING_MOBILE};

  ${media.min.md`
    padding-left: ${GRID_SPACING_DESKTOP};
    padding-right: ${GRID_SPACING_DESKTOP};
  `}

  ${media.min.xs`max-width: ${containers.xs}`}
  ${media.min.sm`max-width: ${containers.sm}`}
  ${media.min.md`max-width: ${containers.md}`}
  ${media.min.lg`max-width: ${containers.lg}`}
  ${media.min.xl`max-width: ${containers.xl}`}

  & & {
    padding-left: 0;
    padding-right: 0;
  }
`;
