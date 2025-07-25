import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Typography, Tabs, Tab, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../auth/AuthContext";
import { auth } from "../auth/firebaseConfig";
import { signOut } from "firebase/auth";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      try {
        await signOut(auth);
        navigate("/");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-app-gray min-h-screen max-w-screen text-[#f8f9fa] flex flex-col items-center">
      <div className="w-full flex justify-center items-center py-4 relative">
        <div className="flex gap-2 items-center">
          <TheatersIcon style={{ fontSize: "56px" }} />
          <Typography variant="h1">Film Reel</Typography>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Button
            variant="outlined"
            size="medium"
            onClick={handleAuthAction}
            startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
            sx={{
              fontSize: "0.75rem",
              fontWeight: "bold",
              textTransform: "none",
              borderColor: "#f8f9fa",
              color: "#f8f9fa",
              "&:hover": {
                borderColor: "#e9ecef",
                backgroundColor: "rgba(248, 249, 250, 0.08)",
              },
            }}
          >
            {isLoggedIn ? "Log Out" : "Log In"}
          </Button>
        </div>
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
