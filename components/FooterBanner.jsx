import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { red } from "@mui/material/colors";

const FooterBanner = ({
  banner: {
    image,
    saleTime,
    smallText,
    midText,
    desc,
    discount,
    largeText1,
    largeText2,
    buttonText,
  },
}) => {
  return (
    <Stack
      borderRadius="1em"
      sx={{ backgroundColor: "#f02d34" }}
      paddingY="6em"
      paddingX="3em"
      color="white"
      position="relative"
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      marginTop="12em"
    >
      <Box>
        <Typography variant="subtitle1" component="span">
          {discount}
        </Typography>
        <Typography
          component="h3"
          fontSize={{ xs: "3em", md: "5em" }}
          fontWeight="bold"
          lineHeight={1}
        >
          {largeText1}
        </Typography>
        <Typography
          lineHeight={1}
          fontSize={{ xs: "3em", md: "5em" }}
          component="h3"
          fontWeight="bold"
        >
          {largeText2}
        </Typography>
        <Typography variant="subtitle1" component="span">
          {saleTime}
        </Typography>
      </Box>
      <Stack spacing={2}>
        <Typography variant="subtitle1" component="span">
          {smallText}
        </Typography>
        <Typography variant="h2" component="h3" fontWeight="bold">
          {midText}
        </Typography>
        <Typography variant="subtitle1" component="span">
          {desc}
        </Typography>
        <Button
          component={Link}
          href="/products"
          variant="outlined"
          sx={{
            width: "max-content",
            background: "white",
            "&:hover": {
              background: red[100],
            },
          }}
        >
          {buttonText}
        </Button>
      </Stack>
      <img src={urlFor(image)} className="footer-banner-image" alt="" />
    </Stack>
  );
};

export default FooterBanner;
