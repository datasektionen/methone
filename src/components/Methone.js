import React, { Fragment } from 'react'
import camelcase from 'camelcase'
import { ThemeProvider } from "styled-components"
import colors from '../styles/colors'
import TopBar from './TopBar'
import fuzzyfile from '../fuzzyfile'

class Methone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchOpen: false,
      menuOpen: false,
      fuzzes: fuzzyfile.fuzzes
    }
    this.keydown = this.keydown.bind(this)
    this.resize = this.resize.bind(this)
  }

  keydown(event) {
    if (event.keyCode === 27) { // escape
      this.setState({searchOpen: false})
    } else if ((event.metaKey === true || event.ctrlKey === true) && event.keyCode === 75) { // cmd+k
      event.preventDefault()
      this.setState({searchOpen: !this.state.searchOpen})
    }
  }

  resize(event) {
    const isMobile = this.barRef.current.offsetWidth < this.barRef.current.scrollWidth
    this.setState({ isMobile })
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

  barRef = React.createRef()

  render() {
    return (
      <TopBar
        barRef={this.barRef}
        config={this.props.config}
        isMobile={this.state.isMobile}
        menuOpen={this.state.menuOpen}
        searchOpen={this.state.searchOpen}
        expandMenu={() => this.setState({menuOpen: !this.state.menuOpen})}
        expandSearch={() => this.setState({searchOpen: !this.state.searchOpen})}
      />
    )
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
    this.setTheme(props)
  }

  getTheme(props) {
    const scheme = props.config && props.config.color_scheme
    return colors[camelcase(scheme || 'cerise')]
  }

  componentDidUpdate(prevProps) {
    if(this.props.config.color_scheme !== prevProps.config.color_scheme) {
      this.setState({ theme: this.getTheme(props) })
      this.setTheme(this.props)
    }
  }

  setTheme(props) {
    if(typeof window === 'undefined') return
    // Update or add meta[name="theme-color"] tag according to color_scheme
    // Just in case it is incorrect, which it often is...
    var el = document.querySelector('meta[name="theme-color"]')
    if(el) {
      el.content = props.config.color_scheme // TODO should be hex code
    } else {
      el = document.createElement('meta')
      el.name = "theme-color"
      el.content = props.config.color_scheme
      document.head.appendChild(el)
    }
  }

  render() {
    return (<ThemeProvider theme={this.state.theme}>
      <Methone config={this.props.config} />
    </ThemeProvider>)
  }
}

export default WithTheme
