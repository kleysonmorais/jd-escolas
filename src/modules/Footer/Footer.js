import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  text-align: center;
  background-color: #333333;
  color: white;
`;

const Text = styled.li`
  color: white;
  font-size: 16px;
  list-style-type: none;
`;

const Title = styled.p`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Footer = () => (
  <Wrap className="p-5">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          <div className="p-2">
            <Title>Reportagem e Análise de Dados</Title>
            <ul>
              <Text>Cristian Edel Weiss</Text>
            </ul>
          </div>
          <div className="p-2">
            <Title>Imagens</Title>
            <ul>
              <Text>Diorgenes Pandini</Text>
              <Text>Leo Munhoz</Text>
            </ul>
          </div>
        </div>
        <div className="clearfix visible-xs" />
        <div className="col-xs-12 col-sm-4">
          <div className="p-2">
            <Title>Design e visualização de dados</Title>
            <ul>
              <Text>Maiara Santos</Text>
            </ul>
          </div>
          <div className="p-2">
            <Title>Edição</Title>
            <ul>
              <Text>Raquel Vieira</Text>
            </ul>
          </div>
        </div>
        <div className="clearfix visible-xs" />
        <div className="col-xs-12 col-sm-4">
          <div className="p-2">
            <Title>Desenvolvimento</Title>
            <ul>
              <Text>Bruno Scheibler</Text>
              <Text>Hércules</Text>
            </ul>
          </div>
          <div className="p-2">
            <Title>Apoio</Title>
            <ul>
              <Text>TV Bahia</Text>
              <Text>NSC TV</Text>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <br />
    <Title>Mentoria</Title>
    <ul>
      <Text>
        Niko Kommenda, jornalista visual do jornal The Guardian, Inglaterra,
        como parte do programa Dataship, direcionado a jornalista de dados,
        organizado pela Deutsche Welle Akademie, da Alemanha
      </Text>
    </ul>
  </Wrap>
);

export default Footer;
