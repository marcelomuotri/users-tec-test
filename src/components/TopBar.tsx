import { makeStyles } from "tss-react/mui";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuthService } from "../framework/state/services/authService";
import { useSelector } from "react-redux";
import { RootState } from "../framework/state/store";

const useStyles = makeStyles()((theme) => ({
  topBar: {
    backgroundColor: theme.palette.primary.main,
    padding: "0px 20px 0px 20px",
  },
  topBar__title: {
    flexGrow: 1,
    color: "#fff",
  },
  topBar__logout: {
    color: "#fff",
    borderColor: "#fff",
  },
}));

const TopBar = () => {
  const { classes } = useStyles();
  const { logoutUser } = useAuthService();
  const { email } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <AppBar position="static" className={classes.topBar}>
      <Toolbar>
        <Typography className={classes.topBar__title}>Usuarios</Typography>
        <Typography className={classes.topBar__title}>{email}</Typography>
        <Button
          variant="outlined"
          className={classes.topBar__logout}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
