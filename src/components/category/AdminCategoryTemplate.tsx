import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { requiredFieldRule } from "../../constants/Rules";
import sendDataService from "../../services/sendDataService";
import { Configs } from "../../constants/Configs";

interface CategoryAdminTemplateProps {
  templateName: string;
  category?: {
    id: number;
    name: string;
  };
}

export default function AdminCategoryTemplate({
  templateName,
  category,
}: CategoryAdminTemplateProps) {
  const authToken: string | null = localStorage.getItem("token");

  const [name, setName] = useState<string | undefined>(category?.name);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    if (category?.id === undefined) {
      const categoryInput = {
        name: data["name"],
      };

      const createCategoryResponse = await sendDataService.execute({
        url: "/categories",
        method: "post",
        data: categoryInput,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (createCategoryResponse?.data !== undefined) {
        window.location.reload();
      }
    } else {
      const editCategoryInput = {
        name: data["name"],
      };

      const updateCategoryResponse = await sendDataService.execute({
        url: `/categories/${category.id}`,
        method: "put",
        data: editCategoryInput,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (updateCategoryResponse.status === Configs.NO_CONTENT_RESPONSE) {
        window.location.reload();
      }
    }
  };

  return (
    <Container sx={{ bgcolor: "common.customDarkLight" }}>
      <Typography variant="h4" mb="5%">
        {templateName}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmission)}>
        <Grid container spacing={3} maxWidth="sm">
          <Grid item xs={12}>
            <TextField
              label="Name *"
              value={name}
              autoFocus
              fullWidth
              variant="outlined"
              error={!!errors["name"]}
              helperText={
                errors["name"]?.message !== undefined &&
                String(errors["name"]?.message)
              }
              {...register("name", {
                ...requiredFieldRule,
              })}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ mb: "3%" }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
