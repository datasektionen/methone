import React from 'react';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import colors from './styles/colors';

import Drawer from 'material-ui/Drawer';

import TopBar from './TopBar';
import AppDrawer from './AppDrawer';
import SearchDialog from './SearchDialog';

import fuzzyfile from './fuzzyfile';
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
            <div style={{fontFamily: "Lato"}}>
                <TopBar
                    config={this.props.config}
                    isMobile={this.state.isMobile}
                    openDrawer={() => this.setState({drawerOpen: true})} />

                {this.state.isMobile ?
                    (<Drawer
                        style={{fontFamily: "Lato"}}
                        open={this.state.drawerOpen}
                        onRequestClose={() => this.setState({drawerOpen: false})} >
                        <AppDrawer
                            config={this.props.config}
                            isMobile={this.state.isMobile}
                            drawerOpen={this.state.drawerOpen}
                            closeDrawer={() => this.setState({drawerOpen: false})}
                            fuzzes={this.state.fuzzes}
                        />
                    </Drawer>
                    ) : (
                    <SearchDialog
                        open={this.state.drawerOpen}
                        fuzzes={this.state.fuzzes}
                        onRequestClose={() => this.setState({drawerOpen: false})} />
                    )
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
        const color_scheme = colors[this.props.config.color_scheme.replace('-', '_')] || colors.cerise

        this.state = {
            theme: createMuiTheme(color_scheme)
        }

        this.setThemeColor(color_scheme.palette.primary1Color);
    }

    componentWillReceiveProps(nextProps) {
        const color_scheme = colors[nextProps.config.color_scheme.replace('-', '_')] || colors.cerise
        this.setState({theme: createMuiTheme(color_scheme)})
    }

    setThemeColor(color) {
        if(typeof window === 'undefined') return
        // Update or add meta[name="theme-color"] tag according to color_scheme
        // Just in case it is incorrect, which it often is...
        var metaEl = document.querySelector('meta[name="theme-color"]');
        if(metaEl) {
            metaEl.content = color;
        } else {
            const headEl = document.querySelector('head');
            metaEl = document.createElement('meta');
            metaEl.name = "theme-color";
            metaEl.content = color;
            headEl.appendChild(metaEl);
        }
    }

    render() {
        return (<MuiThemeProvider theme={this.state.theme}>
            <Methone config={this.props.config} />
        </MuiThemeProvider>);
    }
}

export default WithTheme
