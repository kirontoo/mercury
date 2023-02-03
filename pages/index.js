import { HeroBanner, Product, FooterBanner } from "../components";
import { client } from "../lib/client";

export default function Home({products, bannerData}) {
  return (
    <>
      <HeroBanner banner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <ul className="products-container">
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </ul>
      <FooterBanner banner={bannerData && bannerData[0]}/>
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
