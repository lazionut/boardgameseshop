import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Configs } from "src/constants/Configs";
import { requiredFieldRule } from "src/constants/Rules";
import sendDataService from "src/services/sendDataService";

interface AdminCategoryTemplateProps {
  templateName: string;
  category?: {
    id: number;
    name: string;
  };
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setIsCategoryCreated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCategoryEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminCategoryTemplate({
  templateName,
  category,
  setIsModalOpen,
  setIsCategoryCreated,
  setIsCategoryEdited,
}: AdminCategoryTemplateProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    if (category?.id === undefined) {
      const categoryInput = {
        name: data["name"],
      };

      const createCategoryResponse = await sendDataService.execute({
        url: "/categories",
        method: "post",
        data: categoryInput,
      });

      if (createCategoryResponse?.data !== undefined) {
        setIsModalOpen(false);
        setIsCategoryCreated?.(true);
      }
    } else {
      const editCategoryInput = {
        name: data["name"],
      };

      const updateCategoryResponse = await sendDataService.execute({
        url: `/categories/${category.id}`,
        method: "put",
        data: editCategoryInput,
      });

      if (updateCategoryResponse.status === Configs.NO_CONTENT_RESPONSE) {
        setIsModalOpen(false);
        setIsCategoryEdited?.(true);
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
              label={`${t("name")} *`}
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ mb: "3%" }}>
              {t("submit")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
