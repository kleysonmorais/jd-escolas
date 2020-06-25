import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonImg = styled.button`
  background-color: transparent;
  border-color: transparent;
`;

const FlagLanguage = ({ lang, onClick }) => {
  return (
    <ButtonImg onClick={onClick}>
      <img
        src={'/country-flag/'.concat(lang).concat('.svg')}
        alt={lang}
        height="34"
      />
    </ButtonImg>
  );
};

FlagLanguage.propTypes = {
  lang: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

FlagLanguage.defaultProps = {
  lang: 'pt',
};

export default FlagLanguage;
