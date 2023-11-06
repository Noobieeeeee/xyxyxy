import {Box, IconButton, useTheme, Menu, MenuItem  } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [logoutMenuAnchor, setLogoutMenuAnchor] = useState(null);

  const handleLogoutClick = (event) => {
    setLogoutMenuAnchor(event.currentTarget);
  };

  const handleLogoutClose = () => {
    setLogoutMenuAnchor(null);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // Example: call a logout function or navigate to the logout page
    // After logout, close the menu
    handleLogoutClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
          </IconButton>
        <IconButton onClick={handleLogoutClick}>
          <PersonOutlinedIcon />
        </IconButton>

        {/* Logout Menu */}
        <Menu
          anchorEl={logoutMenuAnchor}
          open={Boolean(logoutMenuAnchor)}
          onClose={handleLogoutClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
