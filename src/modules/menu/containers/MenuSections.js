import React from 'react';
import styled from 'styled-components';
import { SECOND_COLOR } from 'app/modules/SinglePage/pages/styles';

const WrapFixed = styled.div`
  background-color: ${SECOND_COLOR};
  padding: 0% 5%;
  width: 100%;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;

  li a {
    padding: 15px 25px;
    color: #333333;
    display: block;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    font-size: 19px;

    &.active {
      color: #c9463c;
    }

    &.home {
      font-size: 22px;
    }
  }

  li a:hover {
    color: #c9463c;
    cursor: pointer;
  }

  li a.pipe {
    color: #333333;
    cursor: default;
  }
`;

const Menu = styled(List)`
  display: flex;
  justify-content: center;
`;

const MenuSections = props => {
  const { children } = props;
  return (
    <WrapFixed className="container">
      <div className="row">
        <Menu>{children}</Menu>
      </div>
    </WrapFixed>
  );
};

// MenuSections.propTypes = {
//   children: PropTypes.string.isRequired,
// };

export default MenuSections;
