import { Box, Rating, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { GiMeeple } from "react-icons/gi";

interface RatingOptionsProps {
  ratingStars: number | null;
  setRatingStars: React.Dispatch<React.SetStateAction<number | null>>;
}

export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#CDC50A",
  },
  "& .MuiRating-iconHover": {
    color: "#CDC50A",
  },
});

export default function RatingOptions({
  ratingStars,
  setRatingStars,
}: RatingOptionsProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        "& > legend": { mt: "2%" },
      }}
    >
      <Typography component="legend">{t("rate-game")}:</Typography>
      <StyledRating
        value={ratingStars}
        onChange={(event, value) => {
          setRatingStars(value);
        }}
        icon={<GiMeeple fontSize="inherit" />}
        emptyIcon={<GiMeeple fontSize="inherit" />}
      />
    </Box>
  );
}
