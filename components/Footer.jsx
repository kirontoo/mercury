import React from "react";

import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";
import Link from "next/link";

const Footer = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        padding: "3em 5em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" component="small" color={blueGrey[800]}>
        2023 Mercury Headphones All rights reserved
      </Typography>
      <Box>
        <Link href="https://example.com">
          <AiFillInstagram fontSize="2em"></AiFillInstagram>
        </Link>
        <Link href="https://example.com">
          <AiOutlineTwitter fontSize="2em"></AiOutlineTwitter>
        </Link>
      </Box>
    </Stack>
  );
};

export default Footer;
