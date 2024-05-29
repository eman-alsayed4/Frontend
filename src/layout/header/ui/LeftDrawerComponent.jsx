import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Drawer,
  ListItemIcon,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { useContext } from "react";
import { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks } from "../../myLinks";
import LoginContext from "../../../store/loginContext";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const { login } = useContext(LoginContext);
  const loggedIn = login;

  const renderLinks = (links, keyPrefix) => {
    return links.map((myItem, index) => (
      <ListItem key={`${keyPrefix}-${index}`} disablePadding>
        <ListItemButton component="a" href={myItem.to}>
          <ListItemText primary={myItem.children} />
        </ListItemButton>
      </ListItem>
    ));
  };

  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <List>
        {renderLinks(alwaysLinks, "always")}
        {loggedIn && renderLinks(loggedInLinks, "loggedin")}
        {loggedIn && loggedIn.isBusiness && renderLinks(bizLinks, "biz")}
        {!loggedIn && renderLinks(loggedOutLinks, "loggedout")}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;
