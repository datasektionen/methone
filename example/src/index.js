import React from 'react'
import ReactDOM from 'react-dom'

import Methone from 'methone'

import './index.css'

window.methone_conf = {
  color_scheme: 'dark-blue',
  system_name: 'testSystem-dont_use',
  links: [
    {
      href: '/test',
      str: 'hello'
    }
  ],
  login_text: 'Logga in',
  login_href: '/login',
  ...window.methone_conf,
  update: config => {
    window.methone_conf = {
      ...window.methone_conf,
      ...config
    }

    ReactDOM.render(<Methone config={window.methone_conf} />, document.getElementById('methone-container-replace'))
  }
}


window.methone_conf.update()
