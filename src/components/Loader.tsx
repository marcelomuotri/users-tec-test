import { CircularProgress } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
}));

const Loader = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.loadingOverlay} data-testid="loader">
      <CircularProgress />
    </div>
  );
};

export default Loader;
