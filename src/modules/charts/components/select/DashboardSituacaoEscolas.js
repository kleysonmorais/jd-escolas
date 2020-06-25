import React, { Component } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class SelectCombo extends Component {
  state = {
    estado: '',
    cidade: '',
    cities: [],
  };

  async componentDidMount() {
    const { onChange, dataCombo } = this.props;
    const cidade = dataCombo[0].cities[0];
    const estado = dataCombo[0].state;
    this.setState({
      estado: dataCombo[0].state,
      cidade,
      cities: dataCombo[0].cities,
    });
    onChange(estado, cidade);
  }

  handleChangeEstado = event => {
    const { onChange, dataCombo } = this.props;
    const estado = event.target.value;
    const { cities } = dataCombo.find(row => row.state === estado);
    const cidade = cities[0];
    this.setState({ estado, cities, cidade });
    onChange(estado, cidade);
  };

  handleChangeCidade = event => {
    const { onChange } = this.props;
    const { estado } = this.state;
    const cidade = event.target.value;
    this.setState({ cidade });
    onChange(estado, cidade);
  };

  render() {
    const { estado, cidade, cities } = this.state;
    const { dataCombo } = this.props;
    return (
      <>
        <Row className="pt-4">
          <div className="col-xs-12 col-sm-6">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
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
          <div className="col-xs-12 col-sm-6">
            <Form>
              <Form.Row>
                <Form.Group
                  as={Col}
                  value={cidade}
                  onChange={this.handleChangeCidade}
                  controlId="formGridCity"
                >
                  <Form.Control as="select">
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Row>
      </>
    );
  }
}

SelectCombo.propTypes = {
  onChange: PropTypes.func.isRequired,
};
