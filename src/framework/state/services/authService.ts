import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginSuccess,
  logoutSuccess,
  loginLoading,
  loginLoadingReset,
} from "../slices/authSlice";

export const useAuthService = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken && storedEmail) {
      dispatch(loginSuccess({ token: storedToken, email: storedEmail }));
    } else {
      dispatch(loginLoadingReset());
    }
  }, [dispatch]);

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(loginLoading());

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);

      dispatch(loginSuccess({ email, token: data.token }));
      return email;
    } catch (error) {
      console.error(error);
      dispatch(loginFailure("Invalid credentials"));
    }
  };

  const logoutUser = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("email");

      dispatch(logoutSuccess());
    } catch (error) {
      console.error(error);
    }
  };
  return {
    loginUser,
    logoutUser,
  };
};
