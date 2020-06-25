import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import Link from 'next/link';
import { ImageFile } from 'app/modules/SinglePage/pages/styles';
import { media } from 'app/styleguide/media';

const Wrap = styled.div`
  background: white;
  position: relative;
  text-align: left;

  &.section-two {
    background: #f5f5f5;

    p,
    h3 {
      text-align: left;
    }
  }
`;

const WrapNews = styled(Row)`
  height: 100%;
  padding: 6% 0%;

  ${media.min.xl`
    height: 95vh;
    padding: 5%;
  `}
`;

const Text = styled.p`
  font-size: 18px;
  padding: 0% 5%;

  ${media.min.xl`
    font-size: 20px;
    padding: 0%;
  `}
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  padding: 0% 5%;
  text-transform: uppercase;

  ${media.min.xl`
    padding: 0%;
  `}
`;

const ButtomMain = styled.a`
  background-color: #c9463c;
  border: none;
  color: white !important;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5% 5%;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'SourceSansPro Bold';

  ${media.min.xl`
     margin: 4px 2px;
  `}
`;

const Item = ({ webLayout, item }) => {
  return (
    <Wrap className={item.classType} webLayout={webLayout}>
      <div className="container-fluid">
        <WrapNews>
          <div
            className={`my-auto text-right col-xs-12 col-sm-6 ${item.classType ===
              '' &&
              webLayout &&
              'order-last'}`}
          >
            <ScrollAnimation animateOnce delay={100} animateIn="fadeIn">
              <ImageFile width={100} src={item.img} alt="Escola Fechando" />
            </ScrollAnimation>
          </div>
          <div className="clearfix visible-xs" />
          <div
            className={`my-auto pt-4 col-xs-12 col-sm-6 ${item.classType ===
              '' &&
              webLayout &&
              'order-first text-right'}`}
          >
            <ScrollAnimation animateOnce delay={100} animateIn="fadeIn">
              <Title>{item.title}</Title>
              <Text>{item.text}</Text>
              <Link href={item.link}>
                <ButtomMain type="button">Ir para reportagem</ButtomMain>
              </Link>
            </ScrollAnimation>
          </div>
        </WrapNews>
      </div>
    </Wrap>
  );
};

export default Item;
