import React from 'react';
import TopBar from './topbar.jsx';
import Drawer from 'material-ui/Drawer';
import AppDrawer from './appdrawer.jsx';

class Methone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: true
        };
        this.state.isMobile = window.innerWidth < 768;
        this.updateDimensions = this.updateDimensions.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
    }

    updateDimensions () {
        this.setState({ isMobile: window.innerWidth < 768 });
    }

    componentDidMount () {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateDimensions);
    }

    openDrawer () {
        this.setState({ drawerOpen: true });
    }

    render() {
        return (
            <div style={{fontFamily: "Lato"}}>
                <TopBar config={this.props.config} isMobile={this.state.isMobile} openDrawer={this.openDrawer} />
                <Drawer
                    style={{fontFamily: "Lato"}}
                    docked={false}
                    open={this.state.drawerOpen}
                    onRequestChange={(open) => this.setState({drawerOpen: open})}>
                    <AppDrawer config={this.props.config} />
                </Drawer>
            </div>
        )
    }
}

export default Methone;