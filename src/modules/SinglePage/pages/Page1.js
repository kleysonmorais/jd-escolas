import React from 'react';
import SituacaoEscolas from 'app/modules/charts/components/SituacaoEscolas';
import ChartStatic from 'app/modules/charts/components/ChartStatic';
import ImgBackground from 'app/modules/sections/components/Capa/ImgBackground';
import { page1 as data } from './data';
import {
  SectionPrimary,
  TitleSection,
  LinhaApoio,
  Text,
  Info,
  ParagraphTitle,
  ContainerBootstrap,
  Tooltip,
  TitleTable,
  LineHr,
} from './styles';

const Page1 = ({ gv, webLayout }) => (
  <>
    <ImgBackground img="imgs/img8.jpeg" />
    <SectionPrimary>
      <ContainerBootstrap webLayout={webLayout}>
        <TitleSection>{data.titleSection}</TitleSection>
        <div className="container-margin">
          <LinhaApoio>{data.subtitle}</LinhaApoio>
          <Info>
            <span>Por {data.author}</span>
            <span className="info">xx/xx/xxxx</span>
          </Info>
          <ParagraphTitle>{data.paragraph1.title}</ParagraphTitle>
          <Text>
            Uma escola reduz a taxa de desistência de alunos que ingressam no
            ensino médio de 40% para 3% em cinco anos, vence prêmios por
            projetos pedagógicos e envolve pais e moradores na periferia de
            Joinville, no norte de Santa Catarina. No Rio de Janeiro, capital,
            um colégio de ensino fundamental e médio noturno do bairro Estácio
            se orgulha da proeza de se tornar inclusiva ao reunir entre seus
            alunos ilustres colegas com mais de 60 anos, cujo desejo era sentir
            o prazer de aprender numa classe{' '}
            {
              <span data-tip="O Censo Escolar, coletado todos os anos pelo Ministério da Educação, passou por reformulação na edição de 2007. Os dados passaram a ser mais precisos, submetidos digitalmente e gestores das escolas e das secretarias precisam informar duas vezes por ano informações detalhadas sobre as condições estruturais de escolas, a situação de turmas e dados sobre professores e matrículas. Por esta razão, decidimos considerar informações apenas a partir de 2007. Os dados referentes a 2019 ainda não foram divulgados.">
                tradicional
              </span>
            }{' '}
            em meio aos jovens, já divididos entre estudo, trabalho e a dureza
            da vida adulta. Em Salvador, Bahia, a unidade de ensino fundamental
            ganha notoriedade no Estado por atender com carinho estudantes com
            deficiência física e intelectual. Com origens tão distantes, essas
            três escolas tiveram o mesmo destino: foram fechadas. Por queda de
            matrículas nos últimos anos, para economizar recursos, modernizar
            modelos pedagógicos ou para contornar o descaso crônico de governos
            com a infraestrutura dos prédios, 105.835 unidades de educação
            básica foram desativadas no Brasil entre 2007 e 2019, com ápices nos
            últimos dois anos. É como se a cada uma hora e cinco minutos uma
            delas fechasse as portas nos grandes centros ou nos rincões do país.
            Durante os últimos três anos, a reportagem examinou mais de 550
            milhões de matrículas, 289 mil unidades educacionais ativas e
            inativas e terabytes de dados do Censo Escolar, do Ministério da
            Educação, para tentar entender o que está por trás do fenômeno que
            ocorre a conta-gotas no sistema educacional brasileiro, deixa
            cicatrizes e efeitos colaterais, mas pode abrir uma janela de
            oportunidades, segundo especialistas.
          </Text>
          <TitleTable>O que você vai ver LOGO MAIS</TitleTable>
          <ul>
            <li>Quantas escolas fecham no Brasil?</li>
            <li>O que aconteceu na minha cidade?</li>
            <li>Flagra: como uma escola é fechada?</li>
            <li>O que está por trás da chamada reorganização escolar?</li>
            <li>Como as pessoas são afetadas pelas desativações?</li>
          </ul>
          <LineHr />
          <Text>
            As regiões mais afetadas, os principais motivos e as consequências
            para os estudantes serão detalhados nos capítulos a seguir. Para
            entender o fenômeno, navegue nos gráficos:
          </Text>
          <ParagraphTitle>
            Por que tantas escolas fecharam no Brasil desde 2007?
          </ParagraphTitle>
          <Text>
            Cruzando dados do Censo Escolar de 2007 a 2019, a reportagem chegou
            a este diagnóstico das escolas no Brasil. O Censo classifica a
            situação das unidades de três formas distintas:
          </Text>
          <ul>
            <li>Ativas (que funcionam plenamente), </li>
            <li>
              paralisadas (temporariamente desativadas, mas que podem voltar a
              funcionar) e
            </li>
            <li> extintas, que foram definitivamente desativadas.</li>
          </ul>
          <LineHr />
          <Text>
            Consideramos aqui unidades das redes pública e privada, da educação
            básica.
          </Text>
        </div>
      </ContainerBootstrap>
    </SectionPrimary>
    <ChartStatic webLayout={webLayout} />
    <SituacaoEscolas gv={gv} webLayout={webLayout} />
    <Tooltip place="bottom" delayHide={1000} effect="solid" />
  </>
);

export default Page1;
