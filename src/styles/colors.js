import * as colors from '@material-ui/core/colors'
import createPalette from '@material-ui/core/styles/createPalette'

import darkBlue from './colors/darkBlue';
import cerise from './colors/cerise';
import moneyGreen from './colors/moneyGreen';

const toPalette = ([name, color]) => ({ [name]: createPalette(color) })
const defaultColors = Object.assign(...Object.entries(colors).map(toPalette));

export default {
  ...defaultColors,
  cerise: createPalette(cerise),
  darkBlue: createPalette(darkBlue),
  moneyGreen: createPalette(moneyGreen),
}
