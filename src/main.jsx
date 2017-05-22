import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Methone from './methone.jsx';
import colors from '../styles/colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// If for some reason Methone config is not present (shills), prevent JS errors
if (typeof window.methone_conf === "undefined")
    window.methone_conf = {};

// Configuration
const config = {
    color_scheme: window.methone_conf.color_scheme || "cerise",
    links: window.methone_conf.links || [],
    login_text: window.methone_conf.login_text || "",
    login_href: window.methone_conf.login_href || "",
    system_name: window.methone_conf.system_name || "MySystem"
};

// Assign color scheme
const color_scheme = colors[config.color_scheme] || colors.cerise;

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme(color_scheme);

const App = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Methone config={config} />
    </MuiThemeProvider>
);

var metaEl = document.querySelector('meta[name="theme-color"]');
if(metaEl) {
    metaEl.content = color_scheme.palette.primary1Color;
} else {
    const headEl = document.querySelector('head');
    var metaEl = document.createElement('meta');
    metaEl.name = "theme-color";
    metaEl.content = color_scheme.palette.primary1Color;
    headEl.appendChild(metaEl);
}

ReactDOM.render(
    <App />,
    document.getElementById('methone-container-replace')
);
