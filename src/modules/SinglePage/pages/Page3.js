import React from 'react';
import { Container } from 'react-bootstrap';
import ImgBackground from 'app/modules/sections/components/Capa/ImgBackground';
import {
  SectionSecundary,
  TitleSection,
  LinhaApoio,
  Text,
  DiviserHeight,
  ImageFile,
} from './styles';

const Page3 = () => (
  <>
    <ImgBackground img="imgs/img12.png" />
    <SectionSecundary top={5}>
      <Container>
        <TitleSection>História 3</TitleSection>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Text className="author">Por Cristian Edel Weiss</Text>
        <div className="text-center">
          <ImageFile src="imgs/img6.jpeg" alt="Imagem" />
        </div>
        <DiviserHeight />
        <LinhaApoio>Lorem Ipsum</LinhaApoio>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
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
    </SectionSecundary>
  </>
);

export default Page3;
