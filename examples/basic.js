import React from 'react';
import ReactDOM from 'react-dom';
import Methone from 'methone'

const config = {
  color_scheme: 'money_green',
  system_name: 'testSystem-dont_use',
  links: [{str: 'hello', href: '#'}],
  login_text: 'Logga in',
  login_href: '/login'
}

ReactDOM.render(<Methone config={config} />, document.getElementById('__react-content'))
