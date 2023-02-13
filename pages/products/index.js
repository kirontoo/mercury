import { Product } from "../../components";
import { client, urlFor } from "../../lib/client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
import { blueGrey } from "@mui/material/colors";

const Products = ({ products }) => {
  return (
    <Box spacing={2} padding="1em" marginTop="2em">
      <Typography
        variant="h3"
        component="h1"
        sx={{ color: blueGrey[800], fontWeigth: "bold", textAlign: "center" }}
      >
        Products
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{ color: blueGrey[600], textAlign:"center" }}
      >
        Check out all of our audio products
      </Typography>
      <Stack
        direction={{ xs: "columen", md: "row" }}
        flexWrap="wrap"
        spacing={2}
        marginTop="2em"
        alignItems="center"
      >
        {products.map((item) => (
          <Grid item key={item._id} md={3} xs={12}>
            <Product product={item} />
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};

export const getStaticProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return { props: { products } };
};

export default Products;
