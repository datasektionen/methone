import React, { Fragment } from 'react'

import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'

import styled from 'styled-components'

import Delta from './Delta'

const Bar = styled(React.forwardRef((props, ref) =>
  <div {...props} ref={ref}>
    <div>
      {props.children}
    </div>
  </div>))`
  background-color: ${props => props.theme.primary.main};
  font-family: Lato, sans-serif;
  position: fixed;
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
  transition: opacity 0.25s, flex-grow 0.25s, max-width 0.25s !important;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 100%;
  overflow-x: hidden;
  opacity: 1;
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
    white-space: nowrap;
  }
  & a:hover {
    background-color: ${props => props.theme.primary.light};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  &.hide-me {
    flex: 0;
    opacity: 0;
  }
`

const SearchField = styled.div`
  transition: opacity 0.25s, flex 0.25s, max-width 0.25s !important;
  display: flex;
  align-items: center;
  max-width: 100%;
  flex: 1;

  & input {
    background: transparent;
    color: ${props => props.theme.primary.contrastText};
    border: none;
    height: 40px;
    margin: 0;
    border-bottom: 1px solid #fff;
    padding: 0 10px;
    box-shadow: none;
    display: block;
    width: 100%;
    opacity: 1;
    transition: opacity 0.25s, flex-grow 0.25s !important;

    &::placeholder {
      color: ${props => props.theme.primary.contrastText};
      opacity: 0.6;
    }
  }
  &.hide-me {
    flex: 0;
    max-width: 0;
  }
  &.hide-me input {
    opacity: 0;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-self: end;
  & a, & button {
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
    &:hover {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
  }
`

const SearchResults = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  ul {
    display: block;
    max-width: 1240px;
    margin: 0 auto;
    padding: 10px 0;
    background: #fff;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    list-style-type: none;
    li {
      padding: 5px 20px;
      cursor: pointer;
      --size: 40px;
      &:hover {
        background: #eee;
      }
      &:visited {
        color: #508;
      }
      display: flex;
      div.ball {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        background: #e07;
      }
      div.text {
        height: var(--size);
        line-height: var(--size);
        padding: 0 15px;
      }
    }
  }
`

const TopBar = (props) => {
  const { config, isMobile, expandMenu, menuOpen, expandSearch, searchOpen, barRef } = props
  console.log(props)
  return (
    <>
    <Bar ref={barRef}>
      <Buttons left>
        <a href='/' style={{ width: '50px'}}>
          <Delta />
        </a>
      </Buttons>

      <Links className={searchOpen ? 'hide-me' : ''}>
        {
          !isMobile &&
          config.links.map(link =>
            React.isValidElement(link) ?
              React.cloneElement(link, {
                key: link.to,
                children: link.props.children.toUpperCase()
              })
            :
              <a href={link.href} key={link.href}>
                {link.barStr || link.str.toUpperCase()}
              </a>
            )
        }
      </Links>

      <SearchField className={!searchOpen ? 'hide-me' : ''}>
        <input type="text" placeholder="Search content..." />
      </SearchField>

      <Buttons right>
        { isMobile ?
          <button onClick={expandMenu}>
            <Menu />
          </button>
          :
          <button onClick={expandSearch}>
            <Search />
          </button>
        }
        {
          config.login_href && config.login_text &&
            <a href={config.login_href}>
              {config.login_text}
            </a>
        }
      </Buttons>
    </Bar>
    <SearchResults>
    <ul>
      <li>
        <div className="ball">

        </div>
        <div className="text">
          Skriv bara någon text
        </div>
      </li>
      <li>
        <div className="ball">

        </div>
        <div className="text">
          Skriv bara någon text
        </div>
      </li>
    </ul>
    </SearchResults>
    </>
    )
}

export default TopBar
