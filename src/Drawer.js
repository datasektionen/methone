import React, { Component } from 'react'

import { Home, Person } from 'material-ui-icons'

import './Drawer.css'

import Overlay from './Overlay'
import Search from './Search'

export default class Drawer extends Component {
  render() {
    const { open, config } = this.props
    const { lighter, darker, text } = this.props.color_scheme

    const gradient = `linear-gradient(45deg, ${lighter} 0%, ${darker} 100%)`

    return <Overlay {...this.props} >
      <div className={`drawer ${open ? 'open' : ''}`}>
        <div className='block' style={{ background: gradient, color: text }}>
          {config.system_name}
        </div>

        <Search {...this.props} />

        <h4>
          Navigation
        </h4>
        <ul>
          <li className='link' onClick={() => window.location.href='/'} >
            <Home className='icon' />
            <span className='text'>Hem</span>
          </li>
          {this.props.config.links.map(item =>
            item && item.props ? (
              <li class='link' key={item.props.to} onClick={requestClose} >
                <div className='icon'></div>
                <span className='text'>{item}</span>
              </li>
              ) : (
              <li className='link' key={item.href} onClick={() => window.location.href=item.href} >
                <div className='icon'></div>
                <span className='text'>{item.str}</span>
              </li>))}

          <li className='link' onClick={() => window.location.href=config.login_href} >
            <Person className='icon' />
            <span className='text'>{config.login_text}</span>
          </li>
        </ul>
      </div>
    </Overlay>
  }
}
