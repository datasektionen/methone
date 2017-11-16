import React, {Component} from 'react'

import './Overlay.css'

export default class Overlay extends Component {
  constructor(props) {
    super(props)

    this.closeHandler = this.closeHandler.bind(this)
  }

  closeHandler(e) {
    if(e.target.classList.contains('overlay')) {
      e.stopPropagation()
      e.preventDefault()
      this.props.requestClose()
    }
  }

  render() {
    return <div className={`overlay ${this.props.open ? 'open' : ''}`} onMouseDown={this.closeHandler} >
        {this.props.children}
    </div>
  }
}
