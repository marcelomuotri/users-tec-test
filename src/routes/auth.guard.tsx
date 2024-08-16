import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../framework/state/store";
import { Box } from "@mui/material";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { loadAuthFromStorage } from "../framework/state/slices/authSlice";
import { AppDispatch } from "../framework/state/store";

const AuthGuard = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { token, loading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

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
