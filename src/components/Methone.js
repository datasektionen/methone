import React, { Fragment } from 'react'
import camelcase from 'camelcase'
import { ThemeProvider } from 'styled-components'
import colors from '../styles/colors'
import TopBar from './TopBar'
import Search from './Search'
import fuzzyfile from '../fuzzyfile'

class Methone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuClicks: 0,
      isSearchOpen: false,
      searchString: '',
      fuzzes: fuzzyfile.fuzzes
    }
    this.barRef = React.createRef()
  }

  keydown = (event) => {
    if (event.keyCode === 27) { // escape
      this.setState({isSearchOpen: false})
    } else if ((event.metaKey === true || event.ctrlKey === true) && event.keyCode === 75) { // cmd+k
      event.preventDefault()
      this.setState({isSearchOpen: !this.state.isSearchOpen})
    }
  }

  resize = (event) => {
    const isMobile = this.barRef.current.offsetWidth < this.barRef.current.scrollWidth
    this.setState({ isMobile, menuClicks: 0 })
    if(!isMobile) {
      setTimeout(() =>
        this.setState({
          isMobile: this.barRef.current && this.barRef.current.offsetWidth < this.barRef.current.scrollWidth
        })
      , 10)
    }
  }

  setSearchString = (searchString) => {
    this.setState({ searchString })
  }

  componentDidMount() {
    if(typeof window === 'undefined') return

    fetch('/fuzzyfile', {
      credentials: 'same-origin'
    }).then(res => {
      if(res.ok) return res.json()
      else throw res
    }).then(json => {
      if(json.fuzzes.length)
        this.setState({fuzzes: this.state.fuzzes.concat(json.fuzzes)})
    }).catch(res => {
      console.warn("Methone can't find a fuzzyfile for this system! Response was:", res)
    })

    window.addEventListener("keydown", this.keydown)
    window.addEventListener("resize", this.resize)
    this.resize()
  }

  componentWillUnmount() {
    if(typeof window === 'undefined') return

    window.removeEventListener("keydown", this.keydown)
    window.removeEventListener("resize", this.resize)
  }

  render() {
    return <>
      <TopBar
        barRef={this.barRef}
        config={this.props.config}
        isMobile={this.state.isMobile}
        menuClicks={this.state.menuClicks}
        isSearchOpen={this.state.isSearchOpen}
        setSearchString={this.setSearchString}
        toggleMenu={() => this.setState({menuClicks: this.state.menuClicks + 1, isSearchOpen: false})}
        toggleSearch={() => this.setState({isSearchOpen: !this.state.isSearchOpen, menuClicks: false})}
      >
        <Search
          fuzzes={this.state.fuzzes}
          isSearchOpen={this.state.isSearchOpen}
        />
      </TopBar>
    </>
  }
}


// A helper component that just wrapps Methone with a theme.
// also sets the theme-color meta tag, because thats useful
class WithTheme extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: this.getTheme(props)
    }

    this.setTheme = this.setTheme.bind(this)
    this.setTheme(this.state.theme)
  }

  getTheme(props) {
    const scheme = props.config && props.config.color_scheme
    return colors[camelcase(scheme)] || colors['cerise']
  }

  componentDidUpdate(prevProps) {
    if(this.props.config.color_scheme !== prevProps.config.color_scheme) {
      const theme = this.getTheme(this.props)
      this.setState({ theme })
      this.setTheme(theme)
    }
  }

  setTheme(theme) {
    if(typeof window === 'undefined') return
    // Update or add meta[name="theme-color"] tag according to color_scheme
    // Just in case it is incorrect, which it often is...
    let el = document.querySelector('meta[name="theme-color"]')
    if(!el) {
      el = document.createElement('meta')
      el.name = "theme-color"
      document.head.appendChild(el)
    }

    el.content = theme.primary.main
  }

  render() {
    return (<ThemeProvider theme={this.state.theme}>
      <Methone config={this.props.config} />
    </ThemeProvider>)
  }
}

export default WithTheme
