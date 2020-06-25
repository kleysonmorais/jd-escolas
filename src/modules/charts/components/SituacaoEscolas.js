import React, { Component } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import {
  SectionSecundary,
  DiviserHeight,
} from 'app/modules/SinglePage/pages/styles';
import SelectCombo from './select/DashboardSituacaoEscolas';
import { CardCustom } from './Styles';
import CardScroll from './CardScroll';

const Wrap = styled(SectionSecundary)`
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
`;

const SpinnerDiv = styled.div`
  padding: 8%;
`;

const RowBoostrap = styled(Row)`
  height: 400px;
`;

const ColCustom = styled.div`
  margin: 0px;
`;

class SituacaoEscolas extends Component {
  state = {
    dataCombo: [],
    CID: '',
    UF: '',
    diplayNoneChart: true,
    dataCharts: {},
  };

  async componentDidMount() {
    try {
      const { gv } = this.props;
      const dataCombo = await gv.getDataComboSituacaoEscolas();
      this.setState({ gv, dataCombo });
    } catch (error) {
      console.error(error);
    }
  }

  handlerChange = (UF, CID) => {
    const { gv } = this.state;
    const { webLayout } = this.props;
    this.setState({ diplayNoneChart: true, CID, UF });
    gv.updateChartsSituacaoEscolas(UF, CID, webLayout).then(dataCharts =>
      this.setState({ dataCharts, diplayNoneChart: false })
    );
  };

  render() {
    const { dataCombo, CID, diplayNoneChart, UF, dataCharts } = this.state;
    const { webLayout } = this.props;
    return (
      <>
        <Wrap>
          <DiviserHeight height={10} />
          <div className="container-fluid">
            {dataCombo && (
              <CardCustom className="container">
                <TitleCombo className="combo">
                  Selecione uma Localização
                </TitleCombo>
                {dataCombo.length && (
                  <SelectCombo
                    onChange={this.handlerChange}
                    dataCombo={dataCombo}
                  />
                )}
              </CardCustom>
            )}

            <>
              <CardCustom className="container">
                {diplayNoneChart ? (
                  <SpinnerDiv className="text-center">
                    <Spinner animation="grow" />
                  </SpinnerDiv>
                ) : (
                  <>
                    <Title>
                      O QUE HOUVE COM AS ESCOLAS DE {CID.toUpperCase()}?
                    </Title>
                    <hr />
                    <Text>
                      Estas são as unidades educacionais de {CID}, {UF}.
                      Mostramos aqui a soma das redes pública e privada por ano,
                      de 2007 a 2019. Na soma geral destas unidades estão
                      creches, escolas de ensino fundamental e médio, educação
                      de jovens e adultos e profissionalizantes.
                    </Text>
                  </>
                )}
              </CardCustom>

              <CardCustom className="container" displayChart={diplayNoneChart}>
                <RowBoostrap>
                  <div className="col-xs-12 col-sm-9">
                    <div id="chartExtintas_div" />
                  </div>
                  <div className="clearfix visible-xs" />
                  <ColCustom
                    className={`${webLayout && 'my-auto'} col-xs-12 col-sm-3`}
                  >
                    {!diplayNoneChart && (
                      <CardScroll type="large">
                        Apenas entre {dataCharts.inicioFechadas} e{' '}
                        {dataCharts.fimFechadas}, fecharam definitivamente na
                        região{' '}
                        <span>
                          {dataCharts.fechadas.toLocaleString('pt-BR')}
                        </span>{' '}
                        escolas.
                      </CardScroll>
                    )}
                  </ColCustom>
                </RowBoostrap>
              </CardCustom>

              <CardCustom className="container" displayChart={diplayNoneChart}>
                <RowBoostrap>
                  <div className="col-xs-12 col-sm-9">
                    <div id="chartParalisadas_div" />
                  </div>
                  <div className="clearfix visible-xs" />
                  <ColCustom
                    className={`${webLayout && 'my-auto'} col-xs-12 col-sm-3`}
                  >
                    {!diplayNoneChart && (
                      <CardScroll type="large">
                        Nela há ainda outras{' '}
                        <span>
                          {dataCharts.paralisadas.toLocaleString('pt-BR')}
                        </span>{' '}
                        escolas paralisadas, isto é, unidades inativas que ainda
                        podem voltar a funcionar.
                      </CardScroll>
                    )}
                  </ColCustom>
                </RowBoostrap>
              </CardCustom>

              <CardCustom className="container" displayChart={diplayNoneChart}>
                <RowBoostrap>
                  <div className="col-xs-12 col-sm-9">
                    <div id="chartFechadas_div" />
                  </div>
                  <div className="clearfix visible-xs" />
                  <ColCustom
                    className={`${webLayout && 'my-auto'} col-xs-12 col-sm-3`}
                  >
                    {!diplayNoneChart && (
                      <CardScroll type="large">
                        Se somar as extintas da década com as paralisadas, a
                        região acumula{' '}
                        <span>
                          {dataCharts.desativadas.toLocaleString('pt-BR')}
                        </span>{' '}
                        escolas desativadas entre {dataCharts.inicioFechadas} e{' '}
                        {dataCharts.fimFechadas}. Isso equivale a uma unidade
                        que deixa de funcionar a cada{' '}
                        <span>
                          {dataCharts.taxaFechadas.toLocaleString('pt-BR')}
                        </span>{' '}
                        dias.
                      </CardScroll>
                    )}
                  </ColCustom>
                </RowBoostrap>
              </CardCustom>

              <CardCustom className="container" displayChart={diplayNoneChart}>
                <RowBoostrap>
                  <div className="col-xs-12 col-sm-9">
                    <div id="chartAtivas_div" />
                  </div>
                  <div className="clearfix visible-xs" />
                  <ColCustom
                    className={`${webLayout && 'my-auto'} col-xs-12 col-sm-3`}
                  >
                    {!diplayNoneChart && (
                      <CardScroll type="large">
                        Em {dataCharts.fimAtivas}, o total de unidades ativas em{' '}
                        <span>{CID}</span> era de{' '}
                        <span>{dataCharts.ativas.toLocaleString('pt-BR')}</span>
                        . Se comparar com o que havia em{' '}
                        {dataCharts.inicioAtivas}, isso representa{' '}
                        <span>
                          {dataCharts.variacao.toLocaleString('pt-BR')}
                        </span>{' '}
                        a <span>{dataCharts.maisMenos}</span>.
                      </CardScroll>
                    )}
                  </ColCustom>
                </RowBoostrap>
              </CardCustom>

              <CardCustom className="container" displayChart={diplayNoneChart}>
                <RowBoostrap>
                  <div className="col-xs-12 col-sm-9">
                    <div id="chartNovas_div" />
                  </div>
                  <div className="clearfix visible-xs" />
                  <ColCustom
                    className={`${webLayout && 'my-auto'} col-xs-12 col-sm-3`}
                  >
                    {dataCharts.novasEscolas && (
                      <CardScroll type="large">
                        Novas escolas também surgiram nesse mesmo período:{' '}
                        <span>{dataCharts.novas.toLocaleString('pt-BR')}</span>.
                        Mas para cada nova unidade escolar criada, há em média{' '}
                        <span>
                          {dataCharts.taxaNovas.toLocaleString('pt-BR')}
                        </span>{' '}
                        desativadas.
                      </CardScroll>
                    )}
                    {!dataCharts.novasEscolas && (
                      <CardScroll type="large">
                        Nenhuma escola nova foi criada entre 2007 e 2019.
                      </CardScroll>
                    )}
                  </ColCustom>
                </RowBoostrap>
              </CardCustom>

              <CardCustom className="container" displayChart={diplayNoneChart}>
                <RowBoostrap>
                  <div className="col-xs-12 col-sm-9">
                    <div id="chartMatriculas_div" />
                  </div>
                  <div className="clearfix visible-xs" />
                  <ColCustom
                    className={`${webLayout && 'my-auto'} col-xs-12 col-sm-3`}
                  >
                    {dataCharts.matriculasPassado && (
                      <CardScroll type="large">
                        O número de alunos matriculados na região também mudou
                        nesse período. Eram{' '}
                        <span>
                          {dataCharts.matriculasPassado.toLocaleString('pt-BR')}
                        </span>{' '}
                        em {dataCharts.inicioMatriculas} e passaram a ser{' '}
                        <span>
                          {dataCharts.matriculas.toLocaleString('pt-BR')}
                        </span>{' '}
                        em {dataCharts.fimMatriculas}.
                      </CardScroll>
                    )}
                  </ColCustom>
                </RowBoostrap>
              </CardCustom>
            </>
          </div>
          <DiviserHeight height={15} />
        </Wrap>
      </>
    );
  }
}

export default SituacaoEscolas;
