import React from 'react'
import Dialog from '@material-ui/core/es/Dialog'
import withStyles from '@material-ui/core/es/styles/withStyles'

import Search from './Search'

const styles = {
  paper: {
    overflow: 'hidden'
  }
}

function SearchDialog(props) {
  const {open, onClose, fuzzes} = props
  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={onClose}
      classes={{ paper: props.classes.paper }} >
      <Search drawerOpen={open} fuzzes={fuzzes} />
    </Dialog>
  )
}


export default withStyles(styles)(SearchDialog)
