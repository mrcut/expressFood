import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="fixed" color="info" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
          <Typography variant="body2" color="inherit">
            Ipssi Express Food © 2024
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
