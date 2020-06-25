import React from 'react';
import { Container } from 'react-bootstrap';
import ImgBackground from 'app/modules/sections/components/Capa/ImgBackground';
import {
  SectionPrimary,
  TitleSection,
  LinhaApoio,
  Text,
  DiviserHeight,
  ImageFile,
} from './styles';

const Page4 = () => (
  <>
    <ImgBackground img="imgs/img8.jpeg" />
    <SectionPrimary top={5}>
      <Container>
        <TitleSection>História 4</TitleSection>
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
          <ImageFile src="imgs/img4.jpeg" alt="Imagem" />
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
    </SectionPrimary>
  </>
);

export default Page4;
