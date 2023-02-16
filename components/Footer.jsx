import React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        margin: { xs: "3em 0", md: "3em 5em"},
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" component="small" color={blueGrey[800]}>
        2023 Mercury All rights reserved
      </Typography>
      <Box>
        <Link href="https://example.com" style={{ marginRight: "0.5em" }}>
          <InstagramIcon></InstagramIcon>
        </Link>
        <Link href="https://example.com">
          <TwitterIcon></TwitterIcon>
        </Link>
      </Box>
    </Stack>
  );
};

export default Footer;
