import { HeroBanner, Product, FooterBanner } from "../components";
import Stack from "@mui/material/Stack";
import { client } from "../lib/client";

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner banner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <Stack
        direction={{ xs: "column",  md: "row"}}
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
