import React, { Fragment, useState } from "react";
import { render } from "react-dom";
import classNames from "classnames";
import styled, { ThemeProvider } from "styled-components";

import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'

import Delta from './Delta'


const Bar = styled.div`
  background: ${({ theme }) => theme.primary.main};
  color: ${({ theme }) => theme.primary.contrastText};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 8px;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  div {
    margin: 0 auto;
    max-width: 1240px;
    display: flex;
    align-items: flex-end;
  }

  transition: top 0.2s;
  &.isMobile {
    top: -${({ links }) => links * 50}px;
  }
  &.isMobile.isMenuOpen {
    top: 0;
  }
`

const Buttons = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 50px;

  button, a {
    all: unset;

    fill: ${({ theme }) => theme.primary.contrastText}
    background-color: ${({ theme }) => theme.primary.light}
    display: flex;
    align-items: center;

    padding: 0 10px;
    margin: 0 1px;
    height: 100%;

    :hover {
      cursor: pointer;
    }
  }

  transition: flex 0.5s ease-in-out;
  flex: 1;
  &.search {
    flex: 20;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;

  a {
    color: ${({ theme }) => theme.primary.contrastText};
    text-decoration: none;

    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    white-space: nowrap;
  }

  transition: max-width 0.1s ease-in-out, margin-left 0.1s ease-in-out, opacity 0.5s ease-in-out;
  max-width: 100%;
  opacity: 1;
  flex: 20;
  &.isSearchOpen {
    overflow: hidden;
    flex: 1;
    opacity: 0;
    max-width: 0;
    margin-left: 0;
  }

  &.isMobile {
    padding-bottom: 50px;
    overflow: visible;
    flex-direction: column;
    align-items: flex-start;
  }
`;



const TopBar = ({
  isMobile,
  isSearchOpen,
  toggleSearch,
  setSearchString,
  isMenuOpen,
  toggleMenu,
  config,
  barRef,
  children: searchbar
  }) =>
  <Bar className={classNames({ isMobile, isMenuOpen })} links={config.links.length}>
    <div ref={barRef}>
      <Buttons style={{flex: 0}}>
        <a href="/"><Delta /></a>
      </Buttons>
      <List className={classNames({ isMobile, isSearchOpen })}>
        {(config.links || []).map(link =>
          React.isValidElement(link) ?
            React.cloneElement(link, {
              key: link.to,
              children: link.props.children.toUpperCase()
            })
          :
            <a href={link.href} key={link.href}>
              {link.barStr || link.str.toUpperCase()}
            </a>
          )}
      </List>
      <Buttons className={classNames({ isSearchOpen })}>
        <button onClick={e => toggleSearch()}><Search /></button>
        {searchbar}
        {isMobile && <button onClick={e => toggleMenu()}><Menu /></button>}
        {config.login_href && <a href={config.login_href}>{config.login_text}</a>}
      </Buttons>
    </div>
  </Bar>

export default TopBar
