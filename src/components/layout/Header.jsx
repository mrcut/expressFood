import { useState } from "react";
import { AccountCircleRounded } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuth();
  const { basket } = useBasket();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    handleClose();
  };

  const adminMenuItems = [
    { label: "Liste des Produits", path: "/products" },
    { label: "Liste des Users", path: "/users" },
  ];

  return (
    <AppBar position="fixed" color="info">
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Inserting a box to group left side elements helps in organizing and potentially balancing the AppBar layout */}
          {user && (
            <>
              <Button color="inherit" component={RouterLink} to="/products">
                Tout les produits
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/products/foot"
              >
                Foot
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/products/tennis"
              >
                Tennis
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/products/natation"
              >
                Natation
              </Button>
            </>
          )}
        </Box>

        {/* Title centered using flexGrow on Typography */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "white",
            textShadow: "4px 2px 6px #000",
            textDecoration: "none",
            textAlign: "center",
          }}
          component={RouterLink}
          to="/"
        >
          Ipssi Express Food
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Right side elements, also wrapped in a Box for consistency */}
          {user && basket.length > 0 && (
            <Button color="inherit" component={RouterLink} to="/basket">
              Basket ({basket.length})
            </Button>
          )}

          {user && (
            <>
              <Button color="inherit" onClick={handleMenu}>
                <AccountCircleRounded sx={{ fontSize: "large" }} />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/profile"
                >
                  Account
                </MenuItem>
                {user.role === "admin" &&
                  adminMenuItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={handleClose}
                      component={RouterLink}
                      to={item.path}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
