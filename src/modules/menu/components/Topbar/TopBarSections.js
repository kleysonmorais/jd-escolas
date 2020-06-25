import React from 'react';
import styled from 'styled-components';
import { media } from 'app/styleguide/media';
import ContainerBase from 'app/styleguide/components/Container';
import { SECOND_COLOR } from 'app/modules/SinglePage/pages/styles';

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: ${SECOND_COLOR};
  -webkit-box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.5);

  overflow: auto;
  white-space: nowrap;

  ${media.min.xl`
      height: 85px;
    `}
`;

const StyledContainer = styled(ContainerBase)`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const TopBarSections = props => {
  const { children } = props;
  return (
    <StyledHeader>
      <StyledContainer>{children}</StyledContainer>
    </StyledHeader>
  );
};

// TopBarSections.propTypes = {
//   children: PropTypes.string.isRequired,
// };

export default TopBarSections;
