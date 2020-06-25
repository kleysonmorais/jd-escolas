import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import queue from 'async/queue';

import { isClient, isProduction } from 'app/lib/func';

// const isProduction = () => true

// const fetched = []
const concurrency = 3;

export const prefetcher = queue(async (href, cb) => {
  if (isClient() && isProduction()) {
    try {
      await global.fetch(href);
    } catch (e) {
      // ignore any errors on prefetching - it's just a performance improvement process.
    }
  }

  cb();
}, concurrency);

/**
 * Prefetched enabled version of 'a' tag.
 *
 * @TODO: once the site goes live, it is probably better to start
 * using Next.js default routing component, 'next/link', but for now
 * as it's prefetching logic does not fetch data - and our pages rely on
 * data prior to rendering - it isn't suitable. Performance is better
 * achieved currently on relying on the CDN response of each page's raw
 * response.
 */
class Link extends React.PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    href: PropTypes.string,
  };

  componentDidMount() {
    // @TODO: should we enable link prefetching "on-demand"? Maybe on mouse hover...
    // if (this.props.href && fetched.indexOf(this.props.href) === -1) {
    //   const a = document.createElement('a')
    //   a.href = this.props.href
    //
    //   if (a.host === window.location.host && a.pathname !== window.location.pathname) {
    //     fetched.push(this.props.href)
    //     prefetcher.push(this.props.href)
    //   }
    // }
  }

  render() {
    // eslint-disable-next-line
    return <a {...this.props} />;
  }
}

export default styled(Link).attrs({ className: 'Link' })``;
