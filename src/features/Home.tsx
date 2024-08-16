import {
  Box,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UserCard from "../components/UserCard";
import { useUsersService } from "../framework/state/services/usersService";
import { makeStyles } from "tss-react/mui";
import Loader from "../components/Loader";

const useStyles = makeStyles()(() => ({
  userListContainer: {
    padding: 30,
  },
  userList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
  },
  userList__paginationContainer: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },
  userList__select: {
    minWidth: "120px",
  },
}));

const UserList = () => {
  const { classes } = useStyles();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  const { users, isLoading, totalPages, error } = useUsersService(
    page,
    perPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handlePerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPerPage(event.target.value as number);
    setPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Typography>Failed to fetch users</Typography>;
  }

  if (!users || users.length === 0) {
    return <Typography>No users avaliable</Typography>;
  }

  return (
    <Box className={classes.userListContainer}>
      <Box className={classes.userList}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            firstName={user.first_name}
            lastName={user.last_name}
            email={user.email}
            avatar={user.avatar}
          />
        ))}
      </Box>
      <Box className={classes["userList__paginationContainer"]}>
        <FormControl className={classes["userList__select"]}>
          <Select value={perPage} onChange={handlePerPageChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UserList;
