# methone

> The worlds first Top-Bar-as-a-Service

## Install

```bash
npm install --save methone
```

## Usage

```jsx
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Methone from 'methone'

class Example extends Component {
  render () {
    const config = {
      color_scheme: 'dark-blue',
      system_name: 'Example',
      links: [
        <Link to="/info">Info</Link>
      ],
      login_text: 'Login',
      login_href: '/login',
    }
    return (
      <Methone config={config} />
    )
  }
}
```
