import React from 'react';
import ReactDOM from 'react-dom';

import Methone from './Methone';

window.methone_conf = {
  color_scheme: 'cerice',
  system_name: 'testSystem-dont_use',
  links: [],
  login_text: '',
  login_href: '',
  ...window.methone_conf,
  update: config => {
    window.methone_conf = {
      ...window.methone_conf,
      ...config
    }

    ReactDOM.render(<Methone config={window.methone_conf} />, document.getElementById('methone-container-replace'));
  }
}
