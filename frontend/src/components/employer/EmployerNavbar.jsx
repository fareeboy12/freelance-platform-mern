import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem } from '@mui/material';
import { Adb, Person, Search, HelpOutline, Notifications, Favorite, ArrowDropDown } from '@mui/icons-material';
import { useUser } from '../../context/authContext';

const settings = [
  {
    'title': 'Dashboard',
    'url': '/employer/dashboard'
  },
  {
    'title': 'Profile',
    'url': '/employer/profile'
  },
  {
    'title': 'Settings',
    'url': '/employer/settings'
  }
];

const jobsMenuItems = [
  'Post a Job',
  'My Jobs',
  'All Job Posts',
  'All Contracts',
  'Any Hire',
];

const talentMenuItems = [
  'Discover',
  'Your Hires',
  'Company Hires',
  'Recently Viewed',
  'Saved Talent',
];

const reportsMenuItems = [
  'Weekly Summary',
  'Transaction History',
  'Budgets',
  'Timesheet',
  'Time by Activity',
  'Time by Freelancer',
  'All Work Diaries',
  'Custom Export',
];

const dummyNotifications = [
  'Notification 1',
  'Notification 2',
  'Notification 3',
  'Notification 4',
  'Notification 5',
];

function EmployerNavbar() {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [anchorElUser, setAnchorElUser] = useState();
  const [anchorElHelp, setAnchorElHelp] = useState();
  const [anchorElNotifications, setAnchorElNotifications] = useState();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenHelpMenu = (event) => {
    setAnchorElHelp(event.currentTarget);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseHelpMenu = () => {
    setAnchorElHelp(null);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const [anchorElJobs, setAnchorElJobs] = useState();
  const [anchorElTalent, setAnchorElTalent] = useState();
  const [anchorElReports, setAnchorElReports] = useState();

  const handleOpenJobsMenu = (event) => {
    setAnchorElJobs(event.currentTarget);
  };

  const handleOpenTalentMenu = (event) => {
    setAnchorElTalent(event.currentTarget);
  };

  const handleOpenReportsMenu = (event) => {
    setAnchorElReports(event.currentTarget);
  };

  const handleCloseJobsMenu = () => {
    setAnchorElJobs(null);
  };

  const handleCloseTalentMenu = () => {
    setAnchorElTalent(null);
  };

  const handleCloseReportsMenu = () => {
    setAnchorElReports(null);
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
          <Adb sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/employer/dashboard"
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
            Employer
          </Typography>

          {/* Navigation items (Jobs, Talent, Reports) */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <MenuItem>
              <div
                onClick={handleOpenJobsMenu}
                style={{ cursor: 'pointer', marginRight: '16px' }}
              >
                Jobs
              </div>
              <Menu
                anchorEl={anchorElJobs}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElJobs)}
                onClose={handleCloseJobsMenu}
              >
                {jobsMenuItems.map((item) => (
                  <MenuItem key={item} onClick={handleCloseJobsMenu}>
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
                onClick={handleOpenTalentMenu}
                style={{ cursor: 'pointer', marginRight: '16px' }}
              >
                Talent
              </div>
              <Menu
                anchorEl={anchorElTalent}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElTalent)}
                onClose={handleCloseTalentMenu}
              >
                {talentMenuItems.map((item) => (
                  <MenuItem key={item} onClick={handleCloseTalentMenu}>
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
                onClose={handleCloseReportsMenu}
              >
                {reportsMenuItems.map((item) => (
                  <MenuItem key={item} onClick={handleCloseReportsMenu}>
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
            onClose={handleCloseHelpMenu}
          >
            <MenuItem component={Link} to="/help-support">
              Help and Support
            </MenuItem>
            <MenuItem component={Link} to="/community-forums">
              Community and Forums
            </MenuItem>
            <MenuItem component={Link} to="/my-requests">
              My Requests
            </MenuItem>
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
            onClose={handleCloseNotificationsMenu}
          >
            {dummyNotifications.map((notification) => (
              <MenuItem
                key={notification}
                onClick={handleCloseNotificationsMenu}
              >
                {notification}
              </MenuItem>
            ))}
            <MenuItem component={Link} to="/all-notifications">
              All Notifications
            </MenuItem>
          </Menu>

          {/* Favorites (Heart) */}
          <Link to="/all-saves" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Favorite />
          </Link>

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
            {settings.map((setting, index) => (
              <MenuItem key={index} onClick={handleCloseUserMenu}>
                <Link to={setting?.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {setting?.title}
                </Link>
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default EmployerNavbar;