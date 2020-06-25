import React, { Component } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { radioUpdate } from 'app/redux/actions/radioAction';

class DashboardResultadoAluno extends Component {
  state = {
    estado: '',
    cidade: '',
    cities: [],
    schools: [],
    school: '',
  };

  async componentDidMount() {
    const { onChange, dataCombo, radioValue } = this.props;
    const estado = dataCombo[0].state;
    const cidade = dataCombo[0].cities[0].city;
    const school = dataCombo[0].cities[0].schools[0];
    this.setState({
      estado: dataCombo[0].state,
      cidade,
      cities: dataCombo[0].cities,
      school,
      schools: dataCombo[0].cities[0].schools,
    });
    onChange(estado, cidade, school, radioValue);
  }

  handleChangeEstado = event => {
    const { onChange, dataCombo, radioValue } = this.props;
    const estado = event.target.value;
    const { cities } = dataCombo.find(row => row.state === estado);
    const cidade = cities[0];
    const school = cities[0].schools[0];
    this.setState({
      estado,
      cities,
      cidade,
      school,
      schools: cities[0].schools,
    });
    onChange(estado, cidade.city, school, radioValue);
  };

  handleChangeCidade = event => {
    const { onChange, radioValue } = this.props;
    const { estado, cities } = this.state;
    const cidade = event.target.value;
    const { schools } = cities.find(c => c.city === cidade);
    const school = schools[0];
    this.setState({ cidade, schools, school, radioValue });
    onChange(estado, cidade, school, radioValue);
  };

  handleChangeEscola = event => {
    const { onChange, radioValue } = this.props;
    const { estado, cidade } = this.state;
    const school = event.target.value;
    this.setState({ school });
    onChange(estado, cidade, school, radioValue);
  };

  onRadioChange = e => {
    const { onChangeRadio, radioUpdate } = this.props;
    const radioButton = +e.target.value;
    radioUpdate(radioButton);
    onChangeRadio(radioButton);
  };

  render() {
    const { estado, cidade, cities, school, schools } = this.state;
    const { dataCombo, dataChart, radioValue } = this.props;
    return (
      <>
        <Row className="pt-4">
          <div className="col-xs-12 col-sm-4">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridStateResultadoAluno">
                  <Form.Control
                    as="select"
                    value={estado}
                    onChange={this.handleChangeEstado}
                  >
                    {dataCombo.map(row => (
                      <option key={row.state} value={row.state}>
                        {row.state}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
          <div className="clearfix visible-xs" />
          <div className="col-xs-12 col-sm-4">
            <Form>
              <Form.Row>
                <Form.Group
                  as={Col}
                  value={cidade}
                  onChange={this.handleChangeCidade}
                  controlId="formGridCityResultadoAluno"
                >
                  <Form.Control as="select">
                    {cities.map(city => (
                      <option key={city.city} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
          <div className="clearfix visible-xs" />
          <div className="col-xs-12 col-sm-4">
            <Form>
              <Form.Row>
                <Form.Group
                  as={Col}
                  value={school}
                  onChange={this.handleChangeEscola}
                  controlId="formGridSchool"
                >
                  <Form.Control as="select">
                    {schools.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Row>
        <br />
        <fieldset>
          <Form.Group as={Row}>
            {dataChart.radioButtonOptions &&
              dataChart.radioButtonOptions.anosIniciais && (
                <>
                  <div className="col-xs-12 col-sm-4">
                    <Form.Check
                      type="radio"
                      label="Alunos dos anos iniciais do fundamental"
                      name="Radios"
                      id="radios1"
                      checked={radioValue === 1}
                      value={1}
                      onChange={this.onRadioChange}
                    />
                  </div>
                  <div className="clearfix visible-xs" />
                </>
              )}
            {dataChart.radioButtonOptions &&
              dataChart.radioButtonOptions.anosFinais && (
                <>
                  <div className="col-xs-12 col-sm-4">
                    <Form.Check
                      type="radio"
                      label="Alunos dos anos finais"
                      name="Radios"
                      id="radios2"
                      checked={radioValue === 2}
                      value={2}
                      onChange={this.onRadioChange}
                    />
                  </div>
                  <div className="clearfix visible-xs" />
                </>
              )}
            {dataChart.radioButtonOptions &&
              dataChart.radioButtonOptions.ensinoMedio && (
                <div className="col-xs-12 col-sm-4">
                  <Form.Check
                    type="radio"
                    label="Alunos do ensino médio (1º e 2º anos)"
                    name="Radios"
                    id="radios3"
                    checked={radioValue === 3}
                    value={3}
                    onChange={this.onRadioChange}
                  />
                </div>
              )}
          </Form.Group>
        </fieldset>
      </>
    );
  }
}

DashboardResultadoAluno.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeRadio: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  radioValue: state.radio.value,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ radioUpdate }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardResultadoAluno);
