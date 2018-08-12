import React from 'react'

import withTheme from '@material-ui/core/styles/withTheme'
import Menu from '@material-ui/icons/Menu'

import Delta from './Delta'

function TopBar({ theme, config, isMobile, openDrawer }) {
  const { main, light, contrastText } = theme.palette.primary
  const innerStyle = {
    lineHeight: "normal",
    padding: 0,
    margin: "auto",
    maxWidth: 1240,
    position: "relative"
  }
  const barStyle = {
    lineHeight: "normal",
    backgroundColor: main,
    fontFamily: "Lato, Arial",
    position: "fixed",
    right: 0,
    left: 0,
    top: 0,
    zIndex: 900,
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 8px"
  }
  const linkStyle = {
    display: "inline-block",
    fontSize: 15,
    lineHeight: 1.2,
    letterSpacing: "0.5px",
    color: contrastText,
    textDecoration: "none",
    padding: "16px 11px 16px 11px",
    cursor: "pointer"
  }
  const menuStyle = {
    display: "inline-block",
    verticalAlign: "top",
    marginLeft: 10
  }
  const loginStyle = {
    display: "inline-block",
    position: "absolute",
    right: 0,
    top: 0
  }
  const loginLinkStyle = {
    padding: "17px 16px 16px 16px",
    color: contrastText,
    display: "block",
    backgroundColor: light,
    textTransform: "uppercase",
    fontSize: 14,
    height: 50,
    boxSizing: 'border-box'
  }

  const loginButton = config.login_text &&
    <a style={loginLinkStyle}
      href={config.login_href}>
      {config.login_text}
    </a>

  const mobileNavigation =
    <a style={loginLinkStyle}
      onClick={openDrawer}>
      <Menu style={{color: contrastText, marginTop: -4}} />
    </a>

  const links = config.links.map(item =>
    React.isValidElement(item) ?
      React.cloneElement(item, {
        style: linkStyle,
        key: item.to,
        children: item.props.children.toUpperCase()
      })
    :
      <a key={item.href}
        href={item.href}
        style={linkStyle}>
        {item.barStr || item.str.toUpperCase()}
      </a>
  )

  return (
    <div style={barStyle}>
      <div style={innerStyle}>
        <Delta
          deltaBackground={light}
          foreground={contrastText}
        />
        <div style={menuStyle}>
          {!isMobile && links}
        </div>
        <div style={loginStyle}>
          {
            isMobile ?
            <a style={loginLinkStyle}
              onClick={openDrawer}>
              <Menu style={{color: contrastText, marginTop: -4}} />
            </a>
            :
            config.login_text &&
            <a style={loginLinkStyle}
              href={config.login_href}>
              {config.login_text}
            </a>
          }
        </div>
      </div>
    </div>
  )
}

export default withTheme()(TopBar)
