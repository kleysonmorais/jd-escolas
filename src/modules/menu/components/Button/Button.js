import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  display: inline-block;
  padding: 0;
  margin-right: 2rem;
  border: 0;
  box-sizing: border-box;
  background: none;
  vertical-align: middle;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  i {
    display: block;
    width: 20px;
    height: 2px;
    background: white;
  }

  i + i {
    margin-top: 5px;
  }
`;

const Button = ({ onClick, className }) => (
  <StyledButton onClick={onClick} className={className}>
    <i />
    <i />
    <i />
  </StyledButton>
);

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: undefined,
  className: undefined,
};

export default Button;
