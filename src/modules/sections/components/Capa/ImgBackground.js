import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  height: ${prop => (prop.height ? prop.height : 100)}vh;
  background: url('${prop => prop.img}') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: grayscale(100%);
    background: rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 60%,
      #333333
    );
  }
`;

const ImgBackground = prop => (
  <Background img={prop.img} height={prop.height}>
    {prop.children}
  </Background>
);

export default ImgBackground;
