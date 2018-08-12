import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'

import Methone from 'methone'

import './index.css'

window.methone_conf = {
  color_scheme: 'dark-blue',
  system_name: 'testSystem-dont_use',
  links: [
    {
      href: '/test',
      str: 'hello'
    },
    <Link to="/other">Other</Link>
  ],
  login_text: 'Logga in',
  login_href: '/login',
  ...window.methone_conf,
  update: config => {
    window.methone_conf = {
      ...window.methone_conf,
      ...config
    }

    const app = <BrowserRouter>
      <Methone config={window.methone_conf} />
    </BrowserRouter>

    ReactDOM.render(app, document.getElementById('methone-container-replace'))
  }
}


window.methone_conf.update()
