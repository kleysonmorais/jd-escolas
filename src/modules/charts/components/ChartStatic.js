import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import styled from 'styled-components';
import CardScroll from './CardScroll';

const Graph = styled.img`
  width: ${props => (props.widthImg ? props.widthImg : '50')}%;
  margin: 10%;
`;

const Sticky = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
`;

class ChartStatic extends Component {
  state = {
    serie: 1,
    animation: true,
  };

  constructor(props) {
    super(props);
    this.serie01 = React.createRef();
    this.serie02 = React.createRef();
    this.serie03 = React.createRef();
    this.serie04 = React.createRef();
    this.serie05 = React.createRef();
    this.serie06 = React.createRef();
    this.serie07 = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  isInViewport = (el, offset = 0) => {
    if (!el) return false;
    const { top } = el.getBoundingClientRect();
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };

  playAnimation = serie => {
    this.setState({ animation: false });
    setTimeout(() => {
      this.setState({ animation: true, serie });
    }, 500);
  };

  handleScroll = () => {
    const { serie } = this.state;
    const { webLayout } = this.props;
    if (webLayout) {
      if (this.isInViewport(this.serie01.current) && serie !== 1)
        this.playAnimation(1);
      if (this.isInViewport(this.serie02.current) && serie !== 2)
        this.playAnimation(2);
      if (this.isInViewport(this.serie03.current) && serie !== 3)
        this.playAnimation(3);
      if (this.isInViewport(this.serie04.current) && serie !== 4)
        this.playAnimation(4);
      if (this.isInViewport(this.serie05.current) && serie !== 5)
        this.playAnimation(5);
      if (this.isInViewport(this.serie06.current) && serie !== 6)
        this.playAnimation(6);
      if (this.isInViewport(this.serie07.current) && serie !== 7)
        this.playAnimation(7);
    }
  };

  render() {
    const { serie, animation } = this.state;
    const { webLayout } = this.props;
    return (
      <div className="container-fluid">
        {webLayout && (
          <Sticky>
            {animation && (
              <ReactCSSTransitionGroup
                transitionName={{
                  appear: 'animated',
                  appearActive: 'bounceInUp',
                }}
                transitionAppear
              >
                <Graph src={`graphs/serie0${serie}-1.png`} />
              </ReactCSSTransitionGroup>
            )}
            {!animation && (
              <ReactCSSTransitionGroup
                transitionName={{
                  appear: 'animated',
                  appearActive: 'bounceOutUp',
                }}
                transitionAppear
              >
                <Graph src={`graphs/serie0${serie}-1.png`} />
              </ReactCSSTransitionGroup>
            )}
          </Sticky>
        )}
        <div ref={this.serie01}>
          {!webLayout && (
            <div className="row">
              <Graph widthImg={80} src="graphs/serie01-1.png" />
            </div>
          )}
          <CardScroll type={webLayout ? 'small' : 'large'}>
            <span className="title">Maior índice de escolas extintas</span>
            <br /> Em 2018, o Brasil atingiu o maior número de unidades
            extintas, ou seja, definitivamente fechadas:{' '}
            <span>10.209 no total</span>, mais do que o dobro da média dos anos
            anteriores. Só no ano passado, foram outras <span>5.585</span>.
            Desde 2007, o país acumulou <span>65.367</span> instituições
            extintas, sendo 75,47% delas escolas públicas.
          </CardScroll>
        </div>
        <div ref={this.serie02}>
          {!webLayout && (
            <div className="row">
              <Graph widthImg={80} src="graphs/serie02-1.png" />
            </div>
          )}
          <CardScroll type={webLayout ? 'small' : 'large'}>
            <span className="title">Destino das paralisadas é fechar</span>
            <br />
            Mas ainda existe um segundo tipo de unidades inativas no Censo, as
            chamadas paralisadas. Essas unidades têm três destinos: podem
            continuar nessa condição no ano seguinte, ser reativadas ou
            extintas. Mas, na prática, se observa que a maioria fica paralisada
            por um tempo e é extinta entre dois e três anos depois, embora haja
            casos que estão há pelo menos 13 anos nesse impasse. Como este é um
            indicador transitório, é importante prestar atenção no dado mais
            recente. Em 2019, o Brasil tinha <span>40.468</span> unidades
            paralisadas, <span>77,5% delas eram públicas</span>. O pico tinha
            sido atingido em 2017, com 46,8 mil escolas. O número caiu porque
            muitas delas foram extintas nos anos seguintes.
          </CardScroll>
        </div>
        <div ref={this.serie03}>
          {!webLayout && (
            <div className="row">
              <Graph widthImg={80} src="graphs/serie03-1.png" />
            </div>
          )}
          <CardScroll type={webLayout ? 'small' : 'large'}>
            <span className="title">
              Escolas com portas fechadas chegam a 105.835
            </span>
            <br />
            Logo, ao somar as extintas entre 2007 e 2019 e as que continuavam
            paralisadas em 2019, o Brasil contabiliza <span>105.835</span>{' '}
            unidades que encerraram as atividades no país no período, o
            equivalente a <span>1 a cada 1h05min</span>. Desse contingente,{' '}
            <span>76,27% são da rede pública</span>; 69,26% apenas escolas
            municipais.
          </CardScroll>
        </div>
        <div ref={this.serie04}>
          {!webLayout && (
            <div className="row">
              <Graph widthImg={80} src="graphs/serie04-1.png" />
            </div>
          )}
          <CardScroll type={webLayout ? 'small' : 'large'}>
            <span className="title">
              Novas escolas também surgiram, mas num ritmo bem menor
            </span>
            <br />
            Mas o Brasil não apenas fecha escolas, novas também são criadas.
            Foram <span>51.064</span> declaradas pela primeira vez no Censo
            Escolar desde 2008, média de 4,2 mil por ano. A taxa de reposição,
            no entanto, não compensa a perda. Em 2018, foi o índice mais baixo
            da década, com 2.736 novas instituições cadastradas. No ano passado,
            foi um pouco maior: 2915, ainda assim, menor do que se atingia antes
            de 2016. Em média, para cada 2,07 unidades desativadas no país entre
            2008 e 2019, apenas 1 nova surgiu. Se olhar somente para a rede
            pública, a relação média é ainda maior: uma nova para cada 3,8
            desativadas no período.
          </CardScroll>
        </div>
        <div ref={this.serie05}>
          {!webLayout && (
            <div className="row">
              <Graph widthImg={80} src="graphs/serie05-1.png" />
            </div>
          )}
          <CardScroll type={webLayout ? 'small' : 'large'}>
            <span className="title">Escolas privadas puxam crescimento</span>
            <br />
            Muito dessa reposição de novas escolas se deve na verdade ao avanço
            da rede privada. Ela foi responsável por <span>58,37%</span> das
            novas unidades criadas no país desde 2008. Há Estados em que isso é
            mais aparente, como Rio de Janeiro, Sergipe, Alagoas, Paraíba,
            Pernambuco e o Distrito Federal, onde as particulares representam
            mais de 70% das unidades criadas no período.
          </CardScroll>
        </div>
        <div ref={this.serie06}>
          {!webLayout && (
            <div className="row">
              <Graph widthImg={80} src="graphs/serie06-1.png" />
            </div>
          )}
          <CardScroll type={webLayout ? 'small' : 'large'}>
            <span className="title">
              Número de escolas públicas ativas é o mais baixo
            </span>
            <br />
            Não é surpresa, portanto, que o número das escolas ativas seja o
            mais baixo desde pelo menos 2007 no país. Em 2008, impulsionado pelo
            crescimento de escolas privadas no Brasil, houve o pico de unidades
            de ensino básico ativas. De lá até 2019, o número caiu 11,2% no
            geral: enquanto as públicas registraram redução de 15,3%, as
            particulares cresceram 5,25% no período e atingiram o patamar mais
            alto. Em 2019, o país declarou: <span>182.468</span> unidades
            ativas, <span>76,8% públicas</span>.
          </CardScroll>
        </div>
        <div ref={this.serie07}>
          {!webLayout && (
            <div className="row">
              <Graph widthImg={80} src="graphs/serie07-1.png" />
            </div>
          )}
          <CardScroll type={webLayout ? 'small' : 'large'}>
            <span className="title">
              Menos matrículas é a principal justificativa
            </span>
            <br />
            Embora isso não seja observável em todos os municípios do Brasil, os
            governos alegam que a queda no número de matrículas, provocada
            principalmente pela redução na taxa de natalidade, é a principal
            causa da desativação de escolas. De 2007 a 2018, o total de
            matrículas na educação básica do país caiu 8,62%. Na educação
            infantil, houve crescimento de 33% no número de matrículas, mas
            impulsionado pela obrigatoriedade da pré-escola a partir de 2013 e a
            cobrança por mais creches imposta por metas do{' '}
            <span>Plano Nacional de Educação</span>, de 2014. Mas existe um
            dilema: uma parcela dessa queda pode ser de alunos que desistiram,
            pois nenhum município consegue afirmar com exatidão quantas crianças
            e adolescentes estão fora da escola hoje, eu tiraria essa vírgula
            porque não há dados oficiais atualizados e censitários, apenas
            estimativas. O mais próximo disso são os levantamentos feitos pela
            Unicef e pelo IBGE, que estimam quase 2 milhões de pessoas fora da
            escola.
          </CardScroll>
        </div>
      </div>
    );
  }
}

export default ChartStatic;
