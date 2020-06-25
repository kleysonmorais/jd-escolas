import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ className }) => (
  <img className={className} src="/logo.svg" alt="NSC logo" />
);

Logo.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
};

export default Logo;
