import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { pathOr, pipe, map, applySpec } from 'ramda';
import { withTheme } from 'styled-components';

import { getIconTypeByUrl } from 'app/styleguide/components/Icon';

const MenuLinkFragment = gql`
  fragment MenuLink on MenuLink {
    label
    url {
      path
    }
  }
`;

const query = gql`
  query HeaderMenu($name: String!) {
    menu: menuByName(name: $name) {
      links {
        ...MenuLink
        links {
          ...MenuLink
          links {
            ...MenuLink
          }
        }
      }
    }
    socialLinks: menuByName(name: "social-medias-menu") {
      links {
        ...MenuLink
      }
    }
  }
  ${MenuLinkFragment}
`;

const normalize = pathOr([], ['data', 'menu', 'links']);

const normalizeSocialLinks = pipe(
  pathOr([], ['data', 'socialLinks', 'links']),
  map(
    applySpec({
      url: prop => prop.url.path,
      name: prop => getIconTypeByUrl(prop.url.path),
    })
  )
);

const MenuContainer = ({ children, ...props }) => {
  const menu = normalize(props);
  const socialLinks = normalizeSocialLinks(props);
  return children({ menu, socialLinks, ...props });
};

export default compose(
  graphql(query, {
    options: props => {
      const channel = pathOr(
        'nsc-category-menu',
        ['theme', 'config', 'header', 'menu', 'name'],
        props
      );
      return {
        variables: {
          name: channel,
        },
      };
    },
  })
)(MenuContainer);
