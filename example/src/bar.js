import React from 'react'
import ReactDOM from 'react-dom'

import Methone from 'methone'

window.methone_conf = {
  color_scheme: 'cerise',
  system_name: 'Unconfigured System',
  links: [],
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
