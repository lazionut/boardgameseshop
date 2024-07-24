import { useState } from "react";

import {
  Grid,
  TextField,
  Autocomplete,
  Button,
  Container,
  Typography,
  Box,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Configs } from "../../constants/Configs";
import {
  minimumPriceFieldRule,
  positiveNumberFieldRule,
  requiredFieldRule,
} from "../../constants/Rules";
import useFetchData from "../../hooks/useFetchData";
import sendDataService from "../../services/sendDataService";

type FormValues = {
  name: string;
  price: string;
  "release-year": string;
  description: string;
  link: string;
  quantity: string;
  category: string;
};

interface AdminBoardgameTemplateProps {
  blobImage?: Blob;
  boardgame?: {
    id: number;
    image: string | null;
    name: string;
    releaseYear: number;
    price: number;
    description: string | null;
    link: string | null;
    quantity: number;
    categoryId: number;
  };
  templateName: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type CategoryType = {
  id: number | null;
  name: string;
};

export default function AdminBoardgameTemplate({
  blobImage,
  boardgame,
  templateName,
}: AdminBoardgameTemplateProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [file, setFile] = useState<Blob | undefined>(blobImage);
  const [fileName, setFileName] = useState<string | null | undefined>(
    boardgame?.image
  );

  const getCategoriesRequestConfig: AxiosRequestConfig = {
    url: "/categories",
    method: "GET",
  };

  const [{ data: categories, loading, error }] = useFetchData(
    getCategoriesRequestConfig
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: boardgame?.name,
      price: boardgame?.price.toString(),
      "release-year": boardgame?.releaseYear.toString(),
      description: boardgame?.description ?? "",
      link: boardgame?.link ?? "",
      quantity: boardgame?.quantity.toString(),
      category: "",
    },
  });

  const handleBrowseFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files! && e.target.files[0]);
    setFileName(e.target.files! && e.target.files[0].name);
  };

  const handleUploadFile = async () => {
    if (file !== undefined && fileName !== undefined && fileName !== null) {
      const formData = new FormData();
      formData.append("formFile", file);
      formData.append("fileName", fileName);

      await sendDataService.execute({
        url: "/blobs",
        method: "post",
        data: formData,
      });
    }
  };

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    if (boardgame?.id === undefined) {
      const categoryId = getCategoryByName(categories, data["category"])?.id;

      const boardgameInput = {
        image: fileName,
        name: data["name"],
        releaseYear: data["release-year"],
        description: data["description"],
        price: data["price"],
        link: data["link"],
        quantity: data["quantity"],
        categoryId: categoryId,
      };

      const createBoardgameResponse = await sendDataService.execute({
        url: "/boardgames",
        method: "post",
        data: boardgameInput,
      });

      if (createBoardgameResponse?.data !== undefined) {
        if (boardgame?.image !== fileName) {
          await handleUploadFile();
          navigate(`/boardgames/${createBoardgameResponse?.data.id}`);
        } else {
          navigate(`/boardgames/${createBoardgameResponse?.data.id}`);
        }
      }
    } else {
      const categoryId = getCategoryByName(categories, data["category"])?.id;

      const editedBoardgameInput = {
        image: fileName,
        name: data["name"],
        releaseYear: data["release-year"],
        description: data["description"],
        price: data["price"],
        link: data["link"],
        quantity: data["quantity"],
        categoryId: categoryId,
      };

      const updateBoardgameResponse = await sendDataService.execute({
        url: `/boardgames/${boardgame.id}`,
        method: "put",
        data: editedBoardgameInput,
      });

      if (updateBoardgameResponse.status === Configs.NO_CONTENT_RESPONSE) {
        if (boardgame.image !== fileName) {
          await handleUploadFile();
        }

        navigate(`/boardgames/${boardgame.id}`);
      }
    }
  };

  const getCategoryByName = (
    categories: CategoryType[],
    searchedCategory: string
  ): CategoryType | undefined => {
    return categories.find((category) => {
      return category.name === searchedCategory;
    });
  };

  const getCategoryById = (
    categories: CategoryType[],
    searchedCategoryId: number
  ): CategoryType | undefined => {
    return categories.find((category) => {
      return category.id === searchedCategoryId;
    });
  };

  const categoryName: string | undefined = boardgame?.categoryId
    ? getCategoryById(categories, Number(boardgame?.categoryId))?.name
    : "";

  return (
    <>
      {categoryName !== undefined && (
        <Container
          sx={{
            bgcolor: "common.customLightYellow",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit(handleFormSubmission)}>
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="h4" mb="5%">
                  {templateName}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Box
                  component="img"
                  sx={{
                    width: { xs: 260, lg: "auto" },
                    maxWidth: { lg: 500 },
                    height: 350,
                  }}
                  src={
                    file
                      ? window.URL.createObjectURL(file)
                      : require("../../assets/images/no_image.jpg")
                  }
                  alt="boardgame image"
                />
              </Grid>
              <Grid
                item
                xs={12}
                mx="15%"
                display="flex"
                justifyContent="center"
              >
                <Button variant="contained" component="label">
                  <Typography>{t("choose-image")}</Typography>
                  <input type="file" onChange={handleBrowseFile} hidden />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("image")}
                  value={fileName ? fileName : boardgame?.image}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={`${t("name")} *`}
                  fullWidth
                  autoFocus
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
                <TextField
                  type="number"
                  label={`${t("price")} *`}
                  fullWidth
                  variant="outlined"
                  error={!!errors["price"]}
                  helperText={
                    errors["price"]?.message !== undefined &&
                    String(errors["price"]?.message)
                  }
                  {...register("price", {
                    ...requiredFieldRule,
                    ...minimumPriceFieldRule,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label={`${t("release-year")} *`}
                  fullWidth
                  variant="outlined"
                  error={!!errors["release-year"]}
                  helperText={
                    errors["release-year"]?.message !== undefined &&
                    String(errors["release-year"]?.message)
                  }
                  {...register("release-year", {
                    ...requiredFieldRule,
                    ...positiveNumberFieldRule,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  variant="outlined"
                  label={`${t("description")}`}
                  multiline
                  rows="5"
                  fullWidth
                  error={!!errors["description"]}
                  helperText={
                    errors["description"]?.message !== undefined &&
                    String(errors["description"]?.message)
                  }
                  {...register("description")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Link"
                  fullWidth
                  error={!!errors["link"]}
                  helperText={
                    errors["link"]?.message !== undefined &&
                    String(errors["link"]?.message)
                  }
                  {...register("link")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  variant="outlined"
                  fullWidth
                  label={`${t("quantity")} *`}
                  error={!!errors["quantity"]}
                  helperText={
                    errors["quantity"]?.message !== undefined &&
                    String(errors["quantity"]?.message)
                  }
                  {...register("quantity", {
                    ...requiredFieldRule,
                    ...positiveNumberFieldRule,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={categories}
                  defaultValue={{
                    id: boardgame?.categoryId ? boardgame.categoryId : 0,
                    name: boardgame?.categoryId ? categoryName : "",
                  }}
                  getOptionLabel={(option: CategoryType) => String(option.name)}
                  renderOption={(props, option: CategoryType) => (
                    <Box component="li" {...props}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                      {...params}
                      type="text"
                      variant="outlined"
                      fullWidth
                      label={`${t("category")} *`}
                      error={!!errors["category"]}
                      helperText={
                        errors["category"]?.message !== undefined &&
                        String(errors["category"]?.message)
                      }
                      {...register("category", {
                        ...requiredFieldRule,
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button type="submit" variant="contained" sx={{ mb: "3%" }}>
                  {t("submit")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </>
  );
}
