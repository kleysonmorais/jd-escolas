import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';

const ColFrame = styled.div`
  margin: 3%;
  height: 300px;
`;

const Title = styled.h2`
  font-weight: bold;
  color: white;
`;

const Text = styled.p`
  color: white;
`;

const Image = styled.img`
  width: 100%;
`;

const Item = () => (
  <>
    <Container>
      <Row>
        <Col>
          <ColFrame>
            <Image src="/img1.svg" />
          </ColFrame>
        </Col>
        <Col>
          <ColFrame>
            <Title>See what happend in Brasil since 2007</Title>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </Text>
          </ColFrame>
        </Col>
      </Row>
    </Container>
  </>
);

export default Item;
