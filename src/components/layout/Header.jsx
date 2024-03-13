import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountCircleRounded } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuth();
  const { basket } = useBasket();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    { label: "Liste des Commandes", path: "/orders" },
  ];

  return (
    <AppBar position="fixed" color="info">
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block", md: "block" },
            fontWeight: "bold",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Ipssi Express Food
        </Typography>

        {user && basket.length > 0 && !isMobile && (
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
              {!isMobile && (
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/profile"
                >
                  Account
                </MenuItem>
              )}
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/orders"
              >
                Commandes
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
