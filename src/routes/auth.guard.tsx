import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../framework/state/store";
import { Box } from "@mui/material";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { loginSuccess } from "../framework/state/slices/authSlice";
import { useAuthService } from "../framework/state/services/authService";

const AuthGuard = () => {
  const location = useLocation();
  //const dispatch = useDispatch();

  const { token, loading } = useSelector((state: RootState) => state.auth);
  useAuthService();
  console.log(loading);

  const isAuthenticated = !!token;

  if (loading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AuthGuard;
