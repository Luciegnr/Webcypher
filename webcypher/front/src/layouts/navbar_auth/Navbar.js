import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Divider, IconButton, ListItemText, ListItemButton, ListItemIcon, List, ListItem } from "@mui/material/";
import MuiDrawer from "@mui/material/Drawer";
import { logout } from "@utils/access_token";
import {
  ForumIcon, GroupsIcon, LibraryMusicIcon, MenuIcon, ChevronLeftIcon, ChevronRightIcon, SettingsIcon, LogoutIcon, HomeIcon
} from "@config/icons";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer variant="permanent" open={open} sx={{ flexShrink: 0, "& .MuiDrawer-paper": { boxSizing: "border-box", background: "#211625", color: "white", position: "absolute", top: 0, left: 0, overflowY: "auto", } }} position="static">
        <DrawerHeader>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ color: "white", ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white", ...(!open && { display: "none" }) }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            
            <ListItemButton href="/liste-room" sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center", }}>
                <HomeIcon className="white center" />
              </ListItemIcon>
              <ListItemText primary={"Accueil"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            <ListItemButton href="/mediatheque" sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center", }}>
                <LibraryMusicIcon className="white center" />
              </ListItemIcon>
              <ListItemText
                primary={"Médiathèque"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>


            <ListItemButton href="/liste-user" sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center", }} >
                <GroupsIcon className="white center" />
              </ListItemIcon>
              <ListItemText primary={"Liste des utilisateurs"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>


            <ListItemButton href="/private" sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center", }}>
                <ForumIcon className="white center" />
              </ListItemIcon>
              <ListItemText primary={"Tchat"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>


            <ListItemButton href="/parametre-compte" sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <SettingsIcon className="white center" />
              </ListItemIcon>
              <ListItemText primary={"Paramètres"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            <ListItemButton onClick={logout} sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <LogoutIcon className="white center" />
              </ListItemIcon>
              <ListItemText primary={"Déconnexion"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
