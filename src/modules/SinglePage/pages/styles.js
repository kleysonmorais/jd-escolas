import styled from 'styled-components';
import Container from 'app/styleguide/components/Container';
import { media } from 'app/styleguide/media';
import ReactTooltip from 'react-tooltip';

export const PRIMARY_COLOR = '#f2ece9';
export const SECOND_COLOR = '#fff';

export const SectionPrimary = styled.div`
  width: 100%;
  height: 100%;
  background: ${PRIMARY_COLOR};
  padding-top: ${prop => (prop.top ? prop.top : 0)}vh;
`;

export const SectionSecundary = styled.div`
  width: 100%;
  height: 100%;
  background: ${SECOND_COLOR};
  padding-top: ${prop => (prop.top ? prop.top : 0)}vh;
`;

export const TitleSection = styled.h2`
  font-size: 2em;
  padding: 6% 0% 4% 0%;
  text-transform: uppercase;
  font-size: 35px;
  ${media.min.xl`
     font-size: 65px;
     text-align: center;
  `}
`;

export const LinhaApoio = styled.p`
  font-family: 'SourceSansPro Regular';
  font-size: 16px;
  ${media.min.xl`
     font-size: 18px;
     text-align: center;
  `}
`;

export const Text = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
    color: #c9463c;
  }

  ${media.min.xl`
     font-size: 22px;
  `}
`;

export const Info = styled.div`
  display: grid;
  padding-top: 1%;
  padding-bottom: 1%;
  span {
    color: #1f4b59;
    text-transform: uppercase;
    font-family: 'SourceSansPro Bold';
    font-size: 17px;

    &.info {
      font-size: 13px;
    }
  }

  ${media.min.xl`
     text-align: center;
  `}
`;

export const ParagraphTitle = styled.h3`
  padding-top: 8%;
  padding-bottom: 2%;
  text-transform: uppercase;
  font-size: 30px;
`;

export const DiviserHeight = styled.div`
  height: ${prop => (prop.height ? prop.height : 2)}vh;
`;

export const LineHr = styled.hr`
  background-color: #1f4b59;
  opacity: 1;
  padding: 1px 0%;
  ${media.min.xl`
     width: ${prop => (prop.width ? prop.width : 65)}%
  `}
  margin-bottom: 5%;
`;

export const TitleTable = styled.p`
  margin-top: 5%;
  text-transform: uppercase;
  font-family: 'SourceSansPro Bold';
  font-size: 16px;
  color: #fff;
  background-color: #1f4b59;
  padding-left: 15px;
  border-radius: 4px;
  ${media.min.xl`
     width: ${prop => (prop.width ? prop.width : 65)}%
  `}
`;

export const ImageFile = styled.img`
  width: ${prop => (prop.width ? prop.width : 60)}%;
  max-height: 300px;
  height: 100%;

  ${media.min.xl`
     max-height: 600px;
  `}
`;

export const ContainerBootstrap = styled(Container)`
  ${props => (props.webLayout ? '' : 'margin: 0% 5%;')}

  ${media.min.xl`
     .container-margin {
        margin: 0% 20%;
      }
    `}

  ul {
    padding-left: 22px;
  }

  li {
    font-size: 18px;
  }
`;

export const Tooltip = styled(ReactTooltip)`
  font-size: 16px !important;
  background-color: #c9463c !important;
  pointer-events: auto !important;
  width: 70% !important;
  &:hover {
    visibility: visible !important;
  }

  ${media.min.xl`
      font-size: 20px !important;
      width: 35% !important;
  `}
`;
