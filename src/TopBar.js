import React from 'react';

import { withTheme } from 'material-ui/styles';
import { Menu } from 'material-ui-icons';

import Delta from './Delta';

class TopBar extends React.Component {
    render() {
        const { theme, config, isMobile, openDrawer } = this.props
        const innerStyle = {
            lineHeight: "normal",
            padding: 0,
            margin: "auto",
            maxWidth: 1240,
            position: "relative"
        };
        const barStyle = {
            lineHeight: "normal",
            backgroundColor: theme.palette.primary1Color,
            fontFamily: "Lato, Arial",
            position: "fixed",
            right: 0,
            left: 0,
            top: 0,
            zIndex: 900,
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 8px"
        };
        const linkStyle = {
            display: "inline-block",
            fontSize: 15,
            lineHeight: 1.2,
            letterSpacing: "0.5px",
            color: theme.palette.alternateTextColor,
            textDecoration: "none",
            padding: "16px 11px 16px 11px",
            cursor: "pointer"
        };
        const menuStyle = {
            display: "inline-block",
            verticalAlign: "top",
            marginLeft: 10
        };
        const loginStyle = {
            display: "inline-block",
            position: "absolute",
            right: 0,
            top: 0
        };
        const loginLinkStyle = {
            padding: "17px 16px 16px 16px",
            color: theme.palette.alternateTextColor,
            display: "block",
            backgroundColor: theme.palette.primary2Color,
            textTransform: "uppercase",
            fontSize: 14,
            height: 50,
            boxSizing: 'border-box'
        };

        const loginButton = config.login_text ? (
            <a style={loginLinkStyle}
                href={config.login_href}>
                {config.login_text}
            </a>) : false;

        const mobileNavigation = (
            <a style={loginLinkStyle}
                onClick={openDrawer}>
                <Menu style={{color: theme.palette.alternateTextColor, marginTop: -4}} />
            </a>
        );

        const links = config.links.map(item =>
            item.props ? (
                // So, to add out custom link style to a given "Link" React element go into its props
                // and wrap its children inside a span with our chosen styling
                // HashTagg FulhackPåFulhackPåFulhackOsv
                <span key={item.props.to}>
                    {{...item, props:
                        {...item.props, children:
                            <span style={linkStyle}>{item.props.children.toUpperCase()}</span>
                    }}}
                </span>
            ) : (
                <a key={item.href}
                    href={item.href}
                    style={linkStyle}>
                    {item.barStr || item.str.toUpperCase()}
                </a>)
        );

        return (
            <div style={barStyle}>
                <div style={innerStyle}>
                    <Delta deltaBackground={theme.palette.primary2Color}
                           foreground={theme.palette.alternateTextColor} />
                    <div style={menuStyle}>
                        {isMobile ? false : links}
                    </div>
                    <div style={loginStyle}>
                        {isMobile ? mobileNavigation : loginButton}
                    </div>
                </div>
            </div>
        )
    }
}

export default withTheme()(TopBar);
