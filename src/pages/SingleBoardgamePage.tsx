import React, { useEffect } from "react";
import { Box, Card, Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import BoardgameDetailsCard from "../components/boardgame/BoardgameDetailsCard";
import ReviewTemplate from "../components/boardgame/review/ReviewTemplate";
import useFetchData from "../hooks/useFetchData";
import BoardgameContentCard from "../components/boardgame/BoardgameContentCard";

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
          <Card
            sx={{
              p: { xs: "4%", sm: "2%" },
              border: 1,
              bgcolor: "common.customLightYellow",
              mb: "3%",
              boxShadow: 12,
            }}
          >
            <Box
              display="flex"
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                mb: "4%",
                color: "black",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ mt: { xs: "5%", md: "3%" }, mb: "-10%" }}
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
            <ReviewTemplate boardgameId={Number(boardgameId)} />
          </Card>
        </Container>
      )}
    </>
  );
}
