import React, { Component } from 'react';
import Header from 'app/modules/menu/components/Header/Header';
import MenuSections from 'app/modules/menu/containers/MenuSections';
import { Link, Element, animateScroll as scroll, scroller } from 'react-scroll';
import LinkNext from 'next/link';
import ProgressBar from 'react-scroll-progress-bar';
import PropTypes from 'prop-types';
import { useGoogle } from 'app/lib/useGoogle';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Footer from '../Footer/Footer';
import { GoogleVisualizationCharts } from '../charts/lib/GoogleVisualizationCharts';

class SinglePage extends Component {
  state = {
    visible: true,
    gv: undefined,
  };

  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  async componentDidMount() {
    const { numberPage } = this.props;
    const google = await useGoogle.get();
    const gv = new GoogleVisualizationCharts(google);
    await gv.initializer();
    this.setState({ gv });
    this.scrollTo(numberPage);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { visible } = this.state;
    const updateVisible = window.pageYOffset < 55;
    if (updateVisible !== visible) {
      this.setState({ visible: updateVisible });
    }
  };

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  scrollTo = numberPage => {
    scroller.scrollTo(`page${numberPage}`, {
      duration: 0,
      delay: 0,
      smooth: true,
      spy: true,
    });
  };

  render() {
    const { visible, gv } = this.state;
    const { webLayout } = this.props;
    return (
      <>
        <ProgressBar bgcolor="#C9463C" />
        <Header topBarPages={visible} topBarLogo={visible} topBarSections>
          <MenuSections>
            <li>
              <LinkNext href="/">
                <a>HOME</a>
              </LinkNext>
            </li>
            <li>
              <a className="pipe">|</a>
            </li>
            <li>
              <Link activeClass="active" to="page1" spy smooth duration={500}>
                O MOTIVO
              </Link>
            </li>
            <li>
              <Link activeClass="active" to="page2" spy smooth duration={500}>
                OS EFEITOS
              </Link>
            </li>
            <li>
              <Link activeClass="active" to="page3" spy smooth duration={500}>
                AS FALHAS
              </Link>
            </li>
            <li>
              <Link activeClass="active" to="page4" spy smooth duration={500}>
                O VAZIO NO CAMPO
              </Link>
            </li>
            <li>
              <Link activeClass="active" to="page5" spy smooth duration={500}>
                A OPORTUNIDADE
              </Link>
            </li>
          </MenuSections>
        </Header>
        <Element name="page1" className="element">
          {gv && <Page1 gv={gv} webLayout={webLayout} />}
        </Element>
        <Element name="page2" className="element">
          {gv && <Page2 gv={gv} webLayout={webLayout} />}
        </Element>
        <Element name="page3" className="element">
          <Page3 />
        </Element>
        <Element name="page4" className="element">
          <Page4 />
        </Element>
        <Element name="page5" className="element">
          <Page5 />
        </Element>
        <Footer />
      </>
    );
  }
}

SinglePage.propTypes = {
  numberPage: PropTypes.string.isRequired,
};

export default SinglePage;
