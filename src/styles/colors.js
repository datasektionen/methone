import * as colors from '@material-ui/core/colors'
import createPalette from '@material-ui/core/styles/createPalette'

import darkBlue from './colors/darkBlue';
import cerise from './colors/cerise';
import moneyGreen from './colors/moneyGreen';
import amber from './colors/amber';
import cyan from './colors/cyan';
import green from './colors/green';
import lightBlue from './colors/lightBlue';
import lightGreen from './colors/lightGreen';
import lime from './colors/lime';
import orange from './colors/orange';
import yellow from './colors/yellow';

const {common, ...actualColors} = colors

const toPalette = ([name, color]) => ({ [name]: createPalette({primary: color}) })
const defaultColors = Object.assign(...Object.entries(actualColors).map(toPalette));


export default {
  ...defaultColors,
  cerise: createPalette(cerise),
  darkBlue: createPalette(darkBlue),
  moneyGreen: createPalette(moneyGreen),
  cyan: createPalette(cyan),
  amber: createPalette(amber),
  green: createPalette(green),
  lightBlue: createPalette(lightBlue),
  lightGreen: createPalette(lightGreen),
  lime: createPalette(lime),
  orange: createPalette(orange),
  yellow: createPalette(yellow),
}
