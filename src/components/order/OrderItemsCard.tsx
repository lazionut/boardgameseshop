import {
  Box,
  Card,
  CardActions,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import OrderBoardgameCard from "src/components/order/OrderBoardgameCard";
import OrderDialog from "src/components/order/OrderDialog";
import { Constants } from "src/constants/Constants";
import { useAuthContext } from "src/context/AuthContext";
import { orderStatusDefiner, trimDateTime } from "src/utils/Utilities";

interface OrderItemsCardProp {
  order: {
    id: number;
    fullName: string;
    address: string;
    total: number;
    status: number;
    creationDate: string;
    boardgames: {
      id: number;
      image: string;
      name: string;
      price: number;
      quantity: number;
    }[];
  };
}

export default function OrderItemsCard({ order }: OrderItemsCardProp) {
  const { accountDecoded } = useAuthContext();
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        bgcolor: "common.customLightYellow",
        p: "2%",
        mb: "10%",
      }}
    >
      <Box flexDirection="row" width="100%">
        {accountDecoded?.Role === Constants.ADMIN && (
          <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <OrderDialog id={order.id} currentOrderStatus={order.status} />
          </Box>
        )}
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "left",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography> {order.fullName}</Typography>
            <Typography>{t("address")}: </Typography>
            <Typography> {order.address}</Typography>
            <Typography mt={"5%"}>
              {t("ordered-at")}: {trimDateTime(order.creationDate)}
            </Typography>
            <Chip
              variant="outlined"
              color="primary"
              sx={{ mt: "5%" }}
              label={orderStatusDefiner(order.status)}
            />
          </Box>
        </CardActions>
        <Divider />
        {order.boardgames.map((boardgame: any) => (
          <OrderBoardgameCard key={boardgame.id} boardgame={boardgame} />
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Chip
            variant="outlined"
            sx={{ mt: { xs: "5%", sm: "2%" } }}
            label={`Total: ${order.total}`}
          />
        </Box>
      </Box>
    </Card>
  );
}
