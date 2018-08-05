import React, { Component } from 'react';

import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core';

import withTheme from '@material-ui/core/styles/withTheme';

import { Home, Person } from '@material-ui/icons';

import Search from './Search';

class AppDrawer extends Component {
    render() {
        const { theme, config, closeDrawer } = this.props
        const primary1 = theme.palette.primary.main;
        const primary2 = theme.palette.primary.light;

        const blockStyle = {
            paddingTop: 100,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 18,
            fontSize: 20,
            fontWeight: "bold",
            background: "linear-gradient(45deg, " + primary1 + " 0%," + primary2 + " 100%)",
            color: theme.palette.primary.contrastText,
        };

        return (
            <div>
                <div style={blockStyle}>{config.system_name}</div>
                <Search drawerOpen={this.props} isMobile={true} fuzzes={this.props.fuzzes} />
                <Divider />
                <ListSubheader>Navigation</ListSubheader>
                <ListItem button onClick={() => window.location.href='/'} >
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText inset primary="Hem"/>
                </ListItem>
                <Divider />
                {this.props.config.links.map(item =>
                    item && item.props ? (
                    <ListItem button
                        key={item.props.to}
                        onClick={closeDrawer} >
                        {item}
                    </ListItem>
                    ) : (
                    <ListItem button
                        key={item.href}
                        onClick={() => window.location.href=item.href} >
                        <ListItemText inset primary={item.str} />
                    </ListItem>
                    )
                )}
                <Divider />
                <ListItem button onClick={() => window.location.href=config.login_href} >
                    <ListItemIcon><Person /></ListItemIcon>
                    <ListItemText inset primary={config.login_text} />
                </ListItem>
            </div>
        )
    }
}

export default withTheme()(AppDrawer);
