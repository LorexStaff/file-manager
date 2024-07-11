import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, color: "white" }}>
          Drive
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginRight: "10px", color: "white" }}
        >
          {user?.login}
        </Typography>
        <Button color="inherit" onClick={logout} sx={{ color: "white" }}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
