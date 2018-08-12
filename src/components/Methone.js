import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/es/styles';
import colors from '../styles/colors';

import TopBar from './TopBar';
import AppDrawer from './AppDrawer';
import SearchDialog from './SearchDialog';

import fuzzyfile from '../fuzzyfile';
const fuzzes = fuzzyfile.fuzzes;

class Methone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      isMobile: false,
      fuzzes: fuzzes
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.keydown = this.keydown.bind(this);
  }

  updateDimensions () {
    this.setState({ isMobile: window.innerWidth < 768 });
  }

  keydown (event) {
    if (event.keyCode === 27) { // escape
      this.setState({drawerOpen: false});
    } else if ((event.metaKey === true || event.ctrlKey === true) && event.keyCode === 75) { // cmd+k
      event.preventDefault();
      this.setState({drawerOpen: !this.state.drawerOpen});
    }
  };

  componentDidMount () {
    if(typeof window === 'undefined') return

    fetch('/fuzzyfile', {
      credentials: 'same-origin'
    }).then(res => {
      if(res.ok) return res.json();
      else throw res;
    }).then(json => {
      if(json.fuzzes.length)
        this.setState({fuzzes: this.state.fuzzes.concat(json.fuzzes)})
    }).catch(res => {
      console.warn("Methone can't find a fuzzyfile for this system! Response was:", res);
    });

    document.body.addEventListener("keydown", this.keydown);
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions()
  }

  componentWillUnmount () {
    if(typeof window === 'undefined') return
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div>
        <TopBar
          config={this.props.config}
          isMobile={this.state.isMobile}
          openDrawer={() => this.setState({drawerOpen: true})} />

        {this.state.isMobile ?
         <AppDrawer
            config={this.props.config}
            isMobile={this.state.isMobile}
            drawerOpen={this.state.drawerOpen}
            onClose={() => this.setState({drawerOpen: false})}
            fuzzes={this.state.fuzzes}
          />
          :
          <SearchDialog
            open={this.state.drawerOpen}
            fuzzes={this.state.fuzzes}
            onClose={() => this.setState({drawerOpen: false})}
          />
        }
      </div>
    )
  }
}


// A helper component that just wrapps Methone with a "mui theme" used by material-ui.
// also sets the theme-color meta tag, because thats useful
class WithTheme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: this.getTheme(props)
    }

    this.setTheme = this.setTheme.bind(this)
    this.setTheme(props);
  }

  getTheme(props) {
    const palette = colors[props.config.color_scheme.replace('-', '_')] || colors.cerise
    return createMuiTheme({
      palette,
      typography: {
        fontFamily: 'Lato, sans-serif'
      }
    })
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
    var el = document.querySelector('meta[name="theme-color"]');
    if(el) {
      el.content = props.config.color_scheme;
    } else {
      el = document.createElement('meta');
      el.name = "theme-color";
      el.content = props.config.color_scheme;
      document.head.appendChild(el);
    }
  }

  render() {
    return (<MuiThemeProvider theme={this.state.theme}>
      <Methone config={this.props.config} />
    </MuiThemeProvider>);
  }
}

export default WithTheme
