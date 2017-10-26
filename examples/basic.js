import React from 'react';
import ReactDOM from 'react-dom';
import Methone from 'methone'

const config = {
  color_scheme: 'dark-blue',
  system_name: 'testSystem-dont_use',
  links: [],
  login_text: 'Logga in',
  login_href: '/login'
}

ReactDOM.render(<Methone config={config} />, document.getElementById('__react-content'))
