import React from 'react';
import styled from 'styled-components';
import Container from 'app/styleguide/components/Container';
import { gql } from 'apollo-boost';
import { SECOND_COLOR } from 'app/modules/SinglePage/pages/styles';
import { useQuery } from '@apollo/react-hooks';
import { normalizeMenu } from '../../lib/normalize';

const TopBarContainer = styled.div`
  /* position: fixed; */
  background-color: ${SECOND_COLOR};
  width: 100%;
  padding: 0;
  border-bottom: 1px solid #e1e0e0;
`;

const WrapperFlex = styled(Container)`
  display: flex;
  justify-content: space-between;
`;
const ListItems = styled.ul`
  margin: 0px;
  margin-left: -20px;
  padding: 0px;
  overflow: hidden;
  list-style-type: none;
`;
const ItemTopBar = styled.li`
  float: left;
  font-size: 17px;
  font-weight: bolder;
  position: relative;

  &:not(:last-child) {
    margin-right: -2px;
  }

  &:first-child::before {
    content: none;
  }

  a {
    display: block;
    color: #767676;
    text-align: center;
    padding: 10px 20px;
    text-decoration: none;
  }

  a:hover {
    /* background-color: #ddd; */
    color: #c9463c;
  }

  &::before {
    content: '';
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 2px;
    height: 14px;
    background-color: #dedede;
    left: 0px;
  }
`;

const TopbarQuery = gql`
  query TopbarQuery {
    menuItems: menuByName(name: "menu-topbar") {
      links {
        label
        url {
          path
        }
        newTab
      }
    }
  }
`;

const TopBarPages = () => {
  const { data, loading, error } = useQuery(TopbarQuery);
  if (loading || error || !data) return <></>;
  const menuItems = normalizeMenu(data.menuItems);
  return (
    <TopBarContainer>
      <WrapperFlex>
        <ListItems>
          {menuItems.map(item => (
            <ItemTopBar key={item.url} name={item.label}>
              <a target={item.newTab ? '_blank' : '_self'} href={item.url}>
                {item.label}
              </a>
            </ItemTopBar>
          ))}
        </ListItems>
      </WrapperFlex>
    </TopBarContainer>
  );
};

export default TopBarPages;
