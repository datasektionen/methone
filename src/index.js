import React from 'react';
import ReactDOM from 'react-dom';

import Methone from './Methone';

const config = {
  color_scheme: 'dark_blue',
  system_name: 'testSystem-dont_use',
  links: [
    {
      str: 'Hem',
      href: '/'
    },
    {
      str: 'Nominera',
      href: '/nominate'
    }
  ],
  login_text: 'Logga in',
  login_href: '/login'
}

ReactDOM.render(<Methone config={config} />, document.getElementById('root'));
