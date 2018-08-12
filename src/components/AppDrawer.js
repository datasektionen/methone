import React from 'react'

import {
  Divider,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core'

import withTheme from '@material-ui/core/styles/withTheme'

import { Home, Person } from '@material-ui/icons'

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
        <ListItemText inset primary="Hem"/>
      </ListItem>

      <Divider />

      {config.links.map(item =>
        React.isValidElement(item) ?
        <ListItem button
          key={item.props.to}
          onClick={onClose}
        >
          {item}
        </ListItem>
        :
        <ListItem button
          key={item.href}
          onClick={() => window.location.href=item.href}
        >
          <ListItemText inset primary={item.str} />
        </ListItem>
      )}

      <Divider />

      <ListItem button onClick={() => window.location.href=config.login_href} >
        <ListItemIcon><Person /></ListItemIcon>
        <ListItemText inset primary={config.login_text} />
      </ListItem>
    </Drawer>
  )
}

export default withTheme()(AppDrawer)
