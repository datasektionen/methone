import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import withStyles from '@material-ui/core/styles/withStyles'

import Search from './Search'

const styles = {
    paper: {
        overflow: 'hidden'
    }
}

function SearchDialog(props) {
    const {open, onRequestClose, fuzzes} = props
    return (
        <Dialog
            fullWidth={true}
            open={open}
            onRequestClose={onRequestClose}
            classes={{ paper: props.classes.paper }} >
            <Search drawerOpen={open} fuzzes={fuzzes} />
        </Dialog>
    )
}


export default withStyles(styles)(SearchDialog)
