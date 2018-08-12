import React from 'react'

import {
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core/es'

import withTheme from '@material-ui/core/styles/withTheme'

import Home from '@material-ui/icons/Home'
import Person from '@material-ui/icons/Person'

import Search from './Search'

export function AppDrawer({ theme, config, drawerOpen, onClose, fuzzes }) {
  const { main, light, contrastText } = theme.palette.primary

  const blockStyle = {
      paddingTop: 100,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 18,
      fontSize: 20,
      fontWeight: "bold",
      background: "linear-gradient(45deg, " + main + " 0%," + light + " 100%)",
      color: contrastText,
  }

  return (
    <Drawer
      open={drawerOpen}
      onClose={onClose}
    >
      <div style={blockStyle}>
        {config.system_name}
      </div>

      <Search
        drawerOpen={drawerOpen}
        isMobile={true}
        fuzzes={fuzzes} />

      <Divider />

      <ListSubheader>Navigation</ListSubheader>
      <ListItem button onClick={() => window.location.href='/'} >
        <ListItemIcon><Home /></ListItemIcon>
        <ListItemText inset disableTypography>
          Hem
        </ListItemText>
      </ListItem>

      <Divider />

      {config.links.map(item =>
        React.isValidElement(item) ?
        <ListItem button
          key={item.props.to}
          onClick={onClose}
        >
          <ListItemText inset disableTypography>
            {React.cloneElement(item, { style: { color: 'inherit' } })}
          </ListItemText>
        </ListItem>
        :
        <ListItem button
          key={item.href}
          onClick={() => window.location.href=item.href}
        >
          <ListItemText inset disableTypography>
            {item.str}
          </ListItemText>
        </ListItem>
      )}

      <Divider />

      <ListItem button onClick={() => window.location.href=config.login_href} >
        <ListItemIcon><Person /></ListItemIcon>
        <ListItemText inset disableTypography>
          {config.login_text}
        </ListItemText>
      </ListItem>
    </Drawer>
  )
}

export default withTheme()(AppDrawer)
