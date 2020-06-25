import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  height: ${props => (props.vH ? props.vH : 100)}vh;
`;

const Card = styled.div`
  background-color: #d9c6bf;
  max-width: ${props => (props.type === 'small' ? '25%' : '')};
  padding: 10px;
  box-shadow: 10px 10px #a6847c;
  font-size: 18px;
  font-family: 'SourceSansPro Light';
  margin: 0px;

  span {
    color: #333333;
    font-family: 'SourceSansPro Bold';

    &.title {
      font-size: 22px;
    }
  }
`;

const CardScroll = ({ children, type = 'small' }) => {
  return (
    <>
      {type === 'small' ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-8" />
            <Card type={type} className="col-4">
              {children}
            </Card>
          </div>
          <Wrap />
        </div>
      ) : (
        <Card className="m-4" type={type}>
          {children}
        </Card>
      )}
    </>
  );
};

export default CardScroll;
