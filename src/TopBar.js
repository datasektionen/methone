import React from 'react';

import { Menu } from 'material-ui-icons';

import './TopBar.css'
import Delta from './Delta'

class TopBar extends React.Component {
  render() {
    const { config, isMobile, requestOpen } = this.props
    const { darker, lighter, text } = this.props.color_scheme

    return (
      <div className='topbar' style={{color: text, backgroundColor: darker}}>
        <div>
          <Delta background={lighter} foreground={text} />
          <div className='menu'>
            { !isMobile ?
              config.links.map(item =>
                item.props ?
                  <span key={item.href}>{item}</span>
                :
                  <a key={item.href} href={item.href}>
                    {item.barStr || item.str.toUpperCase()}
                  </a>)
            : false }
          </div>
          <div className='login' style={{ backgroundColor: lighter}}>
            { isMobile ?
              <a onClick={ requestOpen }>
                  <Menu style={{color: text, marginTop: -4}} />
              </a>
            : config.login_text ?
              <a href={ config.login_href } >
                  { config.login_text }
              </a>
            : false }
          </div>
        </div>
      </div>
    )
  }
}

export default TopBar;
