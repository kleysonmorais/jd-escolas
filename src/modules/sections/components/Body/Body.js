import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';

const Content = styled.p`
  padding-top: 5%;
  font-size: 24px;
  text-align: center;
`;

const Body = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Content>{t('texto home')}</Content>
    </Container>
  );
};
export default Body;
