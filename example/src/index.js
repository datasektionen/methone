import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'

import Methone from 'methone'

// This is an example that can be used during development

window.methone_conf = {
  color_scheme: 'dark-blue',
  system_name: 'Example',
  links: [
    <Link to="/info">Info</Link>
  ],
  login_text: 'Login',
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
