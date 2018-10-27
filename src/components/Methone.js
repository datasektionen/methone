import React from 'react'

import camelcase from 'camelcase'

import { ThemeProvider } from "styled-components"

import colors from '../styles/colors'

import TopBar from './TopBar'
import AppDrawer from './AppDrawer'
import SearchDialog from './SearchDialog'

import fuzzyfile from '../fuzzyfile'
const fuzzes = fuzzyfile.fuzzes

class Methone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false,
      isMobile: false,
      fuzzes: fuzzes
    }
    this.updateDimensions = this.updateDimensions.bind(this)
    this.keydown = this.keydown.bind(this)
  }

  updateDimensions () {
    this.setState({ isMobile: window.innerWidth < 768 })
  }

  keydown (event) {
    if (event.keyCode === 27) { // escape
      this.setState({drawerOpen: false})
    } else if ((event.metaKey === true || event.ctrlKey === true) && event.keyCode === 75) { // cmd+k
      event.preventDefault()
      this.setState({drawerOpen: !this.state.drawerOpen})
    }
  }

  componentDidMount () {
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

    document.body.addEventListener("keydown", this.keydown)
    window.addEventListener("resize", this.updateDimensions)
    this.updateDimensions()
  }

  componentWillUnmount () {
    if(typeof window === 'undefined') return
    window.removeEventListener("resize", this.updateDimensions)
  }

  render() {
    return (
      <div>
        <TopBar
          config={this.props.config}
          isMobile={this.state.isMobile}
          openDrawer={() => this.setState({drawerOpen: true})} />
        <SearchDialog
          open={this.state.drawerOpen}
          fuzzes={this.state.fuzzes}
          onClose={() => this.setState({drawerOpen: false})}
        />
      </div>
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
