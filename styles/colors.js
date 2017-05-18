"use strict";
import * as colors from 'material-ui/styles/colors';
import darkBlue from './colors/darkBlue';
import cerise from './colors/cerise';
import moneyGreen from './colors/moneyGreen';

function materialScheme(color, dark) {
    return {
        fontFamily: 'Lato, sans-serif',
        palette: {
            primary1Color: colors[color + '400'],
            primary2Color: colors[color + '500'],
            alternateTextColor: dark ? "#222" : "#fff"
        }
    }
}

export default {
    amber: materialScheme("amber", true),
    blue: materialScheme("blue"),
    blue_grey: materialScheme("blue-grey"),
    cerise: cerise,
    cyan: materialScheme("cyan"),
    dark_blue: darkBlue,
    deep_orange: materialScheme("deep-orange"),
    deep_purple: materialScheme("deep-purple"),
    green: materialScheme("green"),
    indigo: materialScheme("indigo"),
    light_blue: materialScheme("light-blue"),
    light_green: materialScheme("light-green"),
    lime: materialScheme("lime", true),
    money_green: moneyGreen,
    orange: materialScheme("orange"),
    pink: materialScheme("pink"),
    purple: materialScheme("purple"),
    red: materialScheme("red"),
    teal: materialScheme("teal"),
    yellow: materialScheme("yellow", true),
}
