import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem } from '@mui/material';
import { Person, Search, HelpOutline, Notifications, ArrowDropDown } from '@mui/icons-material';
import { useUser } from '../../context/authContext';

const settings = [
  {
    'title': 'Dashboard',
    'url': '/freelancer/dashboard'
  },
  {
    'title': 'Profile',
    'url': '/freelancer/profile'
  },
  {
    'title': 'Settings',
    'url': '/freelancer/settings'
  }
];

const findWorkMenuItems = [
  {
    'title': 'Find Work',
    'url': '/'
  },
  {
    'title': 'Your Network',
    'url': '/'
  },
  {
    'title': 'Saved Jobs',
    'url': '/'
  },
  {
    'title': 'Proposals',
    'url': '/'
  },
  {
    'title': 'Profile',
    'url': '/'
  },
  {
    'title': 'My Stats',
    'url': '/'
  },
  {
    'title': 'My Project Dashboard',
    'url': '/'
  }
];

const myJobsMenuItems = [
  {
    'title': 'My Jobs',
    'url': '/'
  },
  {
    'title': 'All Contracts',
    'url': '/'
  },
  {
    'title': 'Work Diary',
    'url': '/'
  }
];

const reportsMenuItems = [
  {
    'title': 'Overview',
    'url': '/'
  },
  {
    'title': 'My Reports',
    'url': '/'
  },
  {
    'title': 'Billings & Earnings',
    'url': '/'
  },
  {
    'title': 'Connects History',
    'url': '/'
  },
  {
    'title': 'Transaction History',
    'url': '/'
  },
  {
    'title': 'Certificate of Earnings',
    'url': '/'
  }
];

const helpMenuItems = [
  {
    'title': 'Help and Support',
    'url': '/'
  },
  {
    'title': 'Community and Forums',
    'url': '/'
  },
  {
    'title': 'My Requests',
    'url': '/'
  }
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
                {findWorkMenuItems.map((item, index) => (
                  <MenuItem key={index} onClick={() => handleCloseMenu('findWork')}>
                    <Link
                      to={item?.url}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {item?.title}
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
                {myJobsMenuItems.map((item, index) => (
                  <MenuItem key={index} onClick={() => handleCloseMenu('myJobs')}>
                    <Link
                      to={item?.url}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {item?.title}
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
                {reportsMenuItems.map((item, index) => (
                  <MenuItem key={index} onClick={() => handleCloseMenu('reports')}>
                    <Link
                      to={item?.url}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {item?.title}
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
            {helpMenuItems.map((item, index) => (
              <MenuItem key={index} onClick={() => handleCloseMenu('help')}>
                <Link to={item?.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {item?.title}
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
            {settings.map((setting, index) => {
              return (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link to={setting?.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {setting?.title}
                  </Link>
                </MenuItem>
              )
            })}
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
