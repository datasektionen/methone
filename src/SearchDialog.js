import React, {Component} from 'react'

import './SearchDialog.css'

import Search from './Search'
import Overlay from './Overlay'

export default class SearchDialog extends Component {
  render() {
    const { open, requestClose, fuzzes } = this.props
    return <Overlay {...this.props}>
      <div className={`dialog ${open ? 'open' : ''}`}>
        <Search {...this.props} />
      </div>
    </Overlay>
  }
}
