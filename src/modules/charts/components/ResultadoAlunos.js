import React, { Component } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import {
  SectionSecundary,
  DiviserHeight,
} from 'app/modules/SinglePage/pages/styles';
import { bindActionCreators } from 'redux';
import { radioUpdate } from 'app/redux/actions/radioAction';
import { connect } from 'react-redux';
import Select from './select/DashboardResultadoAluno';
import { CardCustom } from './Styles';

const Wrap = styled(SectionSecundary)`
  padding-top: 10vh;
  height: 100%;
`;

const Title = styled.h3`
  text-align: center;
  padding: 2%;
`;

const TitleCombo = styled.h4`
  text-align: center;
  padding: 2%;
  color: #767676;
`;

const Text = styled.p`
  font-size: 19px;
  text-align: center;

  .text-left {
    text-align: left;
  }
`;

const Span = styled.span`
  font-weight: bold;
  color: #c9463c;
`;

const SpinnerDiv = styled.div`
  padding: 4%;
`;

const RowBootstrap = styled.div`
  ${prop => (prop.displayChart ? 'visibility: hidden;' : '')}
`;

const Icon = styled.img`
  max-width: ${prop => (prop.maxWidth ? `${prop.maxWidth}%` : '20%;')};
  height: auto;
  cursor: pointer;

  &.disabled {
    cursor: default;
    filter: opacity(10%);
  }
`;

class ResuldadoAlunos extends Component {
  state = {
    dataCombo: [],
    gv: undefined,
    loadingCharts: false,
    noData: true,
    dataChart: {},
    animation: 1,
  };

  async componentDidMount() {
    try {
      const { gv } = this.props;
      const dataCombo = await gv.getDataComboResultadosAlunos();
      this.setState({ gv, dataCombo, loadingCharts: false });
    } catch (error) {
      console.error(error);
    }
  }

  handlerChange = (estado, cidade, escola, radioButton) => {
    const { gv } = this.state;
    const { radioUpdate, webLayout } = this.props;
    this.setState({ loadingCharts: true });
    gv.updateChartResultadoEscolas(estado, cidade, escola, webLayout).then(
      dataChart => {
        if (dataChart) {
          radioUpdate(this.getRadioValue(dataChart.radioButtonOptions));
          this.setState({
            loadingCharts: false,
            noData: false,
            dataChart,
            animation: 1,
          });
        } else {
          this.setState({ loadingCharts: false, noData: true });
        }
      }
    );
  };

  getRadioValue = radioButtonOptions => {
    if (radioButtonOptions.anosIniciais) return 1;
    if (radioButtonOptions.anosFinais) return 2;
    if (radioButtonOptions.ensinoMedio) return 3;
    return null;
  };

  handlerChangeRadio = radioButton => {
    const { gv } = this.state;
    gv.refreshChartResultadoEscolas(radioButton).then(dataChart => {
      if (!dataChart) {
        this.setState({ noData: true });
      } else {
        this.setState({ dataChart, noData: false, animation: 1 });
        console.log(dataChart);
      }
    });
  };

  play = () => {
    const { gv, animation } = this.state;
    let time1 = 0;
    let time2 = 2000;
    if (animation > 1) {
      gv.setAnimationChart(1);
      this.setState({ animation: 1 });
      time1 = 2000;
      time2 = 4000;
    }

    setTimeout(() => {
      gv.setAnimationChart(2);
      this.setState({ animation: 2 });
    }, time1);

    setTimeout(() => {
      gv.setAnimationChart(3);
      this.setState({ animation: 3 });
    }, time2);
  };

  back = () => {
    const { gv, animation } = this.state;
    gv.backAnimationChart();
    if (animation > 1) {
      this.setState({ animation: animation - 1 });
    }
  };

  next = () => {
    const { gv, animation } = this.state;
    gv.nextAnimationChart();
    if (animation < 3) {
      this.setState({ animation: animation + 1 });
    }
  };

  render() {
    const {
      dataCombo,
      loadingCharts,
      gv,
      noData,
      dataChart,
      animation,
    } = this.state;
    return (
      <>
        <Wrap>
          <Container>
            <CardCustom className="container">
              <TitleCombo className="combo">Selecione uma Escola</TitleCombo>
              {dataCombo.length && (
                <Select
                  onChange={this.handlerChange}
                  dataCombo={dataCombo}
                  dataChart={dataChart}
                  onChangeRadio={this.handlerChangeRadio}
                />
              )}
            </CardCustom>

            <>
              <CardCustom className="container">
                {loadingCharts && (
                  <SpinnerDiv className="text-center">
                    <Spinner animation="border" />
                  </SpinnerDiv>
                )}
                {!loadingCharts && !noData && (
                  <>
                    <Title>
                      O QUE HOUVE COM OS ALUNOS APÓS O FECHAMENTO DA ESCOLA?
                    </Title>
                    <hr />
                  </>
                )}
                {!loadingCharts && noData && (
                  <>
                    <Title>Não há dados para a escola selecionada</Title>
                    <hr />
                  </>
                )}
                <RowBootstrap
                  className="row"
                  displayChart={noData || loadingCharts}
                >
                  <Col>
                    {gv && (
                      <>
                        <div id="chart_div" />
                        <hr />
                        <br />
                        <Row>
                          <Col className="text-right my-auto">
                            <div>
                              <Icon
                                className={animation === 1 ? 'disabled' : ''}
                                maxWidth={20}
                                onClick={this.back}
                                src="icons/rewind.svg"
                              />
                            </div>
                          </Col>
                          <Col className="text-center my-auto">
                            <div>
                              <Icon
                                maxWidth={35}
                                onClick={this.play}
                                src="icons/play-button-2.svg"
                              />
                            </div>
                          </Col>
                          <Col className="text-left my-auto">
                            <div>
                              <Icon
                                className={animation === 3 ? 'disabled' : ''}
                                maxWidth={20}
                                onClick={this.next}
                                src="icons/fast-forward.svg"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <div className="pt-4 col align-self-center">
                            {animation === 1 && (
                              <>
                                <Text>
                                  <strong>Ano 1</strong>
                                </Text>
                                <Text>
                                  Total de alunos desta etapa no último ano de
                                  atividade desta escola.
                                </Text>
                              </>
                            )}
                            {animation === 2 && (
                              <>
                                <Text>
                                  <strong>Ano 2</strong>
                                </Text>
                                <Text>
                                  O que aconteceu com os alunos no final do
                                  primeiro ano de adaptação a uma nova escola.
                                </Text>
                              </>
                            )}
                            {animation === 3 && (
                              <>
                                <Text>
                                  <strong>Ano 3</strong>
                                </Text>
                                <Text>
                                  Dos alunos que evadiram no Ano 2, este foi o
                                  resultado no ano seguinte.
                                </Text>
                              </>
                            )}
                          </div>
                        </Row>
                      </>
                    )}
                  </Col>
                  {!loadingCharts && !noData && (
                    <Col className="my-auto">
                      <Text>
                        Escola <Span>{dataChart.localizacao}</Span>, da rede{' '}
                        <Span>{dataChart.rede}</Span> e que funcionou até{' '}
                        <Span>{dataChart.anoFinal}</Span>.
                      </Text>
                      <Text>
                        No último ano de atividade (veja o Ano 1), que foi em{' '}
                        <Span>{dataChart.anoFinal2}</Span>, a unidade tinha pelo
                        menos <Span>{dataChart.total}</Span> alunos que deveriam
                        se matricular em outra escola no ano seguinte, ou seja,
                        estudavam numa série entre o 1º ano do ensino
                        fundamental e o 2º ano do ensino médio.
                      </Text>
                      <Text>
                        Assim, considerando apenas os alunos de{' '}
                        <Span>{dataChart.etapa}</Span>,{' '}
                        <Span>{dataChart.alunos}</Span> deveriam se matricular
                        numa outra escola no ano seguinte ao fechamento desta
                        unidade (veja o Ano 2), em{' '}
                        <Span>{dataChart.anoSeguinte}</Span>. Desse total,{' '}
                        <Span>{dataChart.aprovados}</Span> alunos foram
                        aprovados na nova escola,{' '}
                        <Span>{dataChart.reprovados}</Span> reprovaram e{' '}
                        <Span>{dataChart.evadidos}</Span> não se matricularam em
                        nenhuma escola pública ou privada do país, portanto,
                        possivelmente desistiram de estudar (evadiram).
                      </Text>
                      <Text>
                        Comparado às médias oficiais para escolas similares da
                        cidade, o percentual de alunos que possivelmente
                        evadiram é <Span>{dataChart.propMediaEvasao}%</Span>{' '}
                        <Span>{dataChart.refMediaEvasao}</Span> do que a média
                        local para uma escola{' '}
                        <Span>{dataChart.localizacao2}</Span> da rede{' '}
                        <Span>{dataChart.rede2}</Span>.
                      </Text>
                      <Text>
                        E desses alunos que possivelmente evadiram,{' '}
                        <Span>{dataChart.evasaoAno3}</Span> permaneceram fora da
                        escola mais um ano pelo menos em{' '}
                        <Span>{dataChart.anoSeguinte2}</Span> (veja o Ano 3).{' '}
                        {dataChart.fraseAno3}
                      </Text>
                    </Col>
                  )}

                  {!loadingCharts && noData && (
                    <Col className="my-auto">
                      <Text>Sem Dados</Text>
                    </Col>
                  )}
                </RowBootstrap>
              </CardCustom>
            </>
          </Container>
          <DiviserHeight height={15} />
        </Wrap>
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ radioUpdate }, dispatch);

export default connect(null, mapDispatchToProps)(ResuldadoAlunos);
