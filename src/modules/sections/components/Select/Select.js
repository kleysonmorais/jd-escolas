import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const Section = styled.div`
  text-align: center;
`;

const CustomSelect = styled.select`
  position: relative;
  margin-bottom: 2%;
  background-color: #333333;
  font-size: 25px;
  padding: 5px;
  color: #ff6915;
  border: 2px solid #ccc;
  border-radius: 4px;
  height: 55px;
  width: 40vw;

  @media only screen and (max-width: 600px) {
    & {
      width: 50vw;
    }
  }
`;

const OptionCustom = styled.option``;

const SelectItem = () => (
  <Container>
    <Section>
      <CustomSelect>
        <OptionCustom value="0">STATE</OptionCustom>
        <OptionCustom value="1">Santa Catarina</OptionCustom>
        <OptionCustom value="2">São Paulo</OptionCustom>
        <OptionCustom value="5">Paraná</OptionCustom>
      </CustomSelect>
      <br />
      <CustomSelect>
        <option value="0">CITY</option>
        <option value="1">Florianópolis</option>
        <option value="2">São Paulo</option>
        <option value="5">Curitiba</option>
      </CustomSelect>
    </Section>
  </Container>
);

export default SelectItem;
