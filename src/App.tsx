import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/Layout";
import AuthGuard from "./routes/auth.guard";
import Home from "./features/Home";
import Login from "./features/Login";
import { ThemeProvider } from "@mui/material/styles";
import appTheme from "./framework/theme/app-theme";
import { Provider } from "react-redux";
import store from "./framework/state/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/home" replace />,
          },
          {
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404 not found</div>,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
