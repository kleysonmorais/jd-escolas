import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  getChannelLogoPath,
  channelIdFromTheme,
} from 'app/styleguide/lib/helpers';

const ChannelLogo = ({
  channel,
  variation,
  className,
  fromTheme = false,
  theme,
}) => (
  // eslint-disable-next-line react/jsx-fragments
  <Fragment>
    {variation && fromTheme ? (
      <img
        src={getChannelLogoPath(channelIdFromTheme(theme), variation)}
        className={className}
        alt={channelIdFromTheme(theme)}
      />
    ) : (
      <img
        src={getChannelLogoPath(channel, variation)}
        className={className}
        alt={channel}
      />
    )}
  </Fragment>
);

ChannelLogo.propTypes = {
  // eslint-disable-next-line
  className: PropTypes.string,
  // eslint-disable-next-line
  channel: PropTypes.string,
  // eslint-disable-next-line
  variation: PropTypes.string.isRequired,
  // eslint-disable-next-line
  fromTheme: PropTypes.bool,
  // eslint-disable-next-line
  theme: PropTypes.object,
};

export default ChannelLogo;
