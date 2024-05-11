import { useState } from "react";

import {
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import {
  MdMenu,
  MdOutlineAccountBox,
  MdOutlineDocumentScanner,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GiOpenChest } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import authenticationService from "../../services/authenticationService";
import { useWishlistContext } from "../../context/WishlistContext";
import { Constants } from "../../constants/Constants";
import { useAuthContext } from "../../context/AuthContext";

export default function SwipeableTemporaryDrawer() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { accountDecoded } = useAuthContext();
  const { clearWishlist } = useWishlistContext();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: "5%" }}
        onClick={() => setOpen(true)}
      >
        <Box sx={{ color: "common.customDarkTurqoise" }}>
          <MdMenu size={35} />
        </Box>
      </IconButton>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        PaperProps={{
          sx: {
            bgcolor: "common.customLightYellow",
          },
        }}
      >
        <Box
          sx={{ width: { xs: 200, sm: 250 } }}
          onClick={() => setOpen(false)}
        >
          <List>
            <ListItem sx={{ ml: "-0.5vw", justifyContent: "center" }}>
              <Box sx={{ color: "common.customCavernClay" }}>
                <GiOpenChest size={100} />
              </Box>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AiFillHome size={30} />
                  <ListItemText primary={t("home")} sx={{ ml: 1 }} />
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ borderBottomWidth: 4 }} />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/account")}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MdOutlineAccountBox size={30} />
                  <ListItemText primary={t("my-account")} sx={{ ml: 1 }} />
                </Box>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/wishlists")}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <BsBoxSeam size={30} />
                  <ListItemText primary={t("my-wishlists")} sx={{ ml: 1 }} />
                </Box>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/orders")}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RiBillLine size={30} />
                  <ListItemText primary={t("order-history")} sx={{ ml: 1 }} />
                </Box>
              </ListItemButton>
            </ListItem>
            {accountDecoded?.Role === Constants.ADMIN && (
              <>
                <Divider sx={{ borderBottomWidth: 4 }} />
                <Box display="flex" justifyContent="center" mt={1}>
                  <Chip
                    label="ADMIN"
                    sx={{ bgcolor: "common.customCavernClay", color: "white" }}
                  />
                </Box>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("/accounts")}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <MdOutlineManageAccounts size={30} />
                      <ListItemText
                        primary={t("all-accounts")}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("/orders/all")}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <MdOutlineDocumentScanner size={30} />
                      <ListItemText primary={t("all-orders")} sx={{ ml: 1 }} />
                    </Box>
                  </ListItemButton>
                </ListItem>
              </>
            )}
            <Divider sx={{ borderBottomWidth: 4 }} />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  authenticationService.logout();
                  clearWishlist();
                  navigate("/", { state: { isLoggedOut: true } });
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FaSignOutAlt size={30} />
                  <ListItemText primary={t("sign-out")} sx={{ ml: 1 }} />
                </Box>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
