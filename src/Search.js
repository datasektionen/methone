import React from 'react';

import Fuse from 'fuse.js';

import './Search.css'

const fuseOptions = {
  keys: ['str']
}

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      active: 0,
    }

    this.fuse = new Fuse(this.props.fuzzes, fuseOptions);

    this.resetState = this.resetState.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  resetState() {
    this.setState({results: this.props.isMobile ? [] : this.fuse.list, active: 0});
  }

  componentDidMount() {
    this.resetState();
  }

  handleChange(event) {
    const results = this.fuse.search(event.target.value);
    this.setState({results, active: 0});
  }

  handleKeyDown(event) {
    const { active, results } = this.state
    if(event.keyCode === 9 || event.keyCode === 40) { //tab or down
      const newActive = (active + 1) % results.length;
      this.setState({active: newActive});
      event.preventDefault();
      event.stopPropagation();
    }
    else if(event.keyCode === 38) { // up
      const newActive = (results.length + active - 1) % results.length;
      this.setState({active: newActive});
      event.preventDefault();
      event.stopPropagation();
    }
    else if(event.keyCode === 13) { // enter
      window.location.href = results[active].href;
    }
  }

  render() {
    const { results, active } = this.state
    return <div className='search'>
      <input placeholder="Sök på Datasektionen..."
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            ref={input => !this.props.isMobile && input && input.focus()} />
      { results.length ? <div>
        <div className='info'>
          { results.length } result{ results.length !== 1 ? "s" : false }
        </div>
        <ul>
          { results.map((result, index) => <li
              className={`result ${active == index ? 'active' : ''}`}
              key={result.str}
              tabIndex={index}
              onMouseEnter={() => this.setState({active: index})}
              onClick={() => window.location.href = result.href} >
            { result.image ?
              <div class='avatar' style={{ background: 'url(' + result.image + ')' }} ></div>
            : result.color ?
              <div className='avatar' style={{ backgroundColor: result.color }} ></div>
            : false }
            <span className='text'>{result.name}</span>
          </li>)}
        </ul>
      </div> : false }
    </div>
  }
}

export default Search;
