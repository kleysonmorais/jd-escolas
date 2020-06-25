import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const TitleWeb = styled.h1`
  right: 24%;
  left: 21%;
  top: 71%;
  font-size: 90px;

  @media only screen and (max-width: 600px) {
    & {
      right: 4%;
      left: 30%;
      top: 54%;
      font-size: 70px;
    }
  }
`;

const TitleCapa = ({ className, children }) => {
  return (
    <Container>
      <TitleWeb className={className}>{children}</TitleWeb>
    </Container>
  );
};

TitleCapa.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default TitleCapa;
