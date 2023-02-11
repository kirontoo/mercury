import { HeroBanner, Product, FooterBanner } from "../components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { client } from "../lib/client";
import { blueGrey } from "@mui/material/colors";

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner banner={bannerData.length && bannerData[0]} />

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "5em 0 2em 0" }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{ color: blueGrey[800], fontWeigth: "bold", textAlign: "center" }}
        >
          Best Selling Products
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ color: blueGrey[600] }}
        >
          Speakers of many variations
        </Typography>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        component="ul"
        justifyContent="center"
        alignItems="center"
        mt="2em"
      >
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </Stack>
      <FooterBanner banner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { props: { products, bannerData } };
};
