import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { List, ListItemIcon } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';
import ClassIcon from '@material-ui/icons/Class';
import TimelineIcon from '@material-ui/icons/Timeline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { DRAWER_WIDTH } from '../constants/GlobalConstants';

export default function AppbarAndDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();

  const back = (): void => {
    navigate(-1);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/class_list">
          <ListItemIcon><ClassIcon /></ListItemIcon>
          <ListItemText primary="Class" />
        </ListItemButton>
        <ListItemButton component={Link} to="/student_list">
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Student" />
        </ListItemButton>
        <ListItemButton component={Link} to="/weight_manage">
          <ListItemIcon><TimelineIcon /></ListItemIcon>
          <ListItemText primary="Weight Management" />
        </ListItemButton>
          <ListItemButton component={Link} to="/csv_service">
              <ListItemIcon><AutorenewIcon /></ListItemIcon>
              <ListItemText primary="CSV Auto Input" />
          </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/dashboard"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TEAM ENGLISH
          </Typography>
          <IconButton edge="end" onClick={back}>
            <ArrowBackIcon style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
