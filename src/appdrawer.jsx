import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Home from 'material-ui/svg-icons/action/home';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Person from 'material-ui/svg-icons/social/person';
import Search from './search.jsx';

class AppDrawer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const primary1 = this.props.muiTheme.palette.primary1Color;
        const primary2 = this.props.muiTheme.palette.primary2Color;

        const blockStyle = {
            paddingTop: 100,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 18,
            fontSize: 20,
            fontWeight: "bold",
            background: "linear-gradient(45deg, " + primary1 + " 0%," + primary2 + " 100%)",
            color: this.props.muiTheme.palette.alternateTextColor,
        };

        return (
            <div>
                <div style={blockStyle}>{this.props.config.system_name}</div>
                <Search drawerOpen={this.props} isMobile={true} />
                <Divider />
                <Subheader>Navigation</Subheader>
                <MenuItem primaryText="Startsida" leftIcon={<Home />} onTouchTap={() => window.location.href='/'} />
                <Divider />
                {this.props.config.links.map(i =>
                    <MenuItem
                        insetChildren={true}
                        key={i.href}
                        primaryText={i.str}
                        onTouchTap={() => window.location.href=i.href}
                    />
                )}
                <Divider />
                <MenuItem
                    leftIcon={<Person />}
                    primaryText={this.props.config.login_text}
                    onTouchTap={() => window.location.href=this.props.config.login_href}
                />
            </div>
        )
    }
}

export default muiThemeable()(AppDrawer);
