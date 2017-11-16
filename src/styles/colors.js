import colors from 'material-colors';

import darkBlue from './colors/darkBlue';
import cerise from './colors/cerise';
import moneyGreen from './colors/moneyGreen';

function getColors(color, darkText) {
  return {
    darker: colors[color][500],
    lighter: colors[color][400],
    text: darkText ? "#222" : "#fff"
  }
}

export default {
  cerise: cerise,
  dark_blue: darkBlue,
  money_green: moneyGreen,
  amber: getColors("amber", true),
  blue: getColors("blue"),
  blue_grey: getColors("blueGrey"),
  cyan: getColors("cyan"),
  deep_orange: getColors("deepOrange"),
  deep_purple: getColors("deepPurple"),
  green: getColors("green"),
  indigo: getColors("indigo"),
  light_blue: getColors("lightBlue"),
  light_green: getColors("lightGreen"),
  lime: getColors("lime", true),
  orange: getColors("orange"),
  pink: getColors("pink"),
  purple: getColors("purple"),
  red: getColors("red"),
  teal: getColors("teal"),
  yellow: getColors("yellow", true),
}
