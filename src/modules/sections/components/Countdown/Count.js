import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { media } from 'app/styleguide/media';

const Wrap = styled.div`
  padding-top: 5%;
  padding-bottom: 5%;
  text-align: center;

  span {
    font-family: 'SourceSansPro Bold';
    font-size: 4rem;

    ${media.min.xl`
      font-size: 8rem;
    `}
  }

  p {
    font-size: 16px;
    font-family: 'SourceSansPro Regular';

    ${media.min.xl`
     font-size: 20px;
    `}

    &.padding {
      font-size: 22px;

      ${media.min.xl`
        font-size: 26px;
        padding: 0% 15%;
      `}
    }

    &.padding-bottom {
      padding-bottom: 5%;
    }
  }
`;

const INITIAL_DATE = new Date('2020-1-1 00:00:00:00').getTime();
const INTERVAL_TIME = 3780000;
class Count extends Component {
  state = {
    countSchoolCloded: 0,
    countSchoolOpen: 0,
    regressBar: 100,
  };

  componentDidMount() {
    const dateCurrent = new Date().getTime();
    const dateDifference = dateCurrent - INITIAL_DATE;
    const countSchoolCloded = Math.floor(dateDifference / INTERVAL_TIME);
    // this.setState({ countSchoolCloded });
    this.startCountClosed(countSchoolCloded);
    this.startCountOpen(100);
    // this.startRegressBar();
  }

  startCountClosed = async value => {
    for (let number = 0; number <= value; number += 3) {
      this.setState({ countSchoolCloded: number });
      await this.sleep(1);
    }
  };

  startCountOpen = async value => {
    for (let number = 0; number <= value; number += 1) {
      this.setState({ countSchoolOpen: number });
      await this.sleep(1);
    }
  };

  startRegressBar = async () => {
    for (let percent = 100; percent >= 0; percent -= 1) {
      const regressBar = Math.floor((100 * percent) / 3780);
      console.log(regressBar);
      this.setState({ regressBar: percent });
      await this.sleep(1000);
    }
  };

  sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  render() {
    const { countSchoolCloded, countSchoolOpen } = this.state;
    return (
      <Wrap>
        <Container>
          <p className="padding-bottom">
            Nem sempre é de repente, mas os sintomas do fim aparecem com o
            tempo. Desde 2007, o Brasil desativou mais de 105 mil unidades de
            educação básica públicas e privadas, em boa parte motivada pela
            queda gradativa da demanda nas cidades. Gestores de todo o país
            enfrentam o dilema de evoluir a qualidade da educação diante das
            mudanças demográficas. No entanto, dados exclusivos levantados pela
            reportagem apontam que quando escolas públicas fecharam houve muitos
            estudantes que não migraram para unidades próximas, diferente do
            esperado pelos governos, ampliando as estatísticas de desistência.
            Apesar do quadro, especialistas defendem ser a hora certa para
            reorganizar o sistema de ensino e torná-lo mais eficiente e alinhado
            à nova realidade do país
          </p>
          <hr />
          <p className="padding">
            A taxa de fechamento de escolas no Brasil é de aproximadamente uma a
            cada <strong>1h03min</strong>. Desde que esta história foi
            publicada, estima-se que
          </p>
          <span>{countSchoolCloded}</span>
          <p className="padding">escolas foram fechadas.</p>
          {/* <ProgressBar variant="danger" now={regressBar} /> */}
          {/* <p>A próxima escola será encerrada em 3' 22"</p> */}

          {/* <p>RELÓGIO PARA ESCOLAS QUE ABREM:</p> */}
          <hr />
          <p className="padding">
            Desde que esta história foi publicada, estima-se que
          </p>
          <span>{countSchoolOpen}</span>
          <p className="padding">escolas foram abertas.</p>
        </Container>
      </Wrap>
    );
  }
}

export default Count;
