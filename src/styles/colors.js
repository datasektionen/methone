import * as colors from 'material-ui/styles/colors';
import darkBlue from './colors/darkBlue';
import cerise from './colors/cerise';
import moneyGreen from './colors/moneyGreen';

function materialScheme(color, dark) {
    return {
        fontFamily: 'Lato, sans-serif',
        palette: {
            primary1Color: colors[color + '500'],
            primary2Color: colors[color + '400'],
            alternateTextColor: dark ? "#222" : "#fff"
        }
    }
}

export default {
    amber: materialScheme("amber", true),
    blue: materialScheme("blue"),
    blue_grey: materialScheme("blueGrey"),
    cerise: cerise,
    cyan: materialScheme("cyan"),
    dark_blue: darkBlue,
    deep_orange: materialScheme("deepOrange"),
    deep_purple: materialScheme("deepPurple"),
    green: materialScheme("green"),
    indigo: materialScheme("indigo"),
    light_blue: materialScheme("lightBlue"),
    light_green: materialScheme("lightGreen"),
    lime: materialScheme("lime", true),
    money_green: moneyGreen,
    orange: materialScheme("orange"),
    pink: materialScheme("pink"),
    purple: materialScheme("purple"),
    red: materialScheme("red"),
    teal: materialScheme("teal"),
    yellow: materialScheme("yellow", true),
}
