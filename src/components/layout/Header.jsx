import { AccountCircleRounded } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";
import Basket from "../basket/Basket";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [basketOpen, setBasketOpen] = useState(false);
  const { items } = useBasket();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBasketOpen = () => {
    setBasketOpen(true);
  };

  const handleBasketClose = () => {
    setBasketOpen(false);
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
    <AppBar position="fixed" sx={{ bgcolor: "black" }}>
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

        {user && (
          <>
            {" "}
            <Button color="inherit" onClick={handleBasketOpen}>
              Basket ({items.length})
            </Button>
            <Basket
              open={basketOpen}
              handleClose={handleBasketClose}
              basketItems={items}
            />{" "}
          </>
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
                to="/myOrders"
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
