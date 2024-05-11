import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

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
