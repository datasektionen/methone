import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import colors from './styles/colors';

import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';

import TopBar from './TopBar';
import AppDrawer from './AppDrawer';
import Search from './Search';

class Methone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            isMobile: window.innerWidth < 768
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
        document.body.addEventListener("keydown", this.keydown);
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount () {
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
                        docked={false}
                        onRequestChange={(open) => this.setState({drawerOpen: open})} >
                        <AppDrawer
                            config={this.props.config}
                            isMobile={this.state.isMobile}
                            drawerOpen={this.state.drawerOpen}
                            drawerClose={() => this.setState({drawerOpen: false})}
                        />
                    </Drawer>
                    ) : (
                    <Dialog
                        repositionOnUpdate={false}
                        autoDetectWindowHeight={false}
                        autoScrollBodyContent={true}
                        modal={false}
                        contentStyle={{width: '100%', transform: 'translate(0, 0)'}}
                        bodyStyle={{padding: 0}}
                        style={{paddingTop: "50px", height: '90vh'}}
                        open={this.state.drawerOpen}
                        onRequestClose={() => this.setState({drawerOpen: false})} >
                        <Search drawerOpen={this.state} />
                    </Dialog>)
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
        const color_scheme = colors[this.props.config.color_scheme] || colors.cerise
        this.setThemeColor(color_scheme.palette.primary1Color);

        this.muiTheme = getMuiTheme(color_scheme);
    }

    setThemeColor(color) {
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
        return (<MuiThemeProvider muiTheme={this.muiTheme}>
            <Methone config={this.props.config} />
        </MuiThemeProvider>);

    }
}

export default WithTheme
