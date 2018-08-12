import React, { Fragment } from 'react'

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Avatar
} from '@material-ui/core'

import Fuse from 'fuse.js'

const fuseOptions = {
  keys: ['str']
}

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      results: [],
      active: 0,
    }

    this.fuse = new Fuse(this.props.fuzzes, fuseOptions)

    this.resetState = this.resetState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  resetState() {
    this.setState({results: this.props.isMobile ? [] : this.fuse.list, active: 0})
  }

  componentDidMount() {
    this.resetState()
  }

  handleChange(event) {
    const results = this.fuse.search(event.target.value)
    this.setState({results, active: 0})
  }

  handleKeyDown(event) {
    const { active, results } = this.state
    if(event.keyCode === 40 || (event.keyCode === 9 && !event.shiftKey)) { //tab or down
      const newActive = (active + 1) % results.length
      this.setState({active: newActive})
      event.preventDefault()
      event.stopPropagation()
    }
    else if(event.keyCode === 38 || (event.keyCode === 9 && event.shiftKey)) { // up or shift-tab
      const newActive = (results.length + active - 1) % results.length
      this.setState({active: newActive})
      event.preventDefault()
      event.stopPropagation()
    }
    else if(event.keyCode === 13 && results[active]) { // enter
      window.location.href = results[active].href
    }
  }

  render() {
    const { results } = this.state
    return (
      <div>
        <input
          placeholder="Sök på Datasektionen..."
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          ref={input => !this.props.isMobile && input && input.focus()}
          style={{width: '100%', padding: '15px'}} />
        {results.length > 0 &&
          <List>
            <Fragment>
              <ListSubheader>
                {results.length} result{results.length !== 1 ? "s" : false }
              </ListSubheader>
              {results.map((result, index) =>
                <ListItem button
                  key={result.str}
                  tabIndex={index}
                  onMouseEnter={() => this.setState({active: index})}
                  style={this.state.active === index ? {backgroundColor: 'rgba(0, 0, 0, 0.12)'} : {}}
                  onClick={() => window.location.href = result.href} >
                  <ListItemAvatar>
                    {result.image
                      ? <div style={{
                        background: 'url(' + result.image + ')',
                        borderRadius: '20px',
                        backgroundSize: 'cover',
                        height: '40px',
                        width: '40px'}} >
                      </div>
                      : result.color &&
                        <Avatar style={{backgroundColor:result.color}} />
                    }
                  </ListItemAvatar>
                  <ListItemText disableTypography>
                    {result.name}
                  </ListItemText>
                </ListItem>
              )}
            </Fragment>
          </List>
        }
      </div>
      )
  }
}

export default Search
