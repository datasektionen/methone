import React from 'react'
import styled from 'styled-components'
import classNames from "classnames"
import fuzzysort from 'fuzzysort'

const SearchBar = styled.input`
  all: unset;

  background: transparent;
  color: ${({ theme }) => theme.primary.contrastText};
  border-bottom: 1px solid ${({ theme }) => theme.primary.contrastText};
  box-shadow: none;

  height: 70%;
  align-self: center;
  flex: unset;
  width: 0;

  transition: flex 0.1s ease-in-out, margin 0.1s ease-in-out;
  &.visible {
    margin: 0 5px;
    width: unset;
    flex: 1000;
  }

  ::placeholder {
    color: ${({ theme }) => theme.primary.contrastText};
    opacity: 0.6;
  }
`

const SearchResults = styled.div`
  && {
    position: fixed;
    top: 50px;
    left: 20px;
    right: 20px;
    display: block;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0;
    background: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .1);
    list-style-type: none;
  }
`

const SearchResult = styled.a`
  && {
    --size: 50px;

    display: flex;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;

    height: var(--size);
    width: initial;

    background: #fff;
    color: #000;
    :hover, &.active {
      background: #eee;
    }

    ::before {
      margin-right: 15px;

      background: ${({ theme, color }) => color || theme.primary.main} ${({ image }) => image && `url(${image})`};
      width: calc(var(--size) / 2);
      height: calc(var(--size) / 2);
      border-radius: 50%;
      border: ${props => props.image || props.color ? '' : `5px solid ${props.theme.primary.light}`};
      background-clip: content-box;
      background-size: cover;
      content: " ";
    }
  }
`

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      active: 0,
    }
    this.inputRef = React.createRef()
  }

  handleSearchChange = e => {
    if(e.target.value) {
      fuzzysort.goAsync(e.target.value, this.props.fuzzes, {keys: ['name', 'str', 'href'], allowTypo: true})
        .then(s => this.setState({
          results: s.map(s => ({
            ...s.obj,
            name: fuzzysort.highlight(s[0]) || s.obj.name,
          })),
          active: 0
        }))
    } else {
      this.setState({results: []})
    }
  }


  handleKeyDown = event => {
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

  componentDidUpdate() {
    if(this.props.isSearchOpen) {
      this.inputRef.current.focus()
    }
  }

  render() {
    const { results, active } = this.state
    const { isSearchOpen } = this.props

    return <>
      <SearchBar
        ref={this.inputRef}
        placeholder="Sök på Datasektionen"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleSearchChange}
        className={classNames({ visible: isSearchOpen })}
      />
      <SearchResults>
        {isSearchOpen &&
          this.state.results.map((result, index) =>
            <SearchResult
              key={results.href || Math.random()}
              image={result.image}
              color={result.color}
              className={classNames({ active: active === index })}
              href={result.href}
            >
              <span dangerouslySetInnerHTML={{__html: result.name}}/>
            </SearchResult>
          )}
      </SearchResults>
    </>
  }
}

export default Search
