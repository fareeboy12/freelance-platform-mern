import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from '@mui/material/Link';

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
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
                <SearchIcon />
              </IconButton>
            </div>
          ) : (
            <IconButton
              size="large"
              aria-label="search"
              onClick={handleSearchToggle}
              color="inherit"
            >
              <SearchIcon />
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
            <HelpOutlineIcon />
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
            <NotificationsIcon />
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
              <PersonIcon />
              <ArrowDropDownIcon />
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
            onClose={() => handleCloseMenu('user')}
          >
            <MenuItem>
              <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/settings" style={{ color: 'inherit', textDecoration: 'none' }}>
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/logout" style={{ color: 'inherit', textDecoration: 'none' }}>
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default FreelancerNavbar;
