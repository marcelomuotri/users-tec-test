import { makeStyles } from "tss-react/mui";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../framework/state/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "../framework/state/slices/authSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const { email } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
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
