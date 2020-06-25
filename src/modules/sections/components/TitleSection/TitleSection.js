import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  color: #ff6915;
  font-weight: bold;
  margin: 2%;

  @media only screen and (max-width: 600px) {
    & {
      font-size: 1.8rem;
      margin: 8%;
    }
  }
`;

const TitleSection = prop => (
  <Section>
    <Title>{prop.title}</Title>
  </Section>
);

export default TitleSection;
