import React from 'react';

import colors from './styles/colors';

import TopBar from './TopBar';
import Drawer from './Drawer';
import SearchDialog from './SearchDialog';

import fuzzyfile from './fuzzyfile';
const fuzzes = fuzzyfile.fuzzes;

class Methone extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isMobile: window.innerWidth < 768,
      fuzzes: fuzzes
    };

    fetch('/fuzzyfile', { credentials: 'same-origin' }).then(res => {
      if(res.ok) return res.json();
      else throw res;
    }).then(json => {
      if(json.fuzzes.length) {
        const fuzzes = this.state.fuzzes.concat(json.fuzzes)
        this.setState({ fuzzes })
      }
    }).catch(res => {
      console.warn("Methone can't find a fuzzyfile for this system! Response was:", res);
    });

    this.onResize = this.onResize.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidMount () {
    document.body.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener("resize", this.onResize);
  }

  onResize() {
    this.setState({ isMobile: window.innerWidth < 768 });
  }

  onKeyDown(event) {
    if (event.keyCode === 27) { // escape
      this.setState({open: false});
    } else if ((event.metaKey === true || event.ctrlKey === true) && event.keyCode === 75) { // cmd+k
      event.preventDefault();
      this.setState({open: !this.state.open});
    }
  };

  render() {
    return <div style={{fontFamily: "Lato"}}>
      <TopBar
        { ...this.props }
        { ...this.state }
        requestOpen={() => this.setState({open: true})} />

      {this.state.isMobile ? (
          <Drawer
            { ...this.props }
            { ...this.state }
            requestClose={() => this.setState({open: false})}
          />
        ) : (
          <SearchDialog
            { ...this.props }
            { ...this.state }
            requestClose={() => this.setState({open: false})}
          />
        )
      }
    </div>
  }
}


// A helper component that just wrapps Methone with a a proper color scheme.
// also sets the theme-color meta tag, because thats useful
class WrappedMethone extends React.Component {

  constructor(props) {
    super(props);

    const scheme_name = this.props.config.color_scheme.replace('-', '_')
    const color_scheme = colors[scheme_name] || colors.cerise

    this.state = { color_scheme }

    this.setThemeColor(color_scheme.darker);
  }

  componentWillReceiveProps(nextProps) {
    const scheme_name = this.props.config.color_scheme.replace('-', '_')
    const color_scheme = colors[scheme_name] || colors.cerise

    this.setState({ color_scheme })
  }

  setThemeColor(color) {
    // Update or add meta[name="theme-color"] tag according to color_scheme
    // Just in case it is incorrect, which it often is...
    var metaEl = document.querySelector('meta[name="theme-color"]')
    if(metaEl) {
      metaEl.content = color
    } else {
      const headEl = document.querySelector('head')
      metaEl = document.createElement('meta')
      metaEl.name = "theme-color"
      metaEl.content = color
      headEl.appendChild(metaEl)
    }
  }

  render() {
    return <Methone config={this.props.config} color_scheme={this.state.color_scheme} />;
  }
}

export default WrappedMethone
