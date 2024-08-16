import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import TopBar from "../components/TopBar";

export default function Layout() {
  return (
    <Box>
      <TopBar />
      <Outlet />
    </Box>
  );
}
