import React, { Fragment } from 'react'

import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'

import styled from 'styled-components'

import Delta from './Delta'

const Bar = styled(props =>
  <div {...props} >
    <div>
      {props.children}
    </div>
  </div>)`
  background-color: ${props => props.theme.primary.main};
  font-family: Lato, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 8px;
  height: 50px;
  & > div {
    padding: 0;
    margin: 0 auto;
    max-width: 1240px;
    position: relative;
    display: flex;
    & svg {
      fill: ${props => props.theme.primary.contrastText}
      background-color: ${props => props.theme.primary.light}
    }
  }
`

const Links = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin-left: 5px;
    height: 50px;
    color: ${props => props.theme.primary.contrastText};
    text-decoration: none;
    cursor: pointer;
  }
  & a:hover {
    background-color: ${props => props.theme.primary.light};
  }
`

const Buttons = styled.div`
  display: flex;
  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin-left: ${props => props.left ? 0 : 5}px;
    margin-right: ${props => props.right ? 0 : 5}px;
    height: 50px;
    color: ${props => props.theme.primary.contrastText};
    background-color: ${props => props.theme.primary.light};
    text-transform: uppercase;
    font-size: 14px;
  }
`

const TopBar = ({ config, expandSearch, expandMenu }) =>
  <Bar>
    <Buttons left>
      <a href='/' style={{ width: '50px'}}>
        <Delta />
      </a>
    </Buttons>

    <Links>
      {
        config.links.map(link =>
          React.isValidElement(link) ?
            React.cloneElement(link, {
              key: link.to,
              children: link.props.children.toUpperCase()
            })
          :
            <a href={link.href}>
              {link.barStr || link.str.toUpperCase()}
            </a>
          )
      }
    </Links>

    <Buttons side='right'>
      { false ?
        <a onClick={expandMenu}>
          <Menu />
        </a>
        :
        <Fragment>
          <a onClick={expandSearch}>
            <Search />
          </a>
          {
            config.login_href && config.login_text &&
              <a href={config.login_href}>
                {config.login_text}
              </a>
          }
        </Fragment>
      }

    </Buttons>
  </Bar>

export default TopBar
