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
          <Card sx={{ mb: "10%" }}>
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
                sx={{
                  flexDirection: { xs: "column", sm: "column", md: "row" },
                  justifyContent: "center",
                  mb: "4%",
                  mr: { xs: "auto", lg: "10%" },
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ mt: { xs: "5%", md: "3%" } }}
                >
                  <BoardgameContentCard boardgame={boardgameData} />
                </Box>
                <Box flexDirection="column">
                  <BoardgameDetailsCard
                    description={boardgameData.description}
                    link={boardgameData.link}
                  />
                </Box>
              </Box>
              <Divider />
              {boardgameId && (
                <ReviewTemplate boardgameId={Number(boardgameId)} />
              )}
            </CardOverflow>
          </Card>
        </Container>
      )}
    </>
  );
}
