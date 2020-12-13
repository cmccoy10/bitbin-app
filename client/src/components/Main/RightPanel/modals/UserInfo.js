import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Popover, Box, List, Button, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../../../../store/ducks/authentication";


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
        cursor: "pointer",
    },
    altSmall: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        cursor: "pointer",
        color: "white",
        background: "#005744",
    },
    userColumn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "1em",
        width: "100%",
        borderBottom: "1px solid #d9d9d9"
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
        paddingLeft: "1em",
        paddingRight: "1em",
        cursor: "pointer",
        "&:hover": {
            background: "#e5e5e5",
        },
        paddingTop: "1em",
        paddingBottom: "1em",
    },
    popoverList: {
        height: "11em",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    altAvatar: {
        color: "white",
        background: "#005744",
        width: theme.spacing(4),
        height: theme.spacing(4),
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginRight: ".5em",
    },
}));

const UserInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const user = useSelector((state) => state.users);
  const userInitials = user.firstName ? user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase() : null;
  const userFullName = user.firstName
    ? `${user.firstName} ${user.lastName}`
    : "";
  return (
    <div >
      {user.avatarUrl ?
        <Avatar
        variant="circular"
        className={classes.small}
        alt="user icon"
        aria-haspopup="true"
        src={user.avatarUrl}
        onClick={handleClick}
        />
      :
        <Avatar
        variant="circular"
        className={classes.altSmall}
        alt="user icon"
        aria-haspopup="true"
        onClick={handleClick}
        >
            {userInitials}
        </Avatar>
      }
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box className={classes.popover}>
            <Box className={classes.userColumn}>
                {user.avatarUrl ?
                    <Avatar className={classes.avatar} src={user.avatarUrl} />
                :
                    <Avatar className={classes.altAvatar}>{userInitials}</Avatar>
                }
                <Box className={classes.userInfo}>
                    <Box>
                        <Typography>{userFullName}</Typography>
                    </Box>
                    <Box>
                        <Typography>{user.email}</Typography>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box className={classes.popoverList}>
                <Box className={classes.popoverOption} onClick={handleLogout}>
                    <Typography>Logout</Typography>
                </Box>
            </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default UserInfo;
