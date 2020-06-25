import React from 'react';
import { Container } from 'react-bootstrap';
import ResuldadoAlunos from 'app/modules/charts/components/ResultadoAlunos';
import ImgBackground from 'app/modules/sections/components/Capa/ImgBackground';
import {
  SectionPrimary,
  TitleSection,
  LinhaApoio,
  Text,
  DiviserHeight,
  ImageFile,
} from './styles';

const Page2 = ({ gv, webLayout }) => (
  <>
    <ImgBackground img="imgs/img11.png" />
    <SectionPrimary top={5}>
      <Container>
        <TitleSection>Um Gatilho para a Evasão</TitleSection>
        <Text>
          Cruzamos dados de matrículas de todo o Brasil, de 2007 a 2017, e
          identificamos que as taxas de estudantes que desistem de estudar chega
          a ser 6 vezes maior entre os alunos que saíram de uma escola que recém
          foi desativada. Há unidades em que evadiram mais de 80% dos que
          deveriam se matricular em outra unidade no ano seguinte. Embora os
          governos estaduais digam que há vagas em escolas do entorno, admitem
          que não acompanham esses indivíduos no primeiro ano de adaptação
        </Text>
        <Text className="author">Por Cristian Edel Weiss</Text>
        <div className="text-center">
          <ImageFile src="imgs/img3.jpeg" alt="Imagem" />
        </div>
        <DiviserHeight />
        <LinhaApoio>Lorem Ipsum</LinhaApoio>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essential ly unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <DiviserHeight height={15} />
      </Container>
    </SectionPrimary>
    <ResuldadoAlunos gv={gv} webLayout={webLayout} />
  </>
);

export default Page2;
