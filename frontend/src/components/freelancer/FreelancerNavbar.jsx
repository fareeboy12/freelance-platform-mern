import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem, Link } from '@mui/material';
import { Person, Search, HelpOutline, Notifications, ArrowDropDown } from '@mui/icons-material';
import { useUser } from '../../context/authContext';

const settings = ['Dashboard', 'Profile', 'Settings'];

const findWorkMenuItems = [
  'Find Work',
  'Your Network',
  'Saved Jobs',
  'Proposals',
  'Profile',
  'My Stats',
  'My Project Dashboard',
];

const myJobsMenuItems = [
  'My Jobs',
  'All Contracts',
  'Work Diary',
];

const reportsMenuItems = [
  'Overview',
  'My Reports',
  'Billings & Earnings',
  'Connects History',
  'Transaction History',
  'Certificate of Earnings',
];

const helpMenuItems = [
  'Help and Support',
  'Community and Forums',
  'My Requests',
];

const dummyNotifications = [
  'Notification 1',
  'Notification 2',
  'Notification 3',
  'Notification 4',
  'Notification 5',
];

function FreelancerNavbar() {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [anchorElFindWork, setAnchorElFindWork] = React.useState(null);
  const [anchorElMyJobs, setAnchorElMyJobs] = React.useState(null);
  const [anchorElReports, setAnchorElReports] = React.useState(null);
  const [anchorElHelp, setAnchorElHelp] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleOpenFindWorkMenu = (event) => {
    setAnchorElFindWork(event.currentTarget);
  };

  const handleOpenMyJobsMenu = (event) => {
    setAnchorElMyJobs(event.currentTarget);
  };

  const handleOpenReportsMenu = (event) => {
    setAnchorElReports(event.currentTarget);
  };

  const handleOpenHelpMenu = (event) => {
    setAnchorElHelp(event.currentTarget);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseMenu = (menuType) => {
    switch (menuType) {
      case 'findWork':
        setAnchorElFindWork(null);
        break;
      case 'myJobs':
        setAnchorElMyJobs(null);
        break;
      case 'reports':
        setAnchorElReports(null);
        break;
      case 'help':
        setAnchorElHelp(null);
        break;
      case 'notifications':
        setAnchorElNotifications(null);
        break;
      case 'user':
        setAnchorElUser(null);
        break;
      default:
        break;
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    // Trigger the logout process
    logout();
  
    // Redirect the user to the login page
    return navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            to="/freelancer/dashboard"
            component={Link}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Freelancer
          </Typography>

          {/* Navigation items */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <MenuItem>
              <div
                onClick={handleOpenFindWorkMenu}
                style={{ cursor: 'pointer', marginRight: '16px' }}
              >
                Find Work
              </div>
              <Menu
                anchorEl={anchorElFindWork}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElFindWork)}
                onClose={() => handleCloseMenu('findWork')}
              >
                {findWorkMenuItems.map((item) => (
                  <MenuItem key={item} onClick={() => handleCloseMenu('findWork')}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {item}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </MenuItem>
            <MenuItem>
              <div
                onClick={handleOpenMyJobsMenu}
                style={{ cursor: 'pointer', marginRight: '16px' }}
              >
                My Jobs
              </div>
              <Menu
                anchorEl={anchorElMyJobs}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElMyJobs)}
                onClose={() => handleCloseMenu('myJobs')}
              >
                {myJobsMenuItems.map((item) => (
                  <MenuItem key={item} onClick={() => handleCloseMenu('myJobs')}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {item}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </MenuItem>
            <MenuItem>
              <div
                onClick={handleOpenReportsMenu}
                style={{ cursor: 'pointer', marginRight: '16px' }}
              >
                Reports
              </div>
              <Menu
                anchorEl={anchorElReports}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElReports)}
                onClose={() => handleCloseMenu('reports')}
              >
                {reportsMenuItems.map((item) => (
                  <MenuItem key={item} onClick={() => handleCloseMenu('reports')}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {item}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </MenuItem>
            <MenuItem component={Link} to="/messages">
              Messages
            </MenuItem>
          </Box>

          {/* Search */}
          {isSearchOpen ? (
            <div className="search-input-container">
              <input type="text" placeholder="Search..." />
              <IconButton
                size="large"
                aria-label="search"
                onClick={handleSearchToggle}
                color="inherit"
                style={{ marginLeft: '8px' }}
              >
                <Search />
              </IconButton>
            </div>
          ) : (
            <IconButton
              size="large"
              aria-label="search"
              onClick={handleSearchToggle}
              color="inherit"
            >
              <Search />
            </IconButton>
          )}

          {/* Help Menu */}
          <IconButton
            size="large"
            aria-label="help"
            aria-controls="help-appbar"
            aria-haspopup="true"
            onClick={handleOpenHelpMenu}
            color="inherit"
          >
            <HelpOutline />
          </IconButton>
          <Menu
            id="help-appbar"
            anchorEl={anchorElHelp}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElHelp)}
            onClose={() => handleCloseMenu('help')}
          >
            {helpMenuItems.map((item) => (
              <MenuItem key={item} onClick={() => handleCloseMenu('help')}>
                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {item}
                </Link>
              </MenuItem>
            ))}
          </Menu>

          {/* Notifications */}
          <IconButton
            size="large"
            aria-label="notifications"
            aria-controls="notifications-appbar"
            aria-haspopup="true"
            onClick={handleOpenNotificationsMenu}
            color="inherit"
          >
            <Notifications />
          </IconButton>
          <Menu
            id="notifications-appbar"
            anchorEl={anchorElNotifications}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNotifications)}
            onClose={() => handleCloseMenu('notifications')}
          >
            {dummyNotifications.map((notification) => (
              <MenuItem key={notification} onClick={() => handleCloseMenu('notifications')}>
                {notification}
              </MenuItem>
            ))}
            <MenuItem component={Link} to="/all-notifications">
              All Notifications
            </MenuItem>
          </Menu>

          {/* User Profile */}
          <Tooltip title="User Profile">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="user-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <Person />
              <ArrowDropDown />
            </IconButton>
          </Tooltip>
          <Menu
            id="user-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Link to={`/${setting.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {setting}
                </Link>
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout} style={{ cursor: 'pointer'}}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default FreelancerNavbar;
