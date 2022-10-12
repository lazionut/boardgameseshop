import React, { useState } from "react";
import {
  Grid,
  TextField,
  Autocomplete,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AxiosRequestConfig } from "axios";

import { requiredFieldRule } from "../../constants/Rules";
import useFetchData from "../../hooks/useFetchData";
import sendDataService from "../../services/sendDataService";
import { Configs } from "../../constants/Configs";

interface AdminBoardgameTemplateProps {
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
}

type CategoryType = {
  id: number;
  name: string;
};

export default function AdminBoardgameTemplate({
  boardgame,
  templateName,
}: AdminBoardgameTemplateProps) {
  const authToken: string | null = localStorage.getItem("token");

  const [name, setName] = useState<string | undefined>(boardgame?.name);
  const [price, setPrice] = useState<number | undefined>(boardgame?.price);
  const [releaseYear, setReleaseYear] = useState<number | undefined>(
    boardgame?.releaseYear
  );
  const [description, setDescription] = useState<string | null | undefined>(
    boardgame?.description
  );
  const [link, setLink] = useState<string | null | undefined>(boardgame?.link);
  const [quantity, setQuantity] = useState<number | undefined>(
    boardgame?.quantity
  );
  const [category, setCategory] = useState<number | undefined>(
    boardgame?.categoryId
  );

  console.log("Boardgame category is: " + boardgame?.categoryId);

  const getCategoriesRequestConfig: AxiosRequestConfig = {
    url: "/categories",
    method: "GET",
  };

  const {
    data: categories,
    loading,
    error,
  } = useFetchData(getCategoriesRequestConfig);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmission = async (data: { [key: string]: string }) => {
    if (boardgame?.id === undefined) {
      const boardgameInput = {
        name: data["name"],
        releaseYear: data["release-year"],
        description: data["description"],
        price: data["price"],
        link: data["link"],
        quantity: data["quantity"],
        categoryId: data["category-id"],
      };

      const createBoardgameResponse = await sendDataService.execute({
        url: "/boardgames",
        method: "post",
        data: boardgameInput,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (createBoardgameResponse?.data !== undefined) {
        reset({
          name: "",
          "release-year": "",
          description: "",
          price: "",
          link: "",
          quantity: "",
          "category-id": "",
        });
      }
    } else {
      const editedBoardgameInput = {
        name: data["name"],
        releaseYear: data["release-year"],
        description: data["description"],
        price: data["price"],
        link: data["link"],
        quantity: data["quantity"],
        categoryId: data["category-id"],
      };

      const updateBoardgameResponse = await sendDataService.execute({
        url: `/boardgames/${boardgame.id}`,
        method: "put",
        data: editedBoardgameInput,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (updateBoardgameResponse.status === Configs.OK_RESPONSE) {
        reset({
          name: "",
          "release-year": "",
          description: "",
          price: "",
          link: "",
          quantity: "",
          "category-id": "",
        });
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "common.customDirtyWhite" }}>
      <Typography variant="h4" mb="5%">
        {templateName}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmission)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
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
            <TextField
              type="number"
              value={price}
              label="Price"
              fullWidth
              autoFocus
              variant="outlined"
              error={!!errors["price"]}
              helperText={
                errors["price"]?.message !== undefined &&
                String(errors["price"]?.message)
              }
              {...register("price", {
                ...requiredFieldRule,
              })}
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              value={releaseYear}
              label="Release year"
              fullWidth
              autoFocus
              variant="outlined"
              error={!!errors["release-year"]}
              helperText={
                errors["release-year"]?.message !== undefined &&
                String(errors["release-year"]?.message)
              }
              {...register("release-year", {
                ...requiredFieldRule,
              })}
              onChange={(e) => setReleaseYear(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              variant="outlined"
              value={description}
              label="Description"
              multiline
              rows="5"
              fullWidth
              autoFocus
              error={!!errors["description"]}
              helperText={
                errors["description"]?.message !== undefined &&
                String(errors["description"]?.message)
              }
              {...register("description")}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              variant="outlined"
              value={link}
              label="Link"
              fullWidth
              autoFocus
              error={!!errors["link"]}
              helperText={
                errors["link"]?.message !== undefined &&
                String(errors["link"]?.message)
              }
              {...register("link")}
              onChange={(e) => setLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              variant="outlined"
              value={quantity}
              fullWidth
              autoFocus
              label="Quantity"
              error={!!errors["quantity"]}
              helperText={
                errors["quantity"]?.message !== undefined &&
                String(errors["quantity"]?.message)
              }
              {...register("quantity", {
                ...requiredFieldRule,
              })}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={categories}
              disablePortal
              autoHighlight
              getOptionLabel={(option: CategoryType) => String(option.id)}
              renderOption={(props, option: CategoryType) => (
                <Box component="li" {...props}>
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  variant="outlined"
                  value={category}
                  fullWidth
                  autoFocus
                  label="Category *"
                  error={!!errors["category-id"]}
                  helperText={
                    errors["category-id"]?.message !== undefined &&
                    String(errors["category-id"]?.message)
                  }
                  {...register("category-id", {
                    ...requiredFieldRule,
                  })}
                  onChange={(e) => setCategory(Number(e.target.value))}
                />
              )}
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
