import React from "react";
import CardOverflow from "@mui/joy/CardOverflow";
import { Grid, Box, Card, Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import BoardgameDetailsCard from "../components/boardgame/BoardgameDetailsCard";
import BoardgameContentCard from "../components/boardgame/BoardgameContentCard";
import ReviewTemplate from "../components/boardgame/review/ReviewTemplate";
import useFetchData from "../hooks/useFetchData";

export default function SingleBoardgamePage() {
  const { boardgameId } = useParams();

  const boardgameRequestConfig = {
    url: `/boardgames/${boardgameId}`,
    method: "GET",
  };

  const {
    data: boardgameData,
    loading,
    error,
  } = useFetchData(boardgameRequestConfig);

  return (
    <>
      {boardgameData.id !== undefined && (
        <Container>
          <Card sx={{ mt: "5%" }}>
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.2,
                textAlign: "center",
                fontSize: "xs2",
                fontWeight: "xl2",
                letterSpacing: "1px",
              }}
            >
              <Box
                display="flex"
                mb="4%"
                sx={{
                  flexDirection: { xs: "column", sm: "column", md: "row" },
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  sx={{ mt: { xs: "5%", md: "3%" } }}
                >
                  <BoardgameContentCard
                    image={boardgameData.image}
                    name={boardgameData.name}
                    price={boardgameData.price}
                  />
                </Box>
                <Box
                  flexDirection="column"
                  alignItems="flex-end"
                  sx={{ mr: { xs: "auto", md: "10%" }, mt: "5%" }}
                >
                  <BoardgameDetailsCard
                    description={boardgameData.description}
                    link={boardgameData.link}
                  />
                </Box>
              </Box>
              <Divider />
              <ReviewTemplate />
            </CardOverflow>
          </Card>
        </Container>
      )}
    </>
  );
}
