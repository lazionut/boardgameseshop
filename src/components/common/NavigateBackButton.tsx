import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useTranslation } from "react-i18next";

interface NavigateBackButtonProps {
  to: string;
}

export default function NavigateBackButton({ to }: NavigateBackButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button color="primary" variant="contained" onClick={() => navigate(to)}>
      <BiArrowBack /> {t("back")}
    </Button>
  );
}
