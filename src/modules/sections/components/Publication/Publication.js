import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import ImgBackground from '../Capa/ImgBackground';

const Section = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 15%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 160px;
  position: absolute;
  right: 1%;
  left: 20%;
  top: 83%;
  bottom: 2%;
  width: 700px;
  height: 350px;
`;

const Text = styled.p`
  padding-top: 20%;
  font-size: 18px;
`;

const WrapCenter = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
`;

const Author = styled.span`
  font-weight: bold;
`;

const Publication = () => (
  <Section>
    <ImgBackground>
      <Title>Sintomas Terminais</Title>
    </ImgBackground>
    <Container>
      <WrapCenter>
        <Text>
          De 2007 a 2018, o Brasil desativou 102 mil unidades de ensino básico.
          Fatores como queda na taxa de natalidade, migração de famílias e
          tentativa de poupar recursos públicos estão entre as principais
          causas. Mas há casos em que fatores externos, como briga de gangues e
          descasos com a estrutura obrigaram a encerrar as atividades.
        </Text>
        <Author>Cristian Edel Weiss</Author>
      </WrapCenter>
      <h3>A ruína de um baú de lembranças</h3>
      <p>
        Você se lembra como era a escola da sua infância? Dos dias em que
        ensaiava as primeiras palavras errantes a lápis? Do cheiro do material
        escolar? Das horas de diversão no recreio e apreensão nas provas? Das
        paqueras na adolescência, dos professores que o estimulavam no ensino
        médio (e os chatos também), além dos amigos que seguiram a vida inteira
        ou tomaram outros rumos? Que sentimento causaria se esse baú de
        lembranças deixasse de existir? Provavelmente é o mesmo que se repetiu
        mais de uma centena de milhar de vezes no país nos últimos anos.
      </p>
      <p>
        Durante os últimos três anos, esta reportagem vasculhou mais de 100
        gigabytes dos microdados do Censo Escolar, do Ministério da Educação, de
        2007 a 2018, e constatou que 102.287 unidades de educação básica
        públicas e privadas foram desativadas no país no período. É como se cada
        vez que 1h03min se passassem, uma unidade deixasse de funcionar no país.
      </p>
      <h4>O que você vai ver</h4>
      <ul>
        <li>Quantas escolas fecham no Brasil?</li>
        <li>Quantas escolas fecham na sua cidade?</li>
        <li>Por que as escolas fecham?</li>
        <li>Como as pessoas são afetadas pelo fechamento das escolas?</li>
        <li>Flagra: como se fecha uma escola?</li>
        <li>O que dizem os governos?</li>
      </ul>
      <p>
        As regiões mais afetadas, os principais motivos e as consequências para
        os estudantes serão detalhados nos capítulos a seguir. Para entender o
        fenômeno, navegue nos gráficos:
      </p>
      <h3>Por que tantas escolas fecharam no Brasil desde 2007?</h3>
      <p>
        Cruzando dados do Censo Escolar de 2007 a 2018, a reportagem chegou a
        este diagnóstico das escolas no Brasil. O Censo classifica a situação
        das unidades de três formas distintas:
      </p>
      <ul>
        <li>ativas (que funcionam plenamente),</li>
        <li>
          paralisadas (temporariamente desativadas, mas que podem voltar a
          funcionar)
        </li>
        <li>e extintas, que foram definitivamente desativadas. </li>
      </ul>
      <p>
        Consideramos aqui unidades das redes pública e privada, da educação
        básica.
      </p>
    </Container>
  </Section>
);

export default Publication;
