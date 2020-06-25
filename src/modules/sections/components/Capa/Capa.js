import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ImgBackground from './ImgBackground';
import TitleCapa from '../TitleCapa/TitleCapa';

const Title = styled(TitleCapa)`
  position: absolute;
  /* font-weight: bold; */
  bottom: 2%;
  color: white;
`;

const ButtomMain = styled.button`
  background-color: #c9463c;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  position: absolute;
  right: 24%;
  left: 21%;
  top: 82%;
  cursor: pointer;
`;

const Capa = () => {
  const { t } = useTranslation();
  return (
    <>
      <ImgBackground img="imgs/img1.jpeg">
        <Title>{t('titulo home')}</Title>
        <ButtomMain>Saiba Mais</ButtomMain>
      </ImgBackground>
    </>
  );
};

export default Capa;
