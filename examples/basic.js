import React from 'react';
import ReactDOM from 'react-dom';
import Methone from 'methone'

const config = {
  color_scheme: 'dark-blue',
  system_name: 'testSystem-dont_use',
  links: [
    {
      'str': 'Test link dont click',
      'href': '#'
    },
    {
      'str': 'Another link',
      'href': '#test'
    }
  ],
  login_text: 'Logga in',
  login_href: '/login'
}

ReactDOM.render(
<div>
  <link href="//aurora.datasektionen.se" rel="stylesheet" type="text/css" />

  <Methone config={config} />

  <div id="application" className="dark-blue" style={{paddingTop: 0}}>
    <header>
      <div className="header-inner">
        <div className="row">
          <div className="col-md-8">
              <h2>Methone</h2>
          </div>
        </div>
      </div>
    </header>
  </div>
</div>, document.getElementById('__react-content'))
