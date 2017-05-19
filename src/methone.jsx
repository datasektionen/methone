import React from 'react';
import TopBar from './topbar.jsx';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import AppDrawer from './appdrawer.jsx';
import Search from './search.jsx';

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
        console.log()
        if (event.keyCode == 27) { // escape
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
                        onRequestChange={(open) => this.setState({drawerOpen: open})}
                    >
                        <AppDrawer
                            config={this.props.config}
                            isMobile={this.state.isMobile}
                            drawerOpen={this.state.drawerOpen}
                        />
                    </Drawer>) : 
                    (<Dialog
                        repositionOnUpdate={false}
                        autoDetectWindowHeight={false}
                        autoScrollBodyContent={true}
                        modal={false}
                        contentStyle={{width: '100%', transform: 'translate(0, 0)'}}
                        bodyStyle={{padding: 0}}
                        style={{paddingTop: "50px", height: '90vh'}}
                        open={this.state.drawerOpen}
                        onRequestClose={() => this.setState({drawerOpen: false})}
                    >
                        <Search drawerOpen={this.state} />
                    </Dialog>)
                }
            </div>
        )
    }
}

export default Methone;
