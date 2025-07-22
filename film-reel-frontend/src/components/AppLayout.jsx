import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Typography, Tabs, Tab } from "@mui/material";

const AppLayout = () => {
  const location = useLocation();
  return (
    <div className="bg-app-gray min-h-screen max-w-screen text-[#f8f9fa] flex flex-col items-center">
      <div className="flex gap-2 items-center py-4">
        <TheatersIcon style={{ fontSize: "56px" }} />
        <Typography variant="h1">Film Reel</Typography>
      </div>

      <Tabs
        value={location.pathname}
        textColor="inherit"
        indicatorColor="primary"
        centered
      >
        <Tab label="Popular" value="/" component={NavLink} to="/" />
        <Tab
          label="Favorites"
          value="/favorites"
          component={NavLink}
          to="/favorites"
        />
      </Tabs>

      <Outlet />
    </div>
  );
};

export default AppLayout;
