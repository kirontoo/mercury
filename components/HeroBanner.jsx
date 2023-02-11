import { urlFor } from "../lib/client.js";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { blueGrey } from "@mui/material/colors";

const HeroBanner = ({
  banner: { desc, smallText, midText, image, product, largeText1 },
}) => {
  return (
    <Stack
      borderRadius="1em"
      backgroundColor="grey.300"
      paddingY="5em"
      paddingX="3em"
      marginY="4em"
      position="relative"
    >
      <Typography component="p" variant="h6">
        {smallText}
      </Typography>
      <Typography
        component="h3"
        variant="h3"
        fontWeight="bold"
        color="primary"
        fontSize={{ xs: "2.5em", md: "3em" }}
      >
        {midText}
      </Typography>
      <Typography
        component="h1"
        variant="h1"
        fontWeight="bold"
        fontSize={{ xs: "3em", md: "8em" }}
        letterSpacing="0.05em"
      >
        {largeText1}
      </Typography>
      <img className="hero-banner-image" src={urlFor(image)} alt={product} />
      <Box>
        <Button variant="contained" href="/" component={Link} color="primary">
          Shop Now
        </Button>

        <Stack
          alignItems="flex-end"
          spacing={1}
          marginTop={{ xs: "4em", md: "0" }}
        >
          <Typography
            variant="subtitle1"
            component="h5"
            fontWeight="bold"
            color={blueGrey[800]}
          >
            Description
          </Typography>
          <Typography variant="subtitle2" component="p" color="grey.600">
            {desc}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default HeroBanner;
