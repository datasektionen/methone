import React, { Component, Fragment } from 'react'

import Menu from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'

import styled from 'styled-components'

import Delta from './Delta'

const Bar = styled.div`
  background-color: ${props => props.theme.primary.main};
  transition: all 0.05s;
  font-family: Lato, sans-serif;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 900;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 8px;
`

const MainBar = styled.div`
  padding: 0;
  margin: 0 auto;
  max-width: 1240px;
  position: relative;
  display: flex;
  height: 50px;
  & svg {
    fill: ${props => props.theme.primary.contrastText}
    background-color: ${props => props.theme.primary.light}
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
    border-bottom: 1px solid ${props => props.theme.primary.contrastText};
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
    box-shadow: 0 3px 10px rgba(0, 0, 0, .1);
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
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #e07;
        margin-top: 10px;
        border: 5px solid #e075;
        background-clip: content-box;
      }
      div.text {
        height: var(--size);
        line-height: var(--size);
        padding: 0 15px;
      }
    }
  }
`

const BarMenu = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: block;
    li {
      a {
        color: ${props => props.theme.primary.contrastText};
        display: block;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
      }
    }
  }
`

class TopBar extends Component {
  state = {
    top: 0
  }
  
  barRef = React.createRef()

  dragStartedAt = null
  clickStartedAt = null

  componentDidMount = () => {
    window.addEventListener('touchmove', this.onDrag)
    window.addEventListener('mousemove', this.onDrag)
    document.addEventListener('mouseleave', this.endDrag)
    window.addEventListener('mouseup', this.endDrag)
    window.addEventListener('touchup', this.endDrag)

    console.log(-(this.barRef.current.scrollHeight - 50))
    this.setState({
      top: -(this.barRef.current.scrollHeight - 50)
    })
  }

  startDrag = (e) => {
    const y = (e.touches ? e.touches[0].clientY : e.clientY) || 0
    console.log('Start drag', y)

    this.dragStartedAt = {
      mouse: y,
      top: this.state.top,
    }
    this.clickStartedAt = [e.pageX, e.clientY]
  }

  endDrag = (e) => {
    console.log('End drag', e)
    if (!this.dragStartedAt) {
      return
    }

    const middle = -(this.barRef.current.scrollHeight - 50) / 2

    if (this.state.top < middle) {
      this.setState({ top: middle * 2 })
    } else {
      this.setState({ top: 0 })
    }

    if (this.clickStartedAt) {
      if (this.state.top > -5) {
        this.setState({ top: -(this.barRef.current.scrollHeight - 50) })
      } else {
        this.setState({ top: 0 })
      }
    }
    this.dragStartedAt = null
    this.clickStartedAt = null
  }

  onDrag = (e) => {
    e.preventDefault()
    const y = (e.touches ? e.touches[0].clientY : e.clientY) || 0

    if (this.clickStartedAt) {
      if (Math.abs(e.pageX - this.clickStartedAt[0]) > 5 || Math.abs(y - this.clickStartedAt[1]) > 5) {
        this.clickStartedAt = null
      }
    }
    if (!this.dragStartedAt) {
      return
    }

    const deltaY = this.dragStartedAt.top + y

    const top = Math.max(
      Math.min(0, - this.dragStartedAt.mouse + deltaY), 
      -(this.barRef.current.scrollHeight - 50)
    )

    this.setState({ top })
  }

  render() {
    const { config, isMobile, expandMenu, menuOpen, expandSearch, searchOpen, linksRef } = this.props
    const links = config.links.map(link =>
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

    return (
      <>
      <Bar style={{ top: isMobile ? this.state.top : 0 }} ref={this.barRef}>
        <BarMenu>
          <ul>
            {
              links.map(link => <li>{link}</li>)
            }
          </ul>
        </BarMenu>
        <MainBar>
          <Buttons left>
            <a href='/' style={{ width: '50px'}}>
              <Delta />
            </a>
          </Buttons>

          <Links ref={linksRef} className={searchOpen ? 'hide-me' : ''} style={{ visibility: isMobile ? 'hidden' : 'visible'}}>
            {
              links
            }
          </Links>

          <SearchField className={!searchOpen ? 'hide-me' : ''}>
            <input type="text" placeholder="Search content..." />
          </SearchField>

          <Buttons right>
            { isMobile ?
              <button 
                onClick={expandMenu} 
                onMouseDown={this.startDrag}
                onTouchStart={this.startDrag}
              >
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
        </MainBar>
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
}

export default TopBar
