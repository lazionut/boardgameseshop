import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { ReactComponent as BggSvg } from "../../assets/images/bgg_logo.svg";

interface BoardgameDetailsCardProps {
  description: string;
  link: string;
}

export default function BoardgameDetailsCard({
  description,
  link,
}: BoardgameDetailsCardProps) {
  return (
    <Grid item flexDirection="column">
      {description && (
        <Typography
          variant="h6"
          style={{ wordWrap: "break-word" }}
          mt={link ? "15%" : "15vh"}
        >
          {description}
        </Typography>
      )}
      {link && (
        <Box mt="5%">
          <BggSvg />
          <a href={link} target="_blank" rel="noreferrer noopener">
            <Typography variant="h6" style={{ wordWrap: "break-word" }}>
              {link}
            </Typography>
          </a>
        </Box>
      )}
    </Grid>
  );
}
