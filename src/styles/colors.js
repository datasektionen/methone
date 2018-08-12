import * as colors from '@material-ui/core/es/colors'

import darkBlue from './colors/darkBlue';
import cerise from './colors/cerise';
import moneyGreen from './colors/moneyGreen';

const toPalette = ([name, color]) => ({ [name]: { primary: color } })
const defaultColors = Object.assign(...Object.entries(colors).map(toPalette));

export default {
  ...defaultColors,
  cerise: { primary: cerise },
  dark_blue: { primary: darkBlue },
  money_green: { primary: moneyGreen },
}
