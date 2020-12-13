import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Popover, Box, List, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginRight: ".5em",
    },
    list: {
        borderTop: "1px solid #f2f2f2",
        cursor: "pointer",
        "&:hover": {
        background: "#e5e5e5",
        },
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    userColumn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "1em",
        width: "100%"
    },
    userInfo: {
        display: "flex",
        flexDirection: "column"
    },
    popover: {
        height: "10em",
        width: "20em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    popoverOption: {
        paddingTop: ".5em",
        paddingBottom: ".5em",
        paddingLeft: "1em",
        paddingRight: "1em",
        cursor: "pointer",
        "&:hover": {
            background: "#e5e5e5",
        },
    },
    popoverList: {
        height: "10em",
        width: "7em",
        display: "flex",
        flexDirection: "column",
        paddingTop: "1em",
        paddingBottom: "1em"
      },
}));

const UserInfo = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const user = useSelector((state) => state.users);
  const userInitial = user.firstName ? user.firstName[0] : null;
  const userFullName = user.firstName
    ? `${user.firstName} ${user.lastName}`
    : "";
  return (
    <div >
      <Avatar
      variant="circular"
      className={classes.small}
      alt="user icon"
      aria-haspopup="true"
      src={user.avatarUrl}
      onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box className={classes.popover}>
            <Box className={classes.userColumn}>
                <Avatar className={classes.avatar} src={user.avatarUrl} />
                <Box className={classes.userInfo}>
                    <Box>
                        <Typography>{userFullName}</Typography>
                    </Box>
                    <Box>
                        <Typography>{user.email}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.popoverList}>
                <Box className={classes.popoverOption}>
                    <Typography>Logout</Typography>
                </Box>
            </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default UserInfo;
