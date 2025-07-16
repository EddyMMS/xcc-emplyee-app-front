import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { redirectToGithub, getGithubOAuthUrl } from '../../services/authService'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearToken } from "../../features/auth/authSlice"

interface NavItem {
  text: string;
  path: string;
}

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token)
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
      dispatch(clearToken());
      navigate('/loginpage');
      }


  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
       (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };


  const navItems: NavItem[] = isAuthenticated
  ? [
      { text: 'Home', path: '/' },
    { text: 'Employees', path: '/employees' },
    ]
: [
    { text: 'Home', path: '/' },
    { text: 'Login', path: '/loginpage' },

  ];

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Management App
        </Typography>

    {!isMobile && isAuthenticated && user && (
        <Typography variant="body1" sx={{ marginRight: 2, color: 'white' }}>
            Logged in as: {user.username}
        </Typography>
        )}

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList()}
            </Drawer>
          </>
        ) : (
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ marginLeft: 2 }}
              >
                {item.text}
              </Button>
            ))}
            {isAuthenticated && (
                <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ marginLeft: 2 }}
                >
                Logout
                </Button>
                )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
