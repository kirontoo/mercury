import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import Link from 'next/link';

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ShoppingCart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const items = { cartItems };
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });

    if (response.statusCode === 500) {
      return;
    }

    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <Stack
      sx={{
        padding: "1em",
        justifyContent: "space-between",
        height: "100vh",
        maxHeight: "100vh",
      }}
      spacing={1}
    >
      <Stack spacing={2}>
        <Button
          onClick={() => setShowCart(false)}
          sx={{ justifyContent: "flex-start", width: "max-content" }}
        >
          <KeyboardArrowLeftIcon />
          <Typography sx={{ color: "black" }} mr={"1em"}>
            Your cart
          </Typography>
          <Typography>({totalQuantities} items)</Typography>
        </Button>

        {cartItems.length < 1 && (
          <Stack
            spacing={1}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <ShoppingBagOutlinedIcon sx={{ fontSize: "10em" }} />
            <Typography>Your shopping bag is empty</Typography>
            <Button
              variant="contained"
              href="/products"
              onClick={() => setShowCart(false)}
              component={Link}
            >
              Continue shopping
            </Button>
          </Stack>
        )}

        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <Stack
                direction="row"
                spacing={1}
                sx={{ width: "100%" }}
                key={item._id}
              >
                <img
                  src={urlFor(item?.image[0])}
                  alt={item.name}
                  className="cart-product-image"
                />

                <Stack sx={{ justifyContent: "space-between" }}>
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                  >
                    {item.name}
                  </Typography>
                  <Typography component="span">${item.price}</Typography>
                  <Stack direction="row">
                    <Button
                      size="small"
                      onClick={() => toggleCartItemQuantity(item._id, "dec")}
                    >
                      <RemoveIcon />
                    </Button>
                    <Typography py="0.5em" px="1em">
                      {item.quantity}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => toggleCartItemQuantity(item._id, "inc")}
                      sx={{ color: "green" }}
                    >
                      <AddIcon />
                    </Button>
                  </Stack>
                  <Button
                    sx={{ width: "max-content", justifyContent: "flex-start" }}
                    onClick={() => onRemove(item)}
                  >
                    Remove from cart
                  </Button>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography component="span" variant="h6" fontWeight="bold">
            Subtotal
          </Typography>
          <Typography component="span" variant="h6" fontWeight="bold">
            ${totalPrice}
          </Typography>
        </Stack>
        <Button onClick={handleCheckout} variant="contained">
          Pay with Stripe
        </Button>
      </Stack>
    </Stack>
  );
};

export default ShoppingCart;
