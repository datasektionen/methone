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
  & div {
    line-height: normal;
    padding: 0;
    margin: auto;
    max-width: 1240px;
    height: 50px;
    position: relative;

    & svg {
      fill: ${props => props.theme.primary.contrastText}
      background-color: ${props => props.theme.primary.light}
    }
  }
`

const Links = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  & a {
    display: inline-block;
    font-size: 15px;
    line-height: 1.2px;
    letter-spacing: 0.5px;
    color: ${props => props.theme.primary.contrastText};
    text-decoration: none;
    padding: 16px 11px 16px 11px;
    cursor: pointer;
  }
`

const Buttons = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  & a {
    padding: 17px 16px 16px 16px;
    color: ${props => props.theme.primary.contrastText};
    display: inline-block;
    background-color: ${props => props.theme.primary.light};
    text-transform: uppercase;
    font-size: 14px;
    height: 50px;
    box-sizing: border-box;
  }
`

const TopBar = ({ config, expandSearch, expandMenu }) =>
  <Bar>
    <Buttons>
      <a href='/'><Delta /></a>
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

    <Buttons>
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
