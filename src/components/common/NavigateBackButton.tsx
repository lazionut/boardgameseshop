import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";

interface NavigateBackButtonProps {
  to: string;
}

export default function NavigateBackButton({ to }: NavigateBackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button color="primary" variant="contained" onClick={() => navigate(to)}>
      <BiArrowBack /> Back
    </Button>
  );
}
