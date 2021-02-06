import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'

import Methone, { Header } from 'methone'

// This is an example that can be used during development

const Example = () => {
  
  const methone_conf = {
    color_scheme: 'cerise',
    system_name: 'Example',
    links: [
      <Link to="/info" key="info">Info</Link>,
      {
        str: 'Test text',
        href: '/more/test'
      },
      {
        str: 'Other text that is long',
        href: '/more/text'
      },
      {
        str: 'Another one',
        href: '/another/one'
      },
    ],
    login_text: true ? "Login" : "Log out",
    login_href: true ? "/login" : "/logout",
  }

  return (
    <BrowserRouter>
      <div id="application" className="cerise">
        <Methone config={methone_conf} />
        <Header title="Methone" action={{onClick: _ => alert("Hej!"), text: "Test"}}>
          <Link to="#">« Tillbaka</Link>
        </Header>
        <div style={{width: "100%", justifyContent: "center", alignItems: "center", display: "flex"}}>
          <CodeExample />
        </div>
      </div>
    </BrowserRouter>
  )
}

const CodeExample = () => {
  return (
    <pre style={{width: "100%"}}>{`
# methone

> The worlds first Top-Bar-as-a-Service

## Install


npm install --save git+https://github.com/datasektionen/Methone.git

## Usage (React example, functional component)
----------------------------------------------------------------------
import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import Methone, { Header } from 'methone'

class Example = () => {
  const config = {
    color_scheme: 'cerise',
    system_name: 'Example',
    links: [
      <Link to="/info">Info</Link>
    ],
    login_text: 'Login',
    login_href: '/login',
  }

  return (
    <BrowserRouter>
      <div id="application" className="cerise">
        <Methone config={config} />
        <Header title="Methone" action={{onClick: _ => alert("Hej!"), text: "Test"}}> // Action optional, don't pass props to not render
          <Link to="#">« Tillbaka</Link> // Optional
        </Header>
        <div>
          // ...body here
        </div>
      </div>
    </BrowserRouter>
  )
}
----------------------------------------------------------------------
    `}</pre>
  )
}

ReactDOM.render(<Example />, document.getElementById('methone-container-replace'))
