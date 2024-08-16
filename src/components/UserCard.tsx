import { Typography, Avatar, Paper } from "@mui/material";
import { makeStyles } from "tss-react/mui";

interface UserCardProps {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

const useStyles = makeStyles()(() => ({
  userCard: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  userCard__avatar: {
    width: "80px",
    height: "80px",
  },
  userCard__name: {
    fontWeight: 600,
  },
  userCard__email: {
    color: "textSecondary",
  },
}));

const UserCard = ({ firstName, lastName, email, avatar }: UserCardProps) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.userCard}>
      <Avatar
        src={avatar}
        alt={`${firstName} ${lastName}`}
        className={classes["userCard__avatar"]}
      />
      <Typography
        className={classes["userCard__name"]}
      >{`${firstName} ${lastName}`}</Typography>
      <Typography className={classes["userCard__email"]}>{email}</Typography>
    </Paper>
  );
};

export default UserCard;
