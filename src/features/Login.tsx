import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Box, Button, TextField, Theme, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../framework/state/store";
import Loader from "../components/Loader";
import {
  loadAuthFromStorage,
  loginUser,
} from "../framework/state/slices/authSlice";
import { AppDispatch } from "../framework/state/store";

const useStyles = makeStyles()((theme: Theme) => ({
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  login__box: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    width: "300px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius,
  },
  login__title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  login__input: {
    marginBottom: "15px",
    width: "100%",
  },
  login__button: {
    padding: "10px",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
}));

const Login = () => {
  const { classes } = useStyles();
  const {
    email: loggedUser,
    loading,
    error,
  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser) navigation("/");
  }, [loggedUser, navigation]);

  const onHandleLogin = async () => {
    dispatch(loginUser({ email, password }));
    if (loggedUser) {
      navigation("/");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box className={classes.login}>
      <Box className={classes.login__box}>
        <Typography className={classes.login__title}>Login</Typography>
        <TextField
          label="Username"
          onChange={(event) => setEmail(event.target.value)}
          className={classes.login__input}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          className={classes.login__input}
          variant="outlined"
          size="small"
        />
        {error && <Typography> Incorrect credentials</Typography>}
        <Button className={classes.login__button} onClick={onHandleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
