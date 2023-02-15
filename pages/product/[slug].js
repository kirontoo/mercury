import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useState } from "react";
import { useStateContext } from "../../context/StateContext";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, rating } = product;
  const [index, setIndex] = useState(0);
  const { onAdd, decreaseQty, increaseQty, qty, setShowCart } =
    useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <Stack spacing={4} my="2em">
      <Grid container padding="1em" spacing={2}>
        <Grid item xs={12} md={4}>
          <Box>
            <img
              src={urlFor(image && image[index])}
              alt={image[index].name}
              className="product-detail-image"
            />
          </Box>
          <Stack direction="row" spacing={1}>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i == index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt={item.name}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={1}>
            <Typography variant="h4" component="h1">
              {name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Rating name="read-only" value={rating} precision={0.1} readOnly />
              <Typography variant="span">(20)</Typography>
            </Stack>
            <Typography fontWeight="bold">Details:</Typography>
            <Typography>{details}</Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              component="p"
            >
              ${price}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography fontWeight="bold">Quantity:</Typography>
              <Stack direction="row">
                <Button size="small" onClick={decreaseQty} variant="outlined">
                  <RemoveIcon />
                </Button>
                <Typography py="0.5em" px="1em">
                  {qty}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={increaseQty}
                  sx={{ color: "green" }}
                >
                  <AddIcon />
                </Button>
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: 4 }}
              py="2em"
            >
              <Button
                size="large"
                variant="outlined"
                onClick={() => onAdd(product, qty)}
              >
                Add to Cart
              </Button>
              <Button size="large" variant="contained" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h2" textAlign="center">
        You may also like
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        {products.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </Stack>
    </Stack>
  );
};

export const getStaticPaths = async () => {
  const productsQuery = '*[_type == "product"] { slug { current }}';

  const products = await client.fetch(productsQuery);

  const paths = products.map((p) => ({
    params: { slug: p.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return { props: { products, product } };
};

export default ProductDetails;
