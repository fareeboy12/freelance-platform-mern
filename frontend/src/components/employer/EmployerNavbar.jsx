import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const settings = ['Dashboard', 'Profile', 'Settings', 'Logout'];

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
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElHelp, setAnchorElHelp] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);
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

  const [anchorElJobs, setAnchorElJobs] = React.useState(null);
  const [anchorElTalent, setAnchorElTalent] = React.useState(null);
  const [anchorElReports, setAnchorElReports] = React.useState(null);

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
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
            <FavoriteIcon />
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
              <PersonIcon />
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
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default EmployerNavbar;