import { useEffect } from "react";
import Link from "next/link";

import { useStateContext } from "../context/StateContext";
import { removeLocalStorageCart, runStarsConffeti } from "../lib/utils";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { default as MUILink } from "@mui/material/Link";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  useEffect(() => {
    removeLocalStorageCart();
    setTotalPrice();
    setCartItems(0);
    setTotalQuantities(0);
    runStarsConffeti();
  }, []);
  return (
    <Stack
      marginTop="3em"
      padding="3em"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        padding="3em"
        direction="column"
        backgroundColor="grey.300"
        borderRadius="1em"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        width={{ xs: "100%", md: "80%" }}
      >
        <Box>
          <Typography variant="h2" component="h1" textAlign="center">
            Thank you for your order!
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
            Check your email inbox for the receipt.
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          textAlign="center"
          component="p"
        >
          If you have any questions, please email
          <MUILink href="mailto:order@example.com" marginLeft="0.3em">
            order@example.com
          </MUILink>
        </Typography>
        <Button
          size="large"
          variant="contained"
          component={Link}
          href="/products"
        >
          Continure SHopping
        </Button>
      </Stack>
    </Stack>
  );
};

export default Success;
