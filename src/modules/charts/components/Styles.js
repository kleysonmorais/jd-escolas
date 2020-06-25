import styled from 'styled-components';

export const CardCustom = styled.div`
  ${prop => (prop.displayChart ? 'visibility: hidden;' : '')}

  &.container {
    padding: 16px;
  }
`;
